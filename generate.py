"""
Bol-infographics: leest producten uit Magento, maakt per model de infographics
en per maat de maathulp, en schrijft een feed voor EffectConnect.

Alleen modellen waarvan de tekst, foto's, maattabel of het sjabloon veranderd is,
worden opnieuw gemaakt. Nieuwe of gewijzigde afbeeldingen krijgen een nieuwe
bestandsnaam, zodat Bol ze altijd opnieuw ophaalt.

Instellingen (omgevingsvariabelen):
  MAGENTO_URL     bijv. https://www.all4fysio.nl
  MAGENTO_TOKEN   access token van de integratie (alleen-lezen)
  PAGES_URL       publieke basis-URL van de site, bijv. https://naam.github.io/bol-infographics
  ONLY_SKUS       optioneel: komma-gescheiden configurable sku's (test)
  MISSING_LIKE    optioneel: naamfilter voor het overzicht 'tekst ontbreekt' (standaard Varomed%)
  FIXTURE         optioneel: pad naar een JSON-bestand in plaats van Magento (lokaal testen)
"""
import os, re, io, unicodedata, json, hashlib, shutil, datetime, html as H, xml.sax.saxutils as X
import requests
from PIL import Image
from playwright.sync_api import sync_playwright
import templates as T

TEMPLATE_VERSION = '3'          # ophogen = alles opnieuw maken
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, os.environ.get('OUT_DIR', 'site'))
WORK = os.path.join(ROOT, '.work')
IMG = os.path.join(OUT, 'img')
ATTRS = ['bol_img_kenmerken', 'bol_img_maathulp', 'bol_img_verstelbaar', 'bol_img_voorwie', 'bol_img_gemak']
TODAY = datetime.date.today().isoformat()

# ------------------------------------------------------------------ tekst
def parse(text):
    d = dict(kop='', kenmerk=[], stap=[], voorwie=[], gemak=[], koppen={}, fotos={}, fouten=[])
    for raw in (text or '').replace('\r', '').split('\n'):
        line = raw.strip()
        if not line or ':' not in line:
            continue
        key, val = [x.strip() for x in line.split(':', 1)]
        key = key.lower()
        if key == 'kop':
            d['kop'] = val
        elif key.startswith('foto '):
            v = val.lower()
            if v in ('geen', 'nee') or v.isdigit():
                d['fotos'][key[5:].strip()] = 0 if not v.isdigit() else int(v)
            else:
                d['fouten'].append(f'"{line}": gebruik een fotonummer of "geen"')
        elif key.startswith('kop '):
            d['koppen'][key[4:].strip()] = val
        elif key == 'stap':
            d['stap'].append(val)
        elif key in ('kenmerk', 'voorwie', 'gemak'):
            parts = [p.strip() for p in val.split('|')]
            if len(parts) != 3:
                d['fouten'].append(f'Regel heeft geen 3 delen: "{line}"')
                continue
            if not T.icon_exists(parts[0]):
                d['fouten'].append(f'Onbekend icoon "{parts[0]}" (standaardicoon gebruikt)')
                parts[0] = 'standaard'
            d[key].append(parts)
        else:
            d['fouten'].append(f'Onbekend regeltype "{key}"')
    if not d['kop']:
        d['fouten'].append('Geen kop')
    return d

