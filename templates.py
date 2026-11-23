"""HTML-sjablonen voor de Bol-infographics (1200x1200, Inter, petrol)."""
import os, html as H

ROOT = os.path.dirname(os.path.abspath(__file__))
ICONS = os.path.join(ROOT, 'node_modules/@phosphor-icons/core/assets')
P = dict(ink='#10282d', acc='#0b6e78', muted='#4a5f63', soft='#e7f2f3', soft2='#f4f9fa', line='#d5e6e8', warm='#fff1d6')

# korte codes -> (hoofdicoon, badge-icoon of tekst)
CODES = {
    'klittenband': ('arrows-in-line-horizontal', None), 'lucht': ('wind', None), 'zool': ('stack', None),
    'hiel': ('shield-check', None), 'gezwollen': ('footprints', 'arrows-out-line-horizontal'),
    'verband': ('bandaids', None), 'steunzool': ('sneaker', 'plus'), 'stevig': ('person-simple-walk', 'shield-check'),
    'wasbaar30': ('washing-machine', '30°'), 'vocht': ('drop', None), 'warm': ('thermometer-cold', None),
    'licht': ('feather', None), 'zacht': ('hand-heart', None), 'zon': ('sun', None),
    'breed': ('arrows-out-line-horizontal', None), 'open': ('door-open', None), 'standaard': ('check-circle', None),
}

def icon_exists(code):
    if code.startswith('ph:'):
        return os.path.exists(f'{ICONS}/duotone/{code[3:]}-duotone.svg')
    return code in CODES

def _svg(name, size, color, style='duotone'):
    s = open(f'{ICONS}/{style}/{name}-{style}.svg').read()
    if style == 'duotone':
        s = s.replace('opacity="0.2"', 'opacity="0.22"')
    return s.replace('<svg ', f'<svg width="{size}" height="{size}" style="color:{color};display:block" ', 1)

def resolve(code):
    if code.startswith('ph:'):
        return code[3:], None
    return CODES.get(code, CODES['standaard'])

def tile_icon(code, size, box=None, badge=True):
    """Icoon op witte tegel met zachte schaduw, optioneel met badge."""
    main, b = resolve(code)
    box = box or size + 56
    inner = ''
    if badge and b:
        bs = round(box * 0.33)
        cont = (_svg(b, round(bs * 0.52), '#fff', 'bold') if not b.endswith('°')
                else f'<span style="font:800 {round(bs*0.4)}px Inter;color:#fff">{b}</span>')
        inner = (f'<div style="position:absolute;right:-6px;bottom:-6px;width:{bs}px;height:{bs}px;border-radius:50%;'
                 f'background:{P["acc"]};border:5px solid #fff;display:flex;align-items:center;justify-content:center">{cont}</div>')
    return (f'<div style="position:relative;flex:none;width:{box}px;height:{box}px;border-radius:{round(box*0.22)}px;'
            f'background:linear-gradient(145deg,#fff,{P["soft"]});box-shadow:0 14px 30px -18px rgba(11,110,120,.55),inset 0 0 0 2px #fff;'
            f'display:flex;align-items:center;justify-content:center">{_svg(main, size, P["acc"])}{inner}</div>')

def css():
    f = os.path.join(ROOT, 'fonts')
    faces = ''.join(f"@font-face{{font-family:Inter;font-weight:{w};src:url('file://{f}/Inter-{n}.otf')}}"
                    for w, n in [(500, 'Medium'), (600, 'SemiBold'), (700, 'Bold'), (800, 'ExtraBold')])
    faces += f"@font-face{{font-family:'Inter Display';font-weight:800;src:url('file://{f}/InterDisplay-ExtraBold.otf')}}"
    return faces + f'''*{{box-sizing:border-box}}body{{margin:0;width:1200px;height:1200px;background:#fff;font-family:Inter,sans-serif;color:{P["ink"]};-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}}
h1{{margin:0;font:800 66px/1.05 'Inter Display',Inter;letter-spacing:-1.5px}}
.sub{{margin:14px 0 0;font:500 30px/1.35 Inter;color:{P["muted"]}}}
.tag{{display:inline-block;font:600 26px Inter;color:{P["acc"]};background:{P["soft"]};border-radius:99px;padding:10px 24px;margin-bottom:22px}}
.head{{position:absolute;left:64px;top:60px;right:64px}}
.card{{background:{P["soft2"]};border:2px solid {P["line"]};border-radius:30px}}
.t{{display:block;font:800 36px/1.15 Inter}}.s{{display:block;font:500 27px/1.3 Inter;color:{P["muted"]}}}'''

def page(body):
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{css()}</style></head><body>{body}</body></html>'

e = H.escape
def head(tag, title, sub=None):
    return (f'<div class="head"><span class="tag">{e(tag)}</span><h1>{e(title)}</h1>'
            + (f'<p class="sub">{e(sub)}</p>' if sub else '') + '</div>')

# ---------- 1. Kenmerken: foto + 2 tot 6 tegels ----------
def kenmerken(kop, items, photo):
    n = len(items)
    cols = 3 if n in (3, 5, 6) else 2
    rows = -(-n // cols)
    small = cols == 3
    cards = ''.join(
        f'<div class="card" style="display:flex;{"flex-direction:column;text-align:center;align-items:center;gap:14px;padding:24px 16px" if small else "gap:20px;align-items:center;padding:26px 28px"}">'
        f'{tile_icon(i[0], 50 if small else 54, 84, badge=False)}<div><b class="t" style="font-size:{30 if small else 36}px">{e(i[1])}</b>'
        f'<span class="s" style="font-size:{23 if small else 27}px">{e(i[2])}</span></div></div>' for i in items)
    return page(
        f'<div style="position:absolute;left:48px;right:48px;top:60px;bottom:48px;display:flex;flex-direction:column;gap:26px">'
        f'<div style="padding:0 16px"><span class="tag">Kenmerken</span><h1>{e(kop)}</h1></div>'
        f'<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 60px">'
        f'<img src="{photo}" style="max-width:100%;max-height:100%;object-fit:contain;mix-blend-mode:multiply"></div>'
        f'<div style="display:grid;grid-template-columns:repeat({cols},1fr);gap:18px">{cards}</div></div>')

# ---------- 4. Stappen (verstelbaar) ----------
def stappen(kop, steps, photo):
    st = ''.join(
        f'<div class="card" style="flex:1;padding:22px 26px"><div style="width:56px;height:56px;border-radius:50%;background:{P["acc"]};'
        f'color:#fff;font:800 30px/56px Inter;text-align:center;margin-bottom:14px">{k+1}</div><b style="display:block;font:700 32px/1.2 Inter">{e(s)}</b></div>'
        for k, s in enumerate(steps[:4]))
    return page(head('Zo werkt het', kop) +
        f'<img src="{photo}" style="position:absolute;left:48px;top:240px;width:1104px;height:690px;object-fit:cover;border-radius:40px">'
        f'<div style="position:absolute;left:48px;right:48px;bottom:48px;display:flex;gap:18px">{st}</div>')

# ---------- 5. Voor wie: 2 tot 4 tegels met iconen ----------
def voorwie(kop, items):
    n = len(items)
    cols = 3 if n == 3 else 2
    big = 116 if n != 3 else 100
    tiles = ''.join(
        f'<div class="card" style="border-radius:34px;padding:30px 22px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">'
        f'{tile_icon(i[0], big)}<b class="t" style="margin-top:24px">{e(i[1])}</b><span class="s" style="margin-top:6px">{e(i[2])}</span></div>'
        for i in items)
    top = 250 if n != 2 else 330
    bottom = 48 if n != 2 else 250
    return page(head('Geschikt voor', kop) +
        f'<div style="position:absolute;left:48px;right:48px;top:{top}px;bottom:{bottom}px;display:grid;grid-template-columns:repeat({cols},1fr);gap:22px">{tiles}</div>')

# ---------- 6. Gemak: met foto (naast de lijst) of alleen iconen ----------
def gemak(kop, items, photo=None):
    row = lambda i, sz, fs: (f'<div class="card" style="display:flex;gap:{round(sz*0.3)}px;align-items:center;border-radius:34px;padding:{round(sz*0.28)}px {round(sz*0.32)}px">'
                             f'{tile_icon(i[0], sz)}<div><b class="t" style="font-size:{fs}px">{e(i[1])}</b><span class="s" style="font-size:{round(fs*0.7)}px">{e(i[2])}</span></div></div>')
    if photo:
        return page(head('Gemak', kop) +
            f'<div style="position:absolute;left:40px;top:330px;width:470px;height:470px;border-radius:50%;background:{P["soft"]}"></div>'
            f'<img src="{photo}" style="position:absolute;left:0;top:300px;width:540px;height:540px;object-fit:contain;mix-blend-mode:multiply">'
            f'<div style="position:absolute;left:540px;right:48px;top:250px;bottom:48px;display:flex;flex-direction:column;justify-content:center;gap:22px">'
            + ''.join(row(i, 60, 32) for i in items) + '</div>')
    return page(head('Gemak', kop) +
        '<div style="position:absolute;left:48px;right:48px;top:240px;bottom:48px;display:flex;flex-direction:column;justify-content:center;gap:30px">'
        + ''.join(row(i, 96, 44) for i in items) + '</div>')

# ---------- 3. Maathulp per maat ----------
def maathulp(size, table, svg, melding, label='voetlengte', text='Zet je hiel tegen de muur en meet tot het puntje van je langste teen.', unit='cm'):
    f = lambda n: f'{round(n*10)/10:g}'.replace('.', ',')
    r = next(x for x in table if x['value'] == size)
    many = len(table) > 12
    pas = {'klein': ('Valt klein', f'Bestel op je {label}, niet op je gewone maat.'),
           'ruim': ('Valt ruim', 'Twijfel je tussen twee maten? Kies de kleinere.')}.get(melding)
    cells = ''.join(f'<div class="c{" on" if x["value"]==size else ""}"><b>{e(x["value"])}</b><span>{f(x["min"])}–{f(x["max"])} {unit}</span></div>' for x in table)
    extra = f'''.w{{position:absolute;inset:60px;display:flex;flex-direction:column;gap:24px;justify-content:space-between}}
.w .tag{{align-self:flex-start;margin:0}}.w h1{{font-size:64px}}
.hero{{display:flex;gap:40px;align-items:center;background:linear-gradient(150deg,{P["soft"]},{P["soft2"]});border-radius:44px;padding:28px 56px}}
.hero svg{{width:{200 if many else 240}px;height:auto;flex:none}}
.big small{{display:block;font:600 30px Inter;color:{P["muted"]};margin-bottom:8px}}
.big b{{display:block;font:800 92px/1 'Inter Display',Inter;letter-spacing:-3px;white-space:nowrap}}
.big b span{{font-size:56px;letter-spacing:0;margin-left:8px;color:{P["muted"]}}}
.big p{{margin:22px 0 0;font:500 28px/1.4 Inter;color:{P["muted"]}}}
.alle h2{{margin:0 0 16px;font:700 30px Inter}}
.grid{{display:grid;grid-template-columns:repeat({5 if many else 4},1fr);gap:12px}}
.c{{border:2.5px solid {P["line"]};border-radius:20px;padding:12px 16px}}
.c b{{display:block;font:800 34px/1.1 'Inter Display',Inter}}.c span{{font:500 22px Inter;color:{P["muted"]};white-space:nowrap}}
.c.on{{background:{P["acc"]};border-color:{P["acc"]};color:#fff}}.c.on span{{color:#ffffffd9}}
.pas{{display:flex;gap:18px;align-items:center;background:{P["warm"]};border-radius:28px;padding:22px 28px;font:500 28px/1.35 Inter}}
.pas b{{flex:none;background:{P["ink"]};color:#fff;border-radius:99px;padding:8px 20px;font:700 26px Inter}}'''
    body = (f'<div class="w"><span class="tag">Maathulp</span><h1>Maat {e(size)} past bij deze {e(label)}</h1>'
            f'<div class="hero">{svg}<div class="big"><small>Jouw {e(label)}</small><b>{f(r["min"])}–{f(r["max"])}<span>{unit}</span></b>'
            f'<p>{e(text)}</p></div></div>'
            f'<div class="alle"><h2>Andere {e(label)}? Zo vind je jouw maat:</h2><div class="grid">{cells}</div></div>'
            + (f'<div class="pas"><b>{pas[0]}</b><span>{pas[1]}</span></div>' if pas else '') + '</div>')
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{css()}{extra}</style></head><body>{body}</body></html>'