# ------------------------------------------------------------------ bronnen
class Magento:
    def __init__(self):
        self.base = os.environ['MAGENTO_URL'].rstrip('/')
        self.s = requests.Session()
        self.s.headers['Authorization'] = 'Bearer ' + os.environ['MAGENTO_TOKEN']
        self.sets = {}

    def get(self, path, params=None):
        r = self.s.get(f'{self.base}/rest/V1/{path}', params=params, timeout=60)
        r.raise_for_status()
        return r.json()

    def search(self, filters, page=1):
        p = {'searchCriteria[pageSize]': 100, 'searchCriteria[currentPage]': page}
        for i, (f, v, c) in enumerate(filters):
            p[f'searchCriteria[filter_groups][{i}][filters][0][field]'] = f
            p[f'searchCriteria[filter_groups][{i}][filters][0][value]'] = v
            p[f'searchCriteria[filter_groups][{i}][filters][0][condition_type]'] = c
        out = []
        while True:
            r = self.get('products', p)
            out += r.get('items', [])
            if len(out) >= r.get('total_count', 0) or not r.get('items'):
                return out
            p['searchCriteria[currentPage]'] += 1

    def set_attrs(self, set_id):
        if set_id not in self.sets:
            self.sets[set_id] = {a['attribute_id']: a for a in self.get(f'products/attribute-sets/{set_id}/attributes')}
        return self.sets[set_id]

    def models(self):
        only = [s.strip() for s in os.environ.get('ONLY_SKUS', '').split(',') if s.strip()]
        items = self.search([('type_id', 'configurable', 'eq'), ('bol_infographic', '', 'notnull')])
        if only:
            items = [i for i in items if i['sku'] in only]
        for it in items:
            ca = {c['attribute_code']: c['value'] for c in it.get('custom_attributes', [])}
            photos, labels = self.gallery(it)
            # maat-attribuut van het configurable product
            codes = []
            try:
                opts = self.get(f'configurable-products/{it["sku"]}/options/all')
                attrs = self.set_attrs(it['attribute_set_id'])
                for o in opts:
                    a = attrs.get(int(o['attribute_id']))
                    if a:
                        codes.append((a['attribute_code'], {str(x['value']): x['label'] for x in a.get('options', [])}))
            except Exception:
                pass
            children = []
            kids = self.get(f'configurable-products/{it["sku"]}/children')
            full = {p['sku']: p for p in self.search([('sku', ','.join(k['sku'] for k in kids), 'in')])} if kids else {}
            for ch in kids:
                ch = full.get(ch['sku'], ch)
                cca = {c['attribute_code']: c['value'] for c in ch.get('custom_attributes', [])}
                size = None
                for code, optlabels in codes:
                    if code in cca:
                        size = optlabels.get(str(cca[code]), size)
                if not size:                                  # reserve: maat achter het laatste streepje in de naam
                    m = re.search(r'-\s*([^-]+)\s*$', ch.get('name', ''))
                    size = m.group(1).strip() if m else None
                children.append(dict(sku=ch['sku'], ean=str(cca.get('eancode') or '').strip(), size=size,
                                     enabled=ch.get('status', 1) == 1))
            yield dict(sku=it['sku'], name=it['name'], text=ca.get('bol_infographic', ''),
                       size_chart=ca.get('size_chart', ''), photos=photos, labels=labels, children=children)

    def gallery(self, it):
        ents = [m for m in sorted(it.get('media_gallery_entries') or [], key=lambda m: m.get('position') or 0)
                if m.get('media_type') == 'image' and not m.get('disabled')]
        return ([f"{self.base}/media/catalog/product{m['file']}" for m in ents], [m.get('label') or '' for m in ents])

    def all_photos(self):
        """Alle configurables binnen MISSING_LIKE, voor de fotobladen."""
        items = self.search([('type_id', 'configurable', 'eq'), ('name', os.environ.get('MISSING_LIKE', 'Varomed%'), 'like')])
        for it in sorted(items, key=lambda i: i['sku']):
            urls, labels = self.gallery(it)
            yield dict(sku=it['sku'], name=it['name'], photos=urls, labels=labels)

    def missing(self):
        like = os.environ.get('MISSING_LIKE', 'Varomed%')
        if not like:
            return []
        items = self.search([('type_id', 'configurable', 'eq'), ('bol_infographic', '', 'null'),
                             ('name', like, 'like'), ('status', '1', 'eq')])
        skip = [x.strip().lower() for x in os.environ.get('MISSING_EXCLUDE', 'Hielband').split(',') if x.strip()]
        return [(i['sku'], i['name']) for i in items if not any(x in i['name'].lower() for x in skip)]

class Fixture:
    def __init__(self, path):
        self.d = json.load(open(path))
    def models(self):
        yield from self.d['models']
    def missing(self):
        return self.d.get('missing', [])
    def all_photos(self):
        yield from self.d['models']

# ------------------------------------------------------------------ foto's
def load_photo(src):
    data = requests.get(src, timeout=60).content if src.startswith('http') else open(src, 'rb').read()
    im = Image.open(io.BytesIO(data))
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[-1]); im = bg
    return im.convert('RGB')

def trim(im, pad=0.04):
    """Witte rand rond het product weghalen (met een kleine marge)."""
    box = im.convert('L').point(lambda p: 255 if p < 238 else 0).getbbox()
    if not box:
        return im
    m = int(max(box[2] - box[0], box[3] - box[1]) * pad)
    return im.crop((max(0, box[0] - m), max(0, box[1] - m), min(im.width, box[2] + m), min(im.height, box[3] + m)))

def detail_crop(im, aspect=1104 / 690):
    """Uitsnede rond het product: breedte = 62% van het product, midden van het product."""
    g = im.convert('L').point(lambda p: 255 if p < 238 else 0)
    box = g.getbbox() or (0, 0, im.width, im.height)
    pw = box[2] - box[0]
    w = max(200, int(pw * 0.62)); h = int(w / aspect)
    cx, cy = (box[0] + box[2]) // 2, (box[1] + box[3]) // 2
    l = min(max(0, cx - w // 2), max(0, im.width - w)); t = min(max(0, cy - h // 2), max(0, im.height - h))
    return im.crop((l, t, l + w, t + h))

def save(im, name, maxw=1400):
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    p = os.path.join(WORK, name); im.save(p, quality=92); return p

# ------------------------------------------------------------------ render
class Renderer:
    def __init__(self, pw):
        self.b = pw.chromium.launch()
        self.p = self.b.new_page(viewport={'width': 1200, 'height': 1200})
        self.engine = None

    def jpg(self, html, out):
        f = os.path.join(WORK, 'page.html'); open(f, 'w').write(html)
        self.p.goto('file://' + f); self.p.wait_for_load_state('load')
        self.p.evaluate('document.fonts.ready')
        self.p.screenshot(path=out, type='jpeg', quality=88, clip=dict(x=0, y=0, width=1200, height=1200))

    def chart(self, size_chart):
        """Leest de maattabel met dezelfde engine als de webshop."""
        if not size_chart or '[maatadvies]' not in size_chart:
            return None
        txt = re.sub(r'<[^>]+>', '', re.sub(r'</p>\s*<p>', '\n', size_chart))
        txt = H.unescape(txt)
        self.p.set_content('<body></body>')
        self.p.add_script_tag(path=os.path.join(ROOT, 'engine/akh-maat-engine.js'))
        return self.p.evaluate('''t => { const A = window.AKHMaat, r = A.check(t), c = r.config;
            if (!c || !c.mappings || !c.mappings.length) return null;
            const m = c.mappings[0], tpl = A.templates[c.template] || {}, meta = (tpl.measures || {})[m.measure] || {};
            const mel = (t.match(/melding\\s*:\\s*valt\\s+(klein|ruim)/i) || [])[1] || null;
            return {template: c.template, measure: m.measure, table: m.table, svg: meta.svg || '', label: meta.label || m.measure,
                    text: meta.text || '', melding: mel}; }''', txt)

def recolor(svg, template, measure):
    for a, b in [('#2399c7', '#0b6e78'), ('#cfe4ee', '#cde3e6'), ('#bcd8e5', '#b5d4d8'), ('#a9c9d8', '#a3c7cc')]:
        svg = re.sub(a, b, svg, flags=re.I)
    svg = re.sub('#12263A', '#10282d', svg, flags=re.I).replace('class="akh-maat__pulse"', '')
    if template == 'enkel' and measure == 'voetlengte':
        svg = svg.replace('viewBox="30 0 180 200"', 'viewBox="50 10 150 190"')
    return svg

def first_sentence(t, n=170):
    s = re.split(r'(?<=\.)\s', t.strip())[0] if t else ''
    return s if len(s) <= n else s[:n].rsplit(' ', 1)[0] + '…'

# ------------------------------------------------------------------ hoofdprogramma
def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]

def model_hash(m, sizes):
    key = json.dumps([TEMPLATE_VERSION, m['text'], m['size_chart'], m['photos'], m.get('labels'), sorted(sizes),
                      open(os.path.join(ROOT, 'templates.py')).read()], ensure_ascii=False)
    return hashlib.sha256(key.encode()).hexdigest()[:10]

# trefwoorden in de alt-tekst (label) van een productfoto
KEYWORDS = {
    'detail': ['detail'],
    'bovenkant': ['bovenkant', 'bovenaanzicht', 'van boven'],
    'zijkant': ['zijkant', 'zijaanzicht'],
    'onderkant': ['onderkant', 'onderaanzicht'],
    'voet': ['aan de voet', 'gedragen', 'in gebruik'],
}

def find_photo(labels, kind):
    for i, l in enumerate(labels or []):
        if any(w in (l or '').lower() for w in KEYWORDS[kind]):
            return i + 1
    return None

def build_model(r, m, d, h, sizes, rep):
    """Maakt alle afbeeldingen van één model. Geeft {soort: bestand} en {maat: bestand}."""
    base = slug(m['name']); files = {}; maat = {}
    photos = []
    labels = m.get('labels') or []
    # stappen: gekozen foto > 'detail' > 'bovenkant' > uitsnede van de hoofdfoto
    n_st = d['fotos'].get('stappen') or find_photo(labels, 'detail') or find_photo(labels, 'bovenkant')
    # gemak: gekozen foto ('geen' = 0) > 'aan de voet' > 'zijkant' > 'onderkant' > alleen iconen
    n_ge = d['fotos'].get('gemak', None)
    if n_ge is None:
        n_ge = find_photo(labels, 'voet') or find_photo(labels, 'zijkant') or find_photo(labels, 'onderkant') or 0
    want = {1, n_st, n_ge} - {None, 0}
    for i, src in enumerate(m['photos']):
        if i + 1 not in want:
            photos.append(None); continue
        try:
            photos.append(load_photo(src))
        except Exception as ex:
            rep['waarschuwingen'].append(f'Foto {i+1} niet te laden ({ex.__class__.__name__})')
            photos.append(None)
    def foto(n):
        return photos[n - 1] if 0 < n <= len(photos) else None
    for k, n in d['fotos'].items():
        if n and not foto(n):
            rep['waarschuwingen'].append(f'foto {k}: foto {n} bestaat niet')
    if not foto(1):
        rep['fouten'].append('Geen productfoto gevonden')
    p1 = save(trim(foto(1)), 'p1.jpg') if foto(1) else ''

    def out(kind, html):
        fn = f'{base}-{kind}-{h}.jpg'; r.jpg(html, os.path.join(IMG, fn)); files[kind] = fn

    if len(d['kenmerk']) >= 2 and p1:
        out('kenmerken', T.kenmerken(d['kop'], d['kenmerk'][:6], p1))
    elif d['kenmerk']:
        rep['waarschuwingen'].append('Minder dan 2 kenmerken: geen kenmerken-afbeelding')
    src2 = foto(n_st) if n_st else None
    if len(d['stap']) >= 2 and (src2 or foto(1)):
        ph = save(trim(src2) if src2 else detail_crop(foto(1)), 'p2.jpg')
        out('verstelbaar', T.stappen(d['koppen'].get('stappen', 'Zo stel je hem in'), d['stap'], ph))
    if len(d['voorwie']) >= 2:
        out('voorwie', T.voorwie(d['koppen'].get('voorwie', 'Voor wie is dit?'), d['voorwie'][:4]))
    if d['gemak']:
        ph = save(trim(foto(n_ge)), 'p3.jpg') if n_ge and foto(n_ge) and 2 <= len(d['gemak']) <= 3 else None
        out('gemak', T.gemak(d['koppen'].get('gemak', 'Handig in gebruik'), d['gemak'][:3], ph))

    ch = r.chart(m['size_chart'])
    if not ch:
        rep['waarschuwingen'].append('Geen bruikbare maattabel: geen maathulp')
    else:
        vals = [x['value'] for x in ch['table']]
        def match(s):          # 'Maat 36' of '36' -> '36'
            if s in vals: return s
            return next((v for v in vals if re.search(rf'(^|[^0-9A-Za-z]){re.escape(v)}($|[^0-9A-Za-z])', s)), None)
        mapped = {s: match(s) for s in sizes}
        table = [x for x in ch['table'] if x['value'] in mapped.values()] or ch['table']
        svg = recolor(ch['svg'], ch['template'], ch['measure'])
        for s, v in mapped.items():
            if not v:
                rep['waarschuwingen'].append(f'"{s}" staat niet in de maattabel')
                continue
            fn = f'{base}-maat-{slug(v)}-{h}.jpg'
            if not os.path.exists(os.path.join(IMG, fn)):
                r.jpg(T.maathulp(v, table, svg, ch['melding'], ch['label'], first_sentence(ch['text'])), os.path.join(IMG, fn))
            maat[s] = fn
    return files, maat

def main():
    os.makedirs(IMG, exist_ok=True); shutil.rmtree(WORK, ignore_errors=True); os.makedirs(WORK)
    src = Fixture(os.environ['FIXTURE']) if os.environ.get('FIXTURE') else Magento()
    pages = os.environ.get('PAGES_URL', '').rstrip('/')
    mf_path = os.path.join(OUT, 'manifest.json')
    manifest = json.load(open(mf_path)) if os.path.exists(mf_path) else {'models': {}, 'retired': {}}
    seen, feed, report = set(), [], []

    with sync_playwright() as pw:
        r = Renderer(pw)
        for m in src.models():
            d = parse(m['text'])
            kids = [c for c in m['children'] if c['enabled']]
            sizes = list(dict.fromkeys(c['size'] for c in kids if c['size']))
            h = model_hash(m, sizes)
            rep = dict(sku=m['sku'], name=m['name'], fouten=list(d['fouten']), waarschuwingen=[], status='ongewijzigd', photos=m['photos'], labels=m.get('labels') or [])
            old = manifest['models'].get(m['sku'])
            have = old and old['hash'] == h and all(os.path.exists(os.path.join(IMG, f))
                                                     for f in list(old['files'].values()) + list(old['maat'].values()))
            if not have:
                files, maat = build_model(r, m, d, h, sizes, rep)
                rep['status'] = 'nieuw' if not old else 'bijgewerkt'
                manifest['models'][m['sku']] = dict(hash=h, name=m['name'], files=files, maat=maat, notes=rep['waarschuwingen'])
            else:
                files, maat = old['files'], old['maat']
                rep['waarschuwingen'] = old.get('notes', [])
            seen.add(m['sku'])
            for c in kids:
                if not c['ean']:
                    rep['waarschuwingen'].append(f'{c["sku"]} heeft geen EAN')
                    continue
                row = dict(ean=c['ean'], sku=c['sku'], parent=m['sku'], size=c['size'] or '')
                for a in ATTRS:
                    kind = a[len('bol_img_'):]
                    fn = maat.get(c['size']) if kind == 'maathulp' else files.get(kind)
                    row[a] = f'{pages}/img/{fn}' if fn else ''
                feed.append(row)
            rep['files'] = list(files.values()) + list(maat.values())[:1]
            rep['aantal'] = len(files) + len(maat)
            report.append(rep)
            print(f'{rep["status"]:11} {m["sku"]} {m["name"]}')

    # opruimen: niet meer gebruikte afbeeldingen na 14 dagen weg
    used = {f for k, v in manifest['models'].items() if k in seen for f in list(v['files'].values()) + list(v['maat'].values())}
    if os.environ.get('ONLY_SKUS'):
        used |= {f for k, v in manifest['models'].items() for f in list(v['files'].values()) + list(v['maat'].values())}
    else:
        manifest['models'] = {k: v for k, v in manifest['models'].items() if k in seen}
    for f in os.listdir(IMG):
        if f in used:
            manifest['retired'].pop(f, None)
        else:
            since = manifest['retired'].setdefault(f, TODAY)
            if (datetime.date.fromisoformat(TODAY) - datetime.date.fromisoformat(since)).days >= 14:
                os.remove(os.path.join(IMG, f)); manifest['retired'].pop(f)
    json.dump(manifest, open(mf_path, 'w'), indent=1, ensure_ascii=False)

    write_feed(feed)
    write_report(report, src.missing(), len(feed))
    if os.environ.get('FOTOBLADEN') in ('1', 'true'):
        make_sheets(src)
    shutil.rmtree(WORK, ignore_errors=True)

def make_sheets(src):
    """Fotobladen: alle productfoto's in raster, om te labelen."""
    from PIL import ImageDraw, ImageFont
    d = os.path.join(OUT, 'fotobladen'); shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    fb = lambda sz: ImageFont.truetype(os.path.join(ROOT, 'fonts/Inter-Bold.otf'), sz)
    fm = lambda sz: ImageFont.truetype(os.path.join(ROOT, 'fonts/Inter-Medium.otf'), sz)
    tiles = []
    for m in src.all_photos():
        for k, url in enumerate(m['photos']):
            tiles.append((m['sku'], k + 1, m['name'], url, (m.get('labels') or [''] * 99)[k]))
    C, R, W, TH = 5, 4, 380, 76
    rows = []
    for b in range(0, len(tiles), C * R):
        sheet = Image.new('RGB', (C * W, R * (W + TH)), 'white'); dr = ImageDraw.Draw(sheet)
        for j, (sku, nr, name, url, label) in enumerate(tiles[b:b + C * R]):
            x, y = (j % C) * W, (j // C) * (W + TH)
            try:
                im = trim(load_photo(url)); im.thumbnail((W - 24, W - 24))
                sheet.paste(im, (x + (W - im.width) // 2, y + TH + (W - im.height) // 2))
            except Exception:
                dr.text((x + 20, y + TH + 150), 'foto niet te laden', fill='#b42318', font=fm(20))
            dr.rectangle((x + 6, y + 6, x + W - 6, y + TH - 4), fill='#10282d')
            dr.text((x + 16, y + 12), f'{sku}  ·  foto {nr}', fill='white', font=fb(22))
            short = name.replace('Varomed ', '').replace('Verbandschoenen ', '').replace('Verbandschoen ', '')
            dr.text((x + 16, y + 42), short[:34], fill='#cde3e6', font=fm(19))
            dr.rectangle((x, y, x + W - 1, y + W + TH - 1), outline='#d5e6e8', width=2)
            rows.append((b // (C * R) + 1, sku, nr, name, url.split('/media/catalog/product')[-1], label))
        sheet.save(os.path.join(d, f'blad-{b // (C * R) + 1:02d}.jpg'), quality=85)
    n = -(-len(tiles) // (C * R))
    html = ('<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Fotobladen</title>'
            '<body style="font:15px system-ui;margin:32px"><h1>Fotobladen</h1>'
            f'<p>{len(tiles)} foto\'s op {n} bladen.</p>'
            + ''.join(f'<p><a href="blad-{i:02d}.jpg">blad-{i:02d}.jpg</a></p>' for i in range(1, n + 1))
            + '<table border=1 cellpadding=4 style="border-collapse:collapse"><tr><th>blad</th><th>sku</th><th>foto</th><th>bestand</th><th>huidige alt-tekst</th></tr>'
            + ''.join(f'<tr><td>{a}</td><td>{H.escape(b)}</td><td>{c}</td><td>{H.escape(e_)}</td><td>{H.escape(f)}</td></tr>' for a, b, c, _, e_, f in rows)
            + '</table>')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    print(f'{len(tiles)} foto\'s op {n} fotobladen')

def write_feed(rows):
    out = ['<?xml version="1.0" encoding="UTF-8"?>', '<products>']
    for r in rows:
        out.append('  <product>' + ''.join(f'<{k}>{X.escape(str(v))}</{k}>' for k, v in r.items()) + '</product>')
    out.append('</products>')
    open(os.path.join(OUT, 'feed.xml'), 'w').write('\n'.join(out))

def write_report(rep, missing, n_ean):
    e = H.escape
    lab = lambda r, k: r['labels'][k] if k < len(r.get('labels') or []) else ''
    cnt = lambda s: sum(1 for r in rep if r['status'] == s)
    rows = ''.join(
        f'<tr><td><b>{e(r["name"])}</b><br><small>{e(r["sku"])} · {r["aantal"]} afbeeldingen · {e(r["status"])}</small>'
        + ''.join(f'<div class="err">{e(x)}</div>' for x in r['fouten'])
        + ''.join(f'<div class="warn">{e(x)}</div>' for x in r['waarschuwingen'])
        + '</td><td>' + ''.join(f'<a href="img/{f}"><img src="img/{f}" loading="lazy"></a>' for f in r.get('files', []))
        + '<div class="ph"><small>Productfoto\'s (alt-tekst bij muis erboven; nummer voor <code>foto stappen:</code> / <code>foto gemak:</code>)</small><br>'
        + ''.join(f'<a href="{e(p)}" title="{e(lab(r, k))}"><span>{k+1}</span><img src="{e(p)}" loading="lazy"></a>' for k, p in enumerate(r.get('photos', [])))
        + '</div></td></tr>'
        for r in sorted(rep, key=lambda r: (not (r['fouten'] or r['waarschuwingen']), r['name'])))
    miss = ''.join(f'<li>{e(n)} <small>({e(s)})</small></li>' for s, n in missing)
    html = f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Bol-infographics: overzicht</title><style>body{{font:15px/1.45 system-ui;margin:32px;color:#10282d}}
table{{border-collapse:collapse;width:100%}}td{{border-top:1px solid #d5e6e8;padding:12px 8px;vertical-align:top}}
td img{{width:120px;height:120px;margin:0 6px 6px 0;border:1px solid #d5e6e8;border-radius:8px}}
.ph a{{position:relative;display:inline-block}}.ph img{{width:72px;height:72px}}.ph span{{position:absolute;left:4px;top:2px;font:700 12px system-ui;background:#10282d;color:#fff;border-radius:4px;padding:0 4px}}.err{{color:#b42318}}.warn{{color:#8a5a00}}small{{color:#4a5f63}}.k span{{display:inline-block;margin-right:24px}}</style></head><body>
<h1>Bol-infographics</h1><p>Laatst bijgewerkt: {datetime.datetime.now().strftime("%d-%m-%Y %H:%M")} · <a href="feed.xml">feed.xml</a></p>
<p class="k"><span><b>{len(rep)}</b> modellen</span><span><b>{cnt("nieuw")}</b> nieuw</span><span><b>{cnt("bijgewerkt")}</b> bijgewerkt</span><span><b>{n_ean}</b> EAN's in de feed</span></p>
{f"<h2>Nog geen tekst in bol_infographic ({len(missing)})</h2><ul>{miss}</ul>" if missing else ""}
<h2>Modellen</h2><table>{rows}</table></body></html>'''
    open(os.path.join(OUT, 'index.html'), 'w').write(html)

if __name__ == '__main__':
    main()
