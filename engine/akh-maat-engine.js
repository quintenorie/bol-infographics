/* =====================================================================
   All4Fysio maatadvies — gedeelde engine v27 (akh-maat-engine-v27.js)
   Upload via FTP naar /media/wysiwyg/Maatadvies/ (nooit overschrijven:
   een wijziging = een nieuwe bestandsnaam, zie de bouwhandleiding).
   v2: sjablonen en pictogrammen (svg) mogen ook in het CMS-blokje staan.
   v3: adviespagina weer als het oorspronkelijke ontwerp ("Op basis van ..."), geen klikbare maten.
   v4: range-koppeling met gaps: 'larger'/'smaller' (gaatjes in de maattabel per product); keuze zonder
       verwachte waarden (bv. alleen "Universeel") gebruikt automatisch de echte productwaarden.
   v5: one size wordt ook gemeten (past hij?); is de passende maat uitverkocht, dan zeggen we dat
       in plaats van een andere maat te adviseren.
   v6: maattabel als gewone tekst in het productattribuut (size_chart), alle sjablonen ingebouwd
       (pols, nek, knie, enkel, steunkous). Laden via één CMS-block/widget op alle productpagina's.
   v7: maat-attribuut wordt automatisch gevonden (bv. sizes_numeric); tekst zonder alinea's in de
       "(Maattabel)"-popup: alleen de tekst verbergen, niet de knop/popup zelf.
   v8: enkel-sjabloon met schoenmaat (EU, geen cm), hielbreedte en omvang midden voet; open bereiken
       in de tekst ("<21", "tot 21", "48+", "vanaf 48", ">6"); eenheid per meetpunt (unit).
   v9: sjabloon duim (duimbraces): polsomvang, handomvang (zonder duim, onder de knokkels) en duimomvang.
   v10: handomvang duidelijker: om de handpalm op de grote knokkels waar de vingers beginnen (niet om de vingers).
   v11: alle maattabellen van de webshop (14 rondes). Nieuw:
        - sjablonen vinger, elleboog, been, romp (ook als schouder, mitella, rug, bekken, borst, buik), teen;
        - knie: "onder knie", "kniebreedte"; pols: "hand", "handlengte", "handbreedte"; enkel: "voorvoet", "voetlengte";
          steunkous: lichaamslengte, gewicht (kg), hiel-wreef, schoenmaat, lengte kuit;
        - "afstand:" per meetpunt ("afstand: bovenbeen 14, onderbeen 12"), "speling:" per meetpunt;
        - losse waarde per maat ("1: 5,96" = dichtstbijzijnde maat);
        - open bereiken: "<21" en ">6" exclusief, "tot 21", "vanaf 48", "48+" inclusief;
        - "verschillende maten: grotere|kleinere" bij meerdere metingen die in verschillende maten vallen;
        - eigen keuze vóór de metingen ("keuze teen: Voor welke teen? = Grote teen (grote teen) / ..."),
          maten met label ("M [grote teen]: schoenmaat 36-40"), ook zonder meting (keuze bepaalt de maat);
          na een keuze worden alleen de metingen gevraagd die de overgebleven maten gebruiken;
        - "tweede maat: Lengte" voor een tweede productoptie (bv. Kort/Normaal), attribuut automatisch gezocht;
        - "attribuut: auto"; "<meetpunt>: uit product" zonder dat attribuut = koppeling weglaten;
        - vaste teksten voor de automatische keuzes compressieklasse, siliconenboord, teenstuk en pasvorm;
        - maatnamen "Small/Medium/Large" en "S/M/L" gelden als gelijk;
        - camerameting nekhoogte bij alle nekbraces waar de hoogte gemeten wordt (mobiel).
   v12: strakker pictogram bovenlichaam; lichaamslengte en gewicht met het hele lichaam (ook op het advies als
        alleen lengte/gewicht gemeten is); kant-vraag in de taal van het product ("Voor welke voet is de
        hallux valgus-orthese?", Linkervoet/Rechtervoet); "Artie" wordt "onze digitale assistent", en de chat krijgt
        een klaargezette vraag mee (product, keuzes, metingen en waarom er geen passende maat is) via Sleak
        slk-message-trigger; zonder die Sleak-functie opent de chat zoals voorheen.
   v13: geen regel "Je vraag staat al voor je klaar" meer onder de chatknop (Sleak verstuurt de vraag direct).
   v14: link "Bekijk de maattabel" op het advies: de maattabel van dit product met de geadviseerde maat gemarkeerd
        ("jouw maat") en de eigen meting in de kop; niet bij grafieken (lengte x gewicht) of tabellen met meer dan 14 maten.
   v15: uitkomst bewaren voor het homepage-blok "Jouw volgende stap" (localStorage `a4f-journey-v1`, onder `maat`,
        per product-id): productnaam, URL, wanneer bekeken (= dit product heeft een maatadvies) en het laatst
        getoonde advies (per keuze/maat: label, waarde, attribuut-id, optie-id — dezelfde id's als in het
        winkelmandje). Max. 20 producten, 30 dagen. Alleen met toestemming "Voorkeuren" (preferences) in
        Diffuse Cookie Notice; ingetrokken = direct verwijderd. window.A4F_JOURNEY = true/false gaat voor (testen).
        Verder ongewijzigd t.o.v. v14.
   v16: identiek aan v15, maar het bewaren gebeurt alleen met toestemming "Voorkeuren" (preferences) in Diffuse
        Cookie Notice; ingetrokken = direct verwijderd (v15 stond al op de server zonder deze controle).
   v17: link met #maatadvies (bv. "Check je maat" in het homepage-blok) opent bij het laden direct de
        "(Maattabel)"-popup met het maatadvies. Gaat dat niet (popup ontbreekt of opent niet binnen 4 s), dan
        scrollt de pagina naar het maatadvies in "Wat is mijn maat?". Daarna wordt #maatadvies uit de adresbalk
        gehaald, zodat terugknop/herladen de popup niet opnieuw opent. Verder identiek aan v16.
   v18: "Bekijk de maattabel" ook bij "Geen passende maat gevonden": de maattabel van het product, zonder
        gemarkeerde maat, met de eigen meting in de kop. In alle tabellen staat de waarde van de klant vet als die
        binnen een bereik valt, zodat te zien is welke meting wel en welke niet past. Verder identiek aan v17.
   v19: "valt klein: 1" / "valt groot: 0,5" in de tekst (op basis van retourdata): de meting telt bij het zoeken
        van de maat zoveel groter (kleiner) mee. De maattabel en de getoonde meting blijven die van de fabrikant
        en de klant; verandert het advies hierdoor, dan staat er een korte uitleg bij ("valt klein uit").
   v20: uitleg bij "valt klein/groot" noemt beide maten ("Je meting hoort in de maattabel bij maat 1, maar maat 2
        past beter. Bestel daarom maat 2."), zodat niemand denkt dat hij nog een maat groter moet nemen.
   v21: "op basis van ervaringen van andere klanten" weer in de uitleg bij "valt klein/groot".
   v22: de uitleg bij "valt klein/groot" staat niet meer direct op het advies, maar bovenaan de maattabel
        (zichtbaar zodra de klant "Bekijk de maattabel" opent).
   v23: - "controle: voorvoet": dat meetpunt wordt wel gevraagd, maar bepaalt de maat niet. De maat volgt uit
          de andere meting(en); daarna controleert de engine of de voorvoet binnen die maat past (+ speling).
        - "breder alternatief: 01-14-1798-00, 01-14-1797-00": past de controle niet (voorvoet te breed), dan
          toont het advies deze producten, elk met de juiste maat volgens hun eigen maattabel, prijs en voorraad
          (opgehaald via GraphQL op SKU; de maattabel via GraphQL of anders via de productpagina).
          Zonder passend alternatief: alleen de melding dat deze schoen waarschijnlijk te smal is.
        - Nieuwe pictogrammen voor voetlengte (bovenaanzicht, hiel tegen de muur) en voorvoet (meetlint om de bal).
        - Eerste stap bij 2+ metingen: "Je meet 2 punten: voetlengte en voorvoet." (class is-count) in plaats van
          "Vind je maat in 30 seconden"; streepjes i.p.v. balk bij weinig stappen.
        - Event akh-maat:advice_shown bevat nu ook de metingen en of de controle afkeurde (wide).
        - Bestand weer als nette UTF-8 (v22 bevatte verminkte tekens in o.a. cleanLine).
   v24: te brede voorvoet: geen maat van dit product meer adviseren. Uitleg ("Deze verbandschoen is te smal voor je voet ..."),
        de bredere schoenen en een kleine knop "Ik wil toch deze verbandschoen bestellen" (toont pas dan maat, prijs en winkelwagen).
        Witte achtergrond zonder pictogram in die situatie; levertijd op de kaartjes zoals op de productpagina van het alternatief.
   v25: melding bij te brede voorvoet alleen nog "Deze verbandschoen is te smal voor je voet." (zonder maat en metingen).
   v26: melding met uitleg: "Je voorvoet is 28,8 cm. Deze verbandschoen past tot 27 cm, dus hij is te smal voor je voet."
        en daarboven de bredere schoenen "Daarom raden we je deze extra brede schoenen aan, in jouw maat:".
   v27: maat-attribuut ook herkennen als het product niet alle maten uit de maattabel voert (bv. tabel 36-50,
        product 36-46). Voorheen werd het dan niet als maat herkend en vroeg het advies na het meten
        "Welke schoenmaat wil je?" met alle maten.
   Per maattabel staat in het CMS Block alleen een kleine config:
     (window.AKHMaatQ = window.AKHMaatQ || []).push({template: 'pols', mappings: [...]});
   ===================================================================== */
(function(){
  'use strict';
  if (window.AKHMaat && window.AKHMaat.version) return;   // al geladen (block staat vaker op de pagina)
  var ENGINE_VERSION = '27';
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function parseNum(s){
    s = String(s == null ? '' : s).trim().replace(/\s+/g, '').replace(/cm$/i, '').replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
    return parseFloat(s);
  }
  function lcFirst(s){ s = String(s || ''); return s.charAt(0).toLowerCase() + s.slice(1); }
  function ucFirst(s){ s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function fmt(n){ return String(Math.round(n * 10) / 10).replace('.', ','); }
  // Eenheid per meetpunt: standaard cm; schoenmaat heeft geen eenheid ("schoenmaat 42").
  function unitOf(m){ return m && m.unit != null ? m.unit : 'cm'; }
  function amount(m, v){ var u = unitOf(m); return fmt(v) + (u ? ' ' + u : ''); }
  function basisPart(m, v){ return m.phrase ? m.phrase.replace('{v}', fmt(v)) : amount(m, v) + ' ' + m.label; }
  // Bereik als tekst; een open bereik ("<21", "48+") staat in de tabel als ondergrens = min / bovengrens = max van het meetpunt.
  function rangeText(m, lo, hi){
    var u = unitOf(m), sfx = u ? ' ' + u : '';
    if (Math.abs(lo - hi) < 1e-9) return fmt(lo) + sfx;
    if (m && m.min != null && lo <= m.min) return 'tot ' + fmt(hi) + sfx;
    if (m && m.max != null && hi >= m.max) return 'vanaf ' + fmt(lo) + sfx;
    return fmt(lo) + '\u2013' + fmt(hi) + sfx;
  }
  function euro(n){ return '\u20ac ' + Number(n).toFixed(2).replace('.', ','); }
  // "Small" en "S" (enz.) gelden als dezelfde maatnaam: teksten van leveranciers schrijven ze verschillend.
  var SIZE_WORDS = {'small': 's', 'medium': 'm', 'large': 'l', 'x-large': 'xl', 'extra large': 'xl', 'xx-large': 'xxl'};
  // Lichaamsdeel voor de kant-vraag, per sjabloon; voetproducten in het enkel-sjabloon krijgen "voet".
  function sideTitle(cfg){
    var t = cfg.template || '', n = String(cfg.productName || '').trim(), ln = n.toLowerCase(), part;
    if (t === 'enkel') part = !n || /enkel(?!-?voet)|achilles|kuit/.test(ln) ? 'enkel' : 'voet';
    else if (t === 'pols') part = /vinger|duim|hand/.test(ln) ? 'hand' : 'pols';
    else part = {duim: 'hand', vinger: 'hand', elleboog: 'arm', knie: 'knie', been: 'been', teen: 'voet', schouder: 'schouder', mitella: 'arm', steunkous: 'been'}[t] || 'kant';
    if (part === 'kant') return {part: part, title: 'Voor welke kant is het?'};
    if (/^(\w+)brace$/.test(ln) && ln !== 'brace') n = 'brace';   // "Voor welke knie is de brace?" i.p.v. "... de kniebrace?"
    var welk = part === 'been' ? 'welk' : 'welke', het = /(kussen|goed|je|sel)$/.test(ln) ? 'het' : 'de';
    return {part: part, title: n ? 'Voor ' + welk + ' ' + part + ' is ' + het + ' ' + n + '?' : 'Voor ' + welk + ' ' + part + ' is het?'};
  }
  function norm(s){ s = String(s || '').trim().toLowerCase(); return SIZE_WORDS[s] || s; }

  var ICON_CART = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>';
  var ICON_CAM = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>';
  var ICON_ARROW = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" width="18" height="18" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"></path></svg>';
  function iconHand(mirror){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (mirror ? ' style="transform:scaleX(-1)"' : '') + '><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>';
  }

  function track(cfg, name, payload){
    if (cfg.analytics === false) return;
    var p = Object.assign({category: 'maatadvies ' + (cfg.productName || '')}, payload || {});
    try { window.dispatchEvent(new CustomEvent('akh-maat:' + name, {detail: p})); } catch(e){}
    try { if (typeof window.clarity === 'function') window.clarity('event', 'akh_maat_' + name); } catch(e){}
    try { if (window.dataLayer && window.dataLayer.push) window.dataLayer.push(Object.assign({event: 'akh_maat_' + name}, p)); } catch(e){}
  }

  /* ---------- v15: uitkomst bewaren voor het homepage-blok ---------- */
  var JOURNEY_KEY = 'a4f-journey-v1', JOURNEY_MAX_AGE = 30 * 24 * 60 * 60 * 1000, JOURNEY_MAX_MAAT = 20;
  function a4fConsent(){
    // Toestemming voor personalisatie = categorie "Voorkeuren" (preferences) in Diffuse Cookie Notice.
    // window.A4F_JOURNEY = true/false gaat altijd voor (bv. om te testen).
    if (window.A4F_JOURNEY === false) return false;
    if (window.A4F_JOURNEY === true) return true;
    try { if (window.CookieNotice && typeof window.CookieNotice.getConsent === 'function') return !!window.CookieNotice.getConsent().preferences; } catch(e){}
    var m = null;
    try { m = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]*)/); } catch(e){}   // v18: geen fout als cookies geblokkeerd zijn
    if (!m) return false;
    try { return !!JSON.parse(decodeURIComponent(m[1])).preferences; } catch(e){ return false; }
  }
  // Toestemming ingetrokken -> opgeslagen voortgang meteen weghalen.
  try { window.addEventListener('CookieNoticeOnConsentReady', function(){ if (!a4fConsent()) { try { window.localStorage.removeItem('a4f-journey-v1'); } catch(e){} } }); } catch(e){}
  function journeyMaat(update){
    if (!a4fConsent()) return;
    try {
      var form = document.getElementById('product_addtocart_form');
      var pidEl = form && form.querySelector('input[name="product"]');
      var pid = pidEl ? String(pidEl.value) : '';
      if (!pid) return;
      var j = null;
      try { j = JSON.parse(window.localStorage.getItem(JOURNEY_KEY) || 'null'); } catch(e){}
      if (!j || j.v !== 1) j = {v: 1};
      var maat = j.maat || {}, now = Date.now();
      var h1 = document.querySelector('h1');
      var e = maat[pid] || {};
      e.name = h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : (e.name || '');
      e.url = window.location.origin + window.location.pathname;
      e.seen = now;
      if (update) update(e);
      maat[pid] = e;
      var keys = Object.keys(maat).filter(function(k){ return maat[k] && now - (maat[k].seen || 0) < JOURNEY_MAX_AGE; })
        .sort(function(a, b){ return (maat[b].seen || 0) - (maat[a].seen || 0); }).slice(0, JOURNEY_MAX_MAAT);
      var kept = {};
      keys.forEach(function(k){ kept[k] = maat[k]; });
      j.maat = kept;
      window.localStorage.setItem(JOURNEY_KEY, JSON.stringify(j));
    } catch(e){}
  }

  /* ---------- productdata ---------- */
  function readProductConfig(){
    var form = document.getElementById('product_addtocart_form');
    var pidEl = form && form.querySelector('input[name="product"]');
    var pid = pidEl ? String(pidEl.value) : null;
    var scripts = document.querySelectorAll('script[type="application/json"]');
    for (var i = 0; i < scripts.length; i++) {
      var j = null;
      try { j = JSON.parse(scripts[i].textContent); } catch(e){ continue; }
      if (j && j.attributes && j.index && (!pid || String(j.productId) === pid)) return j;
    }
    return null;
  }

  function fitMeasures(m){
    var keys = [];
    (m.table || []).forEach(function(row){ Object.keys(row).forEach(function(k){ if (k !== 'value' && Array.isArray(row[k]) && keys.indexOf(k) === -1) keys.push(k); }); });
    return keys;
  }
  function mappingMeasures(m){ return m.type === 'fit' ? fitMeasures(m) : [m.measure]; }

  function Advisor(cfg, pc){
    var rowFilter = null;   // beperkt de maattabel door een eigen keuze (bv. hoogte van de band)
    function attrByCode(code){
      if (!pc) return null;
      for (var id in pc.attributes) if (pc.attributes[id].code === code) return pc.attributes[id];
      return null;
    }
    function isSalable(attrId, optId, productId){
      var s = pc.salable && pc.salable[attrId] && pc.salable[attrId][optId];
      if (s && s.indexOf(String(productId)) === -1) return false;
      return !(pc.stockAvailability && pc.stockAvailability[productId] === false);
    }
    function availableOptions(attr){
      return attr.options.filter(function(o){ return (o.products || []).some(function(p){ return isSalable(attr.id, o.id, p); }); });
    }
    // Keuze-opties: alleen waarden die het product leverbaar heeft (zonder productdata: alle).
    function choiceOptions(ch){
      if (ch.filter) return ch.options.slice();   // eigen keuze uit de tekst ("keuze: ..."), geen productattribuut
      var attr = attrByCode(ch.attribute);
      if (!attr) return pc ? [] : ch.options.slice();
      var av = availableOptions(attr);
      var mapped = ch.options.map(function(o){
        var hit = av.filter(function(x){ return norm(x.label) === norm(o.value); })[0];
        return hit ? Object.assign({optionId: hit.id}, o) : null;
      }).filter(Boolean);
      // Geen van de verwachte waarden (bv. alleen "Universeel" i.p.v. Links/Rechts): dan de echte
      // waarden van het product gebruiken, anders ontbreekt dit attribuut straks in de winkelwagen.
      if (!mapped.length && av.length) mapped = av.map(function(x){ return {value: x.label, label: x.label, short: x.label, optionId: x.id}; });
      return mapped;
    }
    function candidates(m){
      var attr = attrByCode(m.attribute);
      // Alle maten die het product heeft, ook als ze nu uitverkocht zijn (available: false).
      // Zo adviseren we nooit een verkeerde maat omdat de juiste toevallig op is.
      if (m.type === 'range' || m.type === 'fit') {
        var tbl = rowFilter ? m.table.filter(rowFilter) : m.table;
        if (!attr) return tbl.slice();
        var av = availableOptions(attr);
        return tbl.map(function(r){
          var o = attr.options.filter(function(x){ return norm(x.label) === norm(r.value); })[0];
          return o ? Object.assign({optionId: o.id, available: av.indexOf(o) !== -1}, r, {value: o.label}) : null;   // maatnaam zoals in de webshop
        }).filter(Boolean);
      }
      if (!attr) return [];
      var avn = availableOptions(attr);
      return attr.options
        .map(function(o){ return {value: o.label, num: parseNum(String(o.label).replace(/[^\d.,]/g, '')), optionId: o.id, available: avn.indexOf(o) !== -1}; })
        .filter(function(c){ return !isNaN(c.num); })
        .sort(function(a, b){ return a.num - b.num; });
    }
    // status: ok | note (kleine afwijking) | nofit | none (geen data)
    function adviseOne(m, val){
      var r = adviseRaw(m, val);
      if (r.pick && r.pick.available === false && (r.status === 'ok' || r.status === 'note')) r.unavailable = true;
      return r;
    }
    function adviseRaw(m, val){
      var c = candidates(m), r = {mapping: m, measured: val, pick: null, status: 'ok'};
      if (!c.length) { r.status = 'none'; return r; }
      if (m.type === 'fit') return adviseFit(m, val, c, r);
      if (m.type === 'range') {
        var hits = c.filter(function(x){ return val >= x.min && val <= x.max; }).sort(function(a, b){ return a.min - b.min; });
        if (hits.length) { r.pick = m.overlap === 'smaller' ? hits[0] : hits[hits.length - 1]; return r; }
        var lo = c.reduce(function(a, b){ return a.min < b.min ? a : b; });
        var hi = c.reduce(function(a, b){ return a.max > b.max ? a : b; });
        if (val < lo.min || val > hi.max) {
          var edge = val < lo.min ? lo : hi, off = val < lo.min ? lo.min - val : val - hi.max;
          if (m.tolerance != null && off <= m.tolerance + 1e-9) { r.pick = edge; r.status = 'note'; return r; }
          r.status = 'nofit'; r.dir = val < lo.min ? 'small' : 'large'; return r;
        }
        // Meting valt in een gaatje tussen twee maten (bv. 34,5 bij S 32-34 / M 35-37).
        // gaps: 'larger' of 'smaller' per product (op basis van retourdata); standaard de dichtstbijzijnde.
        if (m.gaps === 'larger' || m.gaps === 'smaller') {
          var below = c.filter(function(x){ return x.max < val; }).sort(function(a, b){ return b.max - a.max; })[0];
          var above = c.filter(function(x){ return x.min > val; }).sort(function(a, b){ return a.min - b.min; })[0];
          r.pick = m.gaps === 'larger' ? (above || below) : (below || above);
          return r;
        }
        r.pick = c.reduce(function(a, b){
          var da = Math.min(Math.abs(val - a.min), Math.abs(val - a.max));
          var db = Math.min(Math.abs(val - b.min), Math.abs(val - b.max));
          return da <= db ? a : b;
        });
        return r;
      }
      var best = null;
      c.forEach(function(x){
        if (!best) { best = x; return; }
        var d1 = Math.abs(val - x.num), d0 = Math.abs(val - best.num);
        if (d1 < d0 || (d1 === d0 && m.tie === 'higher' && x.num > best.num)) best = x;
      });
      var dev = Math.abs(val - best.num);
      if (m.maxDeviation != null && dev > m.maxDeviation) { r.status = 'nofit'; r.dir = val < best.num ? 'small' : 'large'; return r; }
      r.pick = best;
      if (m.tolerance != null && dev > m.tolerance) r.status = 'note';
      return r;
    }
    // Meerdere meetpunten bepalen samen één maat (bv. steunkous: enkel + kuit + dij).
    // val = {meetpunt: cm}. Een maat past als alle metingen binnen de bereiken van die rij vallen.
    function adviseFit(m, val, c, r){
      var keys = fitMeasures(m);
      function tol(k){ return m.tolerance == null ? 0 : typeof m.tolerance === 'number' ? m.tolerance : (m.tolerance[k] || 0); }
      function devs(row){
        var d = {};
        keys.forEach(function(k){
          var rg = row[k], v = val[k];
          if (!rg || v == null) { d[k] = 0; return; }
          d[k] = v < rg[0] ? rg[0] - v : v > rg[1] ? v - rg[1] : 0;
        });
        return d;
      }
      var scored = c.map(function(row, i){
        var d = devs(row), within = true, score = 0;
        keys.forEach(function(k){
          if (d[k] > 1e-9) { score += d[k] / Math.max(tol(k), 0.5); if (d[k] > tol(k) + 1e-9) within = false; }
        });
        return {row: row, i: i, d: d, score: score, within: within};
      });
      var exact = scored.filter(function(x){ return x.score === 0; });
      if (exact.length) { r.pick = (m.overlap === 'smaller' ? exact[0] : exact[exact.length - 1]).row; return r; }
      // "Valt je onderbeen in een andere maat dan je bovenbeen? Kies dan de grotere maat": per meetpunt de passende
      // maten zoeken en daarvan de grootste (of kleinste) nemen. Alleen als elk gemeten meetpunt in de tabel valt.
      if (m.mixed === 'larger' || m.mixed === 'smaller') {
        var per = {}, all = true;
        keys.forEach(function(k){
          if (val[k] == null) return;
          var idx = [];
          c.forEach(function(row, i){ if (row[k] && val[k] >= row[k][0] - 1e-9 && val[k] <= row[k][1] + 1e-9) idx.push(i); });
          if (!idx.length) { all = false; return; }
          per[k] = m.overlap === 'smaller' ? Math.min.apply(null, idx) : Math.max.apply(null, idx);   // overlap binnen één meting volgt 'tussen 2 maten'
        });
        if (all && Object.keys(per).length) {
          var vals = Object.keys(per).map(function(k){ return per[k]; });
          var pi = m.mixed === 'larger' ? Math.max.apply(null, vals) : Math.min.apply(null, vals);
          r.pick = c[pi]; r.status = 'note';
          r.split = Object.keys(per).map(function(k){ return {measure: k, value: c[per[k]].value}; });
          return r;
        }
      }
      var near = scored.filter(function(x){ return x.within; }).sort(function(a, b){ return a.score - b.score; });
      if (near.length) {
        r.pick = near[0].row; r.status = 'note';
        r.off = keys.filter(function(k){ return near[0].d[k] > 1e-9; });
        return r;
      }
      r.status = 'nofit';
      // Te klein/te groot voor alle maten op één meetpunt, of passen de metingen niet samen in één maat?
      var edge = null;
      keys.forEach(function(k){
        if (edge || val[k] == null) return;
        var rows = c.filter(function(x){ return x[k]; });
        if (!rows.length) return;
        var lo = Math.min.apply(null, rows.map(function(x){ return x[k][0]; }));
        var hi = Math.max.apply(null, rows.map(function(x){ return x[k][1]; }));
        if (val[k] < lo - tol(k) - 1e-9) edge = {measure: k, dir: 'small'};
        else if (val[k] > hi + tol(k) + 1e-9) edge = {measure: k, dir: 'large'};
      });
      if (edge) { r.dir = edge.dir; r.failMeasure = edge.measure; r.measured = val[edge.measure]; }
      else r.mixed = true;
      return r;
    }
    function variantFor(sel){
      if (!pc) return null;
      var ids = Object.keys(pc.index).filter(function(pid){
        for (var a in sel) if (String(pc.index[pid][a]) !== String(sel[a])) return false;
        return true;
      });
      if (!ids.length) return null;
      var pid = ids[0], price = pc.optionPrices && pc.optionPrices[pid];
      return {
        id: pid,
        available: !(pc.stockAvailability && pc.stockAvailability[pid] === false),
        stock: (pc.stockInfo && pc.stockInfo[pid]) || '',
        slow: pc.stockAvailabilityOrder ? pc.stockAvailabilityOrder[pid] > 0 : false,
        price: price ? price.finalPrice.amount : null,
        oldPrice: price && price.oldPrice && price.oldPrice.amount > price.finalPrice.amount + 0.001 ? price.oldPrice.amount : null
      };
    }
    function selectionFrom(results){
      var sel = {};
      results.forEach(function(r){
        var attr = attrByCode(r.mapping.attribute);
        if (attr && r.pick && r.pick.optionId) sel[attr.id] = r.pick.optionId;
      });
      return sel;
    }
    // Producten (simple ids) die passen bij een (gedeeltelijke) selectie {attrId: optionId}, en leverbaar zijn.
    function matches(pid, sel){
      for (var a in sel) if (String(pc.index[pid][a]) !== String(sel[a])) return false;
      return !(pc.stockAvailability && pc.stockAvailability[pid] === false);
    }
    // Keuze-opties, alleen de waarden die samen met de rest van de selectie te bestellen zijn.
    function choiceOptionsFor(ch, sel){
      var attr = attrByCode(ch.attribute), opts = choiceOptions(ch);
      if (!attr || !pc) return opts;
      var rest = {};
      for (var a in sel) if (String(a) !== String(attr.id)) rest[a] = sel[a];
      return opts.filter(function(o){
        var ao = attr.options.filter(function(x){ return String(x.id) === String(o.optionId); })[0];
        return ao && (ao.products || []).some(function(p){ return isSalable(attr.id, ao.id, p) && pc.index[p] && matches(p, rest); });
      });
    }
    // Overige configureerbare attributen van het product (bv. kleur, open/gesloten teen) die niet in de config staan.
    function otherAttributes(used){
      if (!pc) return [];
      return Object.keys(pc.attributes).map(function(id){ return pc.attributes[id]; })
        .filter(function(a){ return used.indexOf(a.code) === -1; });
    }
    return {setRowFilter: function(f){ rowFilter = f; }, candidates: candidates, choiceOptions: choiceOptions, choiceOptionsFor: choiceOptionsFor, otherAttributes: otherAttributes,
            attrByCode: attrByCode, adviseOne: adviseOne, variantFor: variantFor, selectionFrom: selectionFrom};
  }

  /* ---------- illustraties ---------- */
  var A = '#2399c7';
  var SKIN = '#cfe4ee', SHADE = '#bcd8e5', LINE = '#a9c9d8', INK = '#12263A';
  function svg(inner){ return '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + '</svg>'; }
  var DONE = '<circle cx="190" cy="36" r="18" fill="#55b934"/><path d="M182 36l5.5 5.5 11-11" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  // Meetlint als band om een ronde vorm: achterkant (vaag), voorkant (lint met streepjes) en een los hangend uiteinde.
  function tapeBand(x0, x1, y, sag, w, tail){
    var cx = (x0 + x1) / 2, ticks = '', n = Math.round((x1 - x0) / 4.5), i;
    for (i = 1; i < n; i++) {
      var t = i / n, x = x0 + (x1 - x0) * t, yt = y + 2 * sag * t * (1 - t) * 2;
      ticks += '<line x1="' + x.toFixed(1) + '" y1="' + (yt + 0.8).toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + (yt + (i % 2 ? 2.8 : 4.4)).toFixed(1) + '"/>';
    }
    var tl = '', k;
    for (k = 4; k < tail.len - 4; k += 3.5) tl += '<line x1="' + k + '" y1="' + (-w / 2 + 0.8) + '" x2="' + k + '" y2="' + (-w / 2 + (Math.round(k / 3.5) % 2 ? 2.8 : 4.2)) + '"/>';
    return '<path d="M' + x0 + ' ' + y + 'Q' + cx + ' ' + (y - sag * 1.6) + ' ' + x1 + ' ' + y + '" stroke="' + A + '" stroke-width="' + (w - 2) + '" fill="none" opacity=".28"/>' +
      '<g transform="translate(' + tail.x + ' ' + tail.y + ') rotate(' + tail.a + ')"><rect x="0" y="' + (-w / 2) + '" width="' + tail.len + '" height="' + w + '" rx="1.2" fill="' + A + '"/>' +
        '<g stroke="#fff" stroke-width=".9" opacity=".9">' + tl + '</g>' +
        '<rect x="' + (tail.len - 3) + '" y="' + (-w / 2 - 1) + '" width="5" height="' + (w + 2) + '" rx="1.2" fill="#1a7ba3"/></g>' +
      '<path d="M' + x0 + ' ' + y + 'Q' + cx + ' ' + (y + sag * 2) + ' ' + x1 + ' ' + y + 'L' + x1 + ' ' + (y + w) + 'Q' + cx + ' ' + (y + w + sag * 2) + ' ' + x0 + ' ' + (y + w) + 'Z" fill="' + A + '"/>' +
      '<g stroke="#fff" stroke-width=".9" opacity=".9">' + ticks + '</g>';
  }
  var HAND =
    // hand, pols en onderarm als één silhouet: smalle pols, botje aan de pinkzijde
    '<path d="M92 132c-6-10-8-26-6-44l2-26c1-6 9-6 10 0l2 30 2-46c1-7 10-7 11 0l1 44 2-50c1-7 11-7 12 0l1 50 3-42c1-7 10-7 11 0l-1 46c8-12 14-18 20-16 6 2 4 9 0 16-8 14-14 28-20 38' +
      'C140 137 137 141 135.5 146C135 150 135.5 153 136.5 157C139 170 143 186 146 200H90C92 186 95 172 98 164C95.5 161.5 95.5 156 98.5 154.5C100 152 100.5 149 100.5 146C100 141 95 137 92 132Z" fill="' + SKIN + '"/>' +
    '<path d="M98 164C110 168 126 166 137 158C139 170 143 186 146 200H90C92 186 95 172 98 164Z" fill="' + SHADE + '" opacity=".6"/>' +
    '<path d="M101 113c10 3 22 2 34-4M100 125c8 3 18 4 28 1M103.5 139c9 2 19 2 28-1" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/>' +
    '<path d="M141 104c-4 6-6 14-6 22" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/>' +
    '<path d="M99.5 156.5c2 1.5 2 4.5 0 6" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  var BODY =
    '<path d="M24 200c4-28 26-42 56-48l20-4h40l20 4c30 6 52 20 56 48Z" fill="' + SKIN + '"/>' +
    '<path d="M99 92c1 18-1 38-6 56 8 6 18 9 27 9s19-3 27-9c-5-18-7-38-6-56Z" fill="' + SHADE + '"/>' +
    '<path d="M98 108c6 9 14 13 22 13s16-4 22-13" fill="#a9c9d8" opacity=".55"/>' +
    '<ellipse cx="82.5" cy="68" rx="6" ry="10" fill="' + SKIN + '"/><ellipse cx="157.5" cy="68" rx="6" ry="10" fill="' + SKIN + '"/>' +
    '<ellipse cx="120" cy="62" rx="38" ry="46" fill="' + SKIN + '"/>' +
    '<path d="M83 52c4-24 21-38 38-38 19 0 34 13 36 34-11-10-28-14-44-12-12 2-21 7-30 16Z" fill="#b4d1df"/>' +
    '<path d="M62 166c16-7 32-8 46-4M178 166c-16-7-32-8-46-4" stroke="' + LINE + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  var LEGS =
    '<path d="M80 12C76 22 73 32 74 44C75 64 80 88 87 106C85 114 83 122 85 134C87 148 94 160 97 170C97 176 95 180 92 184C90 188 91 192 95 192H112C114 192 114 188 112 184C110 180 109 175 109 170C110 160 114 146 114 134C114 124 112 116 112 108C113 96 116 80 118 70C118.5 67 119 65 120 64' +
      'C121 65 121.5 67 122 70C124 80 127 96 128 108C128 116 126 124 126 134C126 146 130 160 131 170C131 175 130 180 128 184C126 188 126 192 128 192H145C149 192 150 188 148 184C145 180 143 176 143 170C146 160 153 148 155 134C157 122 155 114 153 106C160 88 165 64 166 44C167 32 164 22 160 12Z" fill="' + SKIN + '"/>' +
    '<path d="M80 12H160" stroke="' + SHADE + '" stroke-width="3"/>' +
    '<path d="M94 102c3 5 9 7 14 5M132 107c5 2 11 0 14-5" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M96 168c2 2 5 2 7 0M137 168c2 2 5 2 7 0" stroke="' + LINE + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>';
  // per meetpunt: band om het rechterbeen (of de heupen) of een liniaal vanaf de vloer
  var LEG_POINTS = {
    cB: {band: [130.5, 143.5, 164, 1.6, 6]},
    cC: {band: [125.5, 155.5, 128, 2.6, 7]},
    cD: {band: [127.5, 153.5, 112, 2.4, 7]},
    cG: {band: [122, 162, 70, 3, 8]},
    cH: {band: [73.5, 166.5, 34, 4, 8]},
    lD: {len: 108},
    lG: {len: 66}
  };
  function legPicture(key){
    var p = LEG_POINTS[key], out = LEGS;
    if (!p) return out;
    if (p.band) {
      var b = p.band;
      out += tapeBand(b[0], b[1], b[2], b[3], b[4], {x: b[1] - 1, y: b[2] + b[4] / 2, a: 58, len: 26}) +
             '<circle class="akh-maat__pulse" cx="' + ((b[0] + b[1]) / 2) + '" cy="' + (b[2] + b[4] + b[3] * 1.5 + 0.5) + '" r="3.3" fill="' + INK + '"/>';
    } else {
      var t = '', y, top = p.len;
      for (y = 188; y > top + 2; y -= 4) t += '<line x1="176" y1="' + y + '" x2="' + ((192 - y) % 8 ? 180 : 182.5) + '" y2="' + y + '"/>';
      out += '<path d="M' + (key === 'lD' ? 150 : 124) + ' ' + top + 'H174M150 194H174" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/>' +
             '<rect x="174" y="' + (top - 2) + '" width="11" height="' + (196 - top) + '" rx="2" fill="' + A + '"/>' +
             '<g stroke="#fff" stroke-width=".9" opacity=".9">' + t + '</g>' +
             '<circle class="akh-maat__pulse" cx="' + (key === 'lD' ? 150 : 124) + '" cy="' + top + '" r="3.6" fill="' + INK + '"/>';
    }
    return out;
  }
  function illustration(type, done){
    var out;
    if (/^leg/.test(type)) {
      out = legPicture(type.split('-')[1] || '');
    } else if (/^wrist/.test(type)) {
      out = HAND;
      if (type === 'wrist-circumference') {
        out += tapeBand(99, 137.5, 144, 2.6, 7, {x: 136.5, y: 148, a: 50, len: 34}) +
               '<circle class="akh-maat__pulse" cx="118" cy="154.5" r="3.5" fill="' + INK + '"/>';
      } else if (type === 'wrist-hand') {
        // om de handpalm op de grote knokkels (waar de vingers beginnen), niet om de vingers; de duim erbuiten
        out += '<path d="M90 91.5c2.5-1 5.5-1 8 0M101.5 88c3-1.2 7-1.2 10 0M116 87c3-1.2 7-1.2 10 0M130 88.5c3-1 6-1 9 0" stroke="' + INK + '" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".45"/>' +
               tapeBand(87, 142, 96, 2.6, 7, {x: 141, y: 100, a: 40, len: 30}) +
               '<circle class="akh-maat__pulse" cx="114.5" cy="107" r="3.5" fill="' + INK + '"/>';
      } else if (type === 'wrist-handlength') {
        // lengte van de hand: van de pols tot de top van de middelvinger
        out += '<path d="M80 40H114M80 147H100" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".55"/><path d="M78 44V143" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<path d="M74 49L78 43L82 49M74 138L78 144L82 138" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle class="akh-maat__pulse" cx="121" cy="41" r="3.2" fill="' + INK + '"/>';
      } else if (type === 'wrist-handwidth') {
        // breedte van de handpalm, net onder de vingers
        out += '<path d="M87 88V108M142 88V108" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".55"/><path d="M90 98H139" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<path d="M95 94L89 98L95 102M134 94L140 98L134 102" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle class="akh-maat__pulse" cx="114.5" cy="98" r="3.2" fill="' + INK + '"/>';
      } else if (type === 'wrist-finger-dip' || type === 'wrist-finger-pip' || type === 'wrist-finger-mid') {
        // band om de middelvinger: DIP (bij de top), PIP (midden) of op de plek van de spalk
        var fy = type === 'wrist-finger-dip' ? 51 : type === 'wrist-finger-pip' ? 67 : 60;
        out += '<rect x="112.5" y="' + (fy - 3.5) + '" width="17" height="7" rx="1.5" fill="' + A + '"/>' +
               '<g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="116" y1="' + (fy - 2.7) + '" x2="116" y2="' + (fy - 0.7) + '"/><line x1="119.5" y1="' + (fy - 2.7) + '" x2="119.5" y2="' + (fy + 0.7) + '"/><line x1="123" y1="' + (fy - 2.7) + '" x2="123" y2="' + (fy - 0.7) + '"/><line x1="126.5" y1="' + (fy - 2.7) + '" x2="126.5" y2="' + (fy + 0.7) + '"/></g>' +
               '<circle class="akh-maat__pulse" cx="137" cy="' + fy + '" r="3" fill="' + INK + '"/>';
      } else if (type === 'wrist-finger-length') {
        out += '<path d="M121 44V87" stroke="' + INK + '" stroke-width="1.6"/><path d="M117 49L121 43L125 49M117 82L121 88L125 82" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
               '<circle class="akh-maat__pulse" cx="121" cy="65.5" r="3" fill="' + INK + '"/>';
      } else if (type === 'wrist-thumb') {
        // band om het midden van de duim
        out += '<g transform="translate(146 104) rotate(-55)"><rect x="-4.5" y="-10" width="9" height="20" rx="1.5" fill="' + A + '"/>' +
               '<g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="-3.2" y1="-6" x2="-1.2" y2="-6"/><line x1="-3.2" y1="-2" x2="0.4" y2="-2"/><line x1="-3.2" y1="2" x2="-1.2" y2="2"/><line x1="-3.2" y1="6" x2="0.4" y2="6"/></g></g>' +
               '<circle class="akh-maat__pulse" cx="140.5" cy="113" r="3.2" fill="' + INK + '"/>';
      }
    } else {
      out = BODY;
      if (type === 'neck-circumference') {
        out += '<path d="M117 129q3-3 6 0" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
               tapeBand(95, 145, 130, 3, 8, {x: 144, y: 134, a: 62, len: 40}) +
               '<circle class="akh-maat__pulse" cx="120" cy="141" r="3.8" fill="' + INK + '"/>';
      } else if (type === 'neck-height') {
        var t = '', y;
        for (y = 104; y < 156; y += 4) t += '<line x1="166" y1="' + y + '" x2="' + ((y - 100) % 8 ? 170 : 172.5) + '" y2="' + y + '"/>';
        out += '<path d="M142 100H164M150 158H164" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="3 3" opacity=".55"/>' +
               '<rect x="164" y="98" width="11" height="62" rx="2" fill="' + A + '"/>' +
               '<g stroke="#fff" stroke-width=".9" opacity=".9">' + t + '</g>' +
               '<circle class="akh-maat__pulse" cx="142" cy="100" r="3.8" fill="' + INK + '"/>' +
               '<circle class="akh-maat__pulse" cx="150" cy="158" r="3.8" fill="' + INK + '"/>';
      }
    }
    return svg(out + (done ? DONE : ''));
  }

  /* ---------- één block-instantie ---------- */
  function mount(root, cfg){
    if (root.__akhMaat) return;
    root.__akhMaat = true;
    if (!root.querySelector('[data-akh-maat-main]')) {
      root.innerHTML = '<div class="akh-maat__inner"><div class="akh-maat__fig" data-akh-maat-fig></div><div class="akh-maat__main" data-akh-maat-main></div></div>';
    }
    var pc = readProductConfig();
    journeyMaat(null);   // v15: dit product heeft een maatadvies
    // Staat het maat-attribuut niet in het product (bv. sizes_numeric i.p.v. sizes_alphabetic)?
    // Dan het configureerbare attribuut nemen waarvan de waarden overeenkomen met de maattabel.
    if (pc) cfg.mappings.forEach(function(m){
      if (!m.table || !m.table.length) return;
      var codes = Object.keys(pc.attributes).map(function(id){ return pc.attributes[id]; });
      if (codes.some(function(a){ return a.code === m.attribute; })) return;
      var best = null, bestN = 0;
      codes.forEach(function(a){
        var n = m.table.filter(function(r){ return a.options.some(function(o){ return norm(o.label) === norm(r.value); }); }).length;
        if (n > bestN) { best = a; bestN = n; }
      });
      // v27: ook als het product niet alle maten uit de maattabel heeft (bv. tabel t/m 50, product t/m 46):
      // het attribuut met de meeste overeenkomende maten, mits minstens 2 en de helft van de tabel.
      if (best && (bestN === m.table.length || (bestN >= 2 && bestN * 2 >= m.table.length))) m.attribute = best.code;
    });
    // "<meetpunt>: uit product" terwijl dit product dat attribuut niet heeft (bv. geen hoogte-optie): koppeling weglaten,
    // dan wordt die meting ook niet gevraagd.
    if (pc) cfg.mappings = cfg.mappings.filter(function(m){
      if (m.type !== 'nearest') return true;
      return Object.keys(pc.attributes).some(function(id){ return pc.attributes[id].code === m.attribute; });
    });
    var adv = Advisor(cfg, pc);
    var figEl = root.querySelector('[data-akh-maat-fig]');
    var mainEl = root.querySelector('[data-akh-maat-main]');
    var choices = Object.assign({}, cfg.choices || {});
    // Kant-vraag in de taal van het product: "Voor welke voet is de hallux valgus-orthese?" (niet "welke enkel ... brace").
    if (choices.kant && choices.kant.attribute === 'side' && !choices.kant.fixedTitle) {
      var st = sideTitle(cfg);
      choices.kant = Object.assign({}, choices.kant, {title: st.title, options: (choices.kant.options || []).map(function(o){
        return st.part === 'kant' ? o : Object.assign({}, o, {label: o.value === 'Links' ? 'Linker' + st.part : o.value === 'Rechts' ? 'Rechter' + st.part : o.label});
      })});
    }
    var allSteps = cfg.order.slice();
    // Eigen keuzes uit de tekst ("keuze: Welke hoogte? = 18 cm (1, 2) / 25 cm (3, 4)") na de kant-keuze, vóór de metingen.
    var fIds = Object.keys(choices).filter(function(id){ return choices[id].filter; });
    if (fIds.length) {
      var at = 0; while (at < allSteps.length && choices[allSteps[at]]) at++;
      allSteps.splice.apply(allSteps, [at, 0].concat(fIds.filter(function(id){ return allSteps.indexOf(id) === -1; })));
      adv.setRowFilter(function(row){
        return fIds.every(function(id){
          var o = state.choices[id];
          return !o || !o.sizes || o.sizes.some(function(v){ return norm(v) === norm(row.value) || (row.tag && norm(v) === norm(row.tag)); });
        });
      });
    }
    var state = {idx: 0, values: {}, choices: {}, scanned: {}};
    var started = false;

    // Configureerbare attributen die niet in de config staan (bv. kleur of open/gesloten teen):
    // automatisch een keuzestap aan het eind, met alleen de waarden die in de geadviseerde maat leverbaar zijn.
    if (cfg.autoChoices !== false) {
      var used = cfg.mappings.map(function(m){ return m.attribute; })
        .concat(Object.keys(choices).map(function(id){ return choices[id].attribute; }));
      adv.otherAttributes(used).forEach(function(a){
        var id = 'auto_' + a.code, ov = (cfg.autoChoices || {})[a.code] || AUTO_TEXT[a.code] || {};
        choices[id] = {
          auto: true, attribute: a.code,
          title: ov.title || 'Welke ' + lcFirst(a.label) + ' wil je?',
          text: ov.text || '',
          resultLabel: ov.resultLabel || a.label,
          options: a.options.map(function(o){ return {value: o.label, label: (ov.labels || {})[o.label] || o.label, short: o.label}; })
        };
        allSteps.push(id);
      });
    }

    function isChoice(id){ return !!choices[id]; }
    function isCheck(id){ return (cfg.checks || []).some(function(c){ return c.measure === id; }); }
    // Pictogram: eigen SVG of afbeelding uit de config (sjabloon in het CMS-blokje), anders een ingebouwd pictogram.
    function picture(def, builtin, done){
      if (def && def.svg) return done ? String(def.svg).replace(/<\/svg>\s*$/, DONE + '</svg>') : def.svg;
      if (def && def.img) return '<img src="' + esc(def.img) + '" alt="" loading="lazy" style="max-width:190px;width:100%">';
      return illustration(builtin || '', done);
    }
    // Basisbeeld voor keuzestappen en het advies: cfg.svg, anders het pictogram van de eerste meting.
    function basePicture(done, builtin){
      // Alleen lichaamslengte/gewicht gemeten (rollator, kruk, grafiekkousen): het hele lichaam, niet het bovenlichaam.
      var ms = []; cfg.mappings.forEach(function(m){ mappingMeasures(m).forEach(function(x){ if (x && ms.indexOf(x) === -1) ms.push(x); }); });
      if (ms.length && TEMPLATES.romp.bodyPlain && ms.every(function(x){ return x === 'lichaamslengte' || x === 'gewicht'; })) return picture({svg: TEMPLATES.romp.bodyPlain}, null, done);
      var first = cfg.measures[allSteps.filter(function(x){ return !isChoice(x); })[0]] || {};
      // v23: meetpunt met eigen basisbeeld (voetlengte: de voet) gaat voor het sjabloonbeeld (enkel).
      var fa = cfg.measures[activeOrder().filter(function(x){ return !isChoice(x); })[0]] || {};
      if (fa.basePicture && fa.svg) return picture(fa, null, done);
      if (cfg.svg) return picture({svg: cfg.svg}, null, done);
      if (first.svg || first.img) return picture(first, null, done);
      return illustration(builtin || '', done);
    }
    function mappingsFor(id){ return cfg.mappings.filter(function(m){ return mappingMeasures(m).indexOf(id) !== -1 && rowsUse(m, id); }); }
    // Na een eigen keuze ("keuze kous: ... [kniekous]") alleen de metingen vragen die de overgebleven maten nog gebruiken.
    function rowsUse(m, id){
      if (m.type !== 'fit') return true;
      return adv.candidates(m).some(function(r){ return Array.isArray(r[id]); }) || !adv.candidates(m).length;
    }
    // Advies voor één koppeling, zodra alle gevraagde metingen ervoor zijn ingevuld (anders null).
    function adviceFor(m){
      var keys = mappingMeasures(m).filter(function(k){ return allSteps.indexOf(k) !== -1 && rowsUse(m, k); });
      if (!keys.length || keys.some(function(k){ return state.values[k] == null; })) return null;
      // v19: "valt klein/groot" schuift de meting bij het zoeken (alleen maattabellen, niet bij waarden uit het product).
      var sh = (m.type === 'range' || m.type === 'fit') && m.measure !== null ? (cfg.shift || 0) : 0, r, r0;
      if (m.type !== 'fit') {
        r = adv.adviseOne(m, state.values[m.measure] + sh);
        if (sh) { r0 = adv.adviseOne(m, state.values[m.measure]); r.measured = state.values[m.measure]; }
      } else {
        var v = {}, v0 = {};
        keys.forEach(function(k){ v[k] = state.values[k] + sh; v0[k] = state.values[k]; });
        r = adv.adviseOne(m, v);
        if (sh) { r0 = adv.adviseOne(m, v0); if (r.failMeasure) r.measured = state.values[r.failMeasure]; }
      }
      if (sh) {
        // Past de echte meting wel en de verschoven niet (rand van de tabel), dan geldt de echte meting.
        if (r.status === 'nofit' && r0.pick && r0.status !== 'nofit') return r0;
        if (r.status === 'note' && !r.split && r0.status === 'ok') r.status = 'ok';   // geen "net buiten"-melding door de verschuiving zelf
        if (r.pick && (!r0.pick || norm(r0.pick.value) !== norm(r.pick.value))) { r.shifted = true; r.tablePick = r0.pick ? r0.pick.value : null; }
      }
      return r;
    }
    // Wat er tot nu toe vastligt (keuzes + geadviseerde maten), als {attribuut-id: optie-id}.
    function currentSel(){
      var sel = {};
      Object.keys(state.choices).forEach(function(id){
        var a = adv.attrByCode(choices[id].attribute), o = state.choices[id];
        if (a && o && o.optionId) sel[a.id] = o.optionId;
      });
      cfg.mappings.forEach(function(m){
        var r = adviceFor(m), a = adv.attrByCode(m.attribute);
        if (r && r.pick && r.pick.optionId && r.pick.available !== false && a) sel[a.id] = r.pick.optionId;
      });
      return sel;
    }
    // Eigen keuzes (bv. links/rechts) nooit stilletjes omzetten; alleen automatische keuzes (kleur e.d.)
    // volgen wat er in de geadviseerde maat leverbaar is.
    function optionsOf(id){ return choices[id].auto ? adv.choiceOptionsFor(choices[id], currentSel()) : adv.choiceOptions(choices[id]); }
    // 0/1/2+-logica: een stap is alleen nodig als er 2+ leverbare waarden zijn.
    // Bij precies 1 leverbare keuze wordt die automatisch ingevuld.
    function activeOrder(){
      // Past er al geen maat meer, dan heeft het geen zin nog naar kleur e.d. te vragen.
      var failing = cfg.mappings.some(function(m){ var r = adviceFor(m); return r && r.status === 'nofit'; });
      return allSteps.filter(function(id){
        if (isChoice(id) && choices[id].auto && failing) return false;
        if (isChoice(id)) {
          var opts = optionsOf(id), cur = state.choices[id];
          // Niet meer leverbaar, of eerder automatisch ingevuld terwijl er nu meer keus is: opnieuw vragen.
          if (cur && (!opts.some(function(o){ return o.value === cur.value; }) || (cur.autoPicked && opts.length >= 2))) delete state.choices[id];
          if (opts.length === 1) state.choices[id] = Object.assign({autoPicked: true}, opts[0]);
          return opts.length >= 2;
        }
        // v23: controle-meetpunt ("controle: voorvoet") wordt ook gevraagd.
        if (isCheck(id)) return true;
        // Meten als er 2+ maten zijn, of bij een maattabel ook bij 1 maat (one size: past hij?).
        return mappingsFor(id).some(function(m){
          var n = pc ? adv.candidates(m).length : 2;
          return n >= 2 || (n === 1 && (m.type === 'range' || m.type === 'fit'));
        });
      });
    }
    function nextIdx(){ return state.idx + 1; }
    function scanOpts(){
      var o = {};
      Object.keys(state.choices).forEach(function(id){ if (choices[id].scanKey) o[choices[id].scanKey] = state.choices[id].value; });
      return o;
    }
    function dots(order, active){
      var n = order.length + 1, h = '';
      // Veel stappen (bv. steunkous): een voortgangsbalk in plaats van losse streepjes.
      if (order.length + 1 > 6) return '<span class="akh-maat__progress" aria-hidden="true"><i style="width:' + Math.max(6, Math.round(Math.min(active, n - 1) / (n - 1) * 100)) + '%"></i></span>';
      for (var i = 0; i < n; i++) h += '<i' + (i <= active ? ' class="is-on"' : '') + '></i>';
      return '<span class="akh-maat__dots" aria-hidden="true">' + h + '</span>';
    }
    function stepHead(order){
      var first = state.idx === 0, lead = cfg.intro.title;
      // v23: bij 2+ metingen meteen zeggen hoeveel en welke ("Je meet 2 punten: voetlengte en voorvoet.").
      var ms = order.filter(function(id){ return !isChoice(id); });
      if (first && ms.length >= 2 && lead === DEFAULTS.intro.title)
        lead = 'Je meet ' + ms.length + ' punten: ' + andList(ms.map(function(id){ return lcFirst(cfg.measures[id].short || cfg.measures[id].label); })) + '.';
      var eb = first ? cfg.intro.eyebrow : 'Stap ' + (state.idx + 1) + ' van ' + order.length, isCount = lead !== cfg.intro.title;
      return '<div class="akh-maat__top"><span class="akh-maat__eyebrow">' + esc(eb) + '</span>' + dots(order, state.idx) + '</div>' +
             (first && lead ? '<p class="akh-maat__lead' + (isCount ? ' is-count' : '') + '">' + esc(lead) + '</p>' : '');
    }

    function renderStep(){
      root.classList.remove('is-scanning');
      root.classList.remove('akh-maat--breed');
      var order = activeOrder();
      if (state.idx >= order.length) return renderResult(order);
      var id = order[state.idx];
      if (isChoice(id)) return renderChoice(order, id);
      var m = cfg.measures[id], first = state.idx === 0;
      figEl.innerHTML = picture(m, m.illustration);
      var cur = state.values[id] != null ? fmt(state.values[id]) : '';
      mainEl.innerHTML =
        '<div class="akh-maat__step">' + stepHead(order) +
          '<h3 class="akh-maat__title">' + (first ? 'Stap 1: ' : '') + esc(m.title) + '</h3>' +
          '<p class="akh-maat__text">' + esc(m.text) + '</p>' +
          '<div class="akh-maat__form">' +
            '<div class="akh-maat__field"><input type="text" inputmode="decimal" autocomplete="off" aria-label="' + esc(unitOf(m) === 'cm' ? m.label + ' in centimeters' : ucFirst(m.label)) + '" value="' + esc(cur) + '"><span class="akh-maat__unit">' + esc(m.field != null ? m.field : unitOf(m)) + '</span></div>' +
            (state.scanned[id] ? '<p class="akh-maat__scanned">Gemeten met je camera. Klopt het niet? Pas de waarde gerust aan.</p>' : '') +
            '<p class="akh-maat__error" aria-live="polite"></p>' +
            '<div class="akh-maat__actions">' +
              (state.idx > 0 ? '<button type="button" class="akh-maat__link" data-back>&larr; Vorige</button>' : '') +
              '<button type="button" class="akh-maat__next" data-next disabled>' + (state.idx === order.length - 1 ? 'Toon mijn maat' : 'Volgende stap') + ICON_ARROW + '</button>' +
            '</div>' +
            (canScan(m) ? '<button type="button" class="akh-maat__scanlink" data-scan>' + ICON_CAM + '<span>' + esc(m.scan.linkText || 'Lastig om te meten? Meet met je camera') + '</span><em>Nieuw</em></button>' : '') +
          '</div>' +
        '</div>';

      // Bewust GEEN <form>: in de "(Maattabel)"-popup staat dit block binnen
      // #product_addtocart_form, en een genest formulier wordt door de browser
      // weggegooid. Enter wordt hieronder zelf afgevangen.
      var box = mainEl.querySelector('.akh-maat__form'), input = box.querySelector('input'),
          field = box.querySelector('.akh-maat__field'), err = box.querySelector('.akh-maat__error'),
          next = box.querySelector('[data-next]');
      function sync(){ var ok = !isNaN(parseNum(input.value)); next.disabled = !ok; field.classList.toggle('is-filled', ok); }
      input.addEventListener('input', function(){
        field.classList.remove('is-invalid'); err.textContent = '';
        if (!started) { started = true; track(cfg, 'start'); }
        sync();
      });
      input.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); e.stopPropagation(); submit(); }
      });
      next.addEventListener('click', function(e){ e.preventDefault(); submit(); });
      sync();
      function submit(){
        var v = parseNum(input.value);
        if (isNaN(v)) { field.classList.add('is-invalid'); err.textContent = unitOf(m) === 'cm' ? 'Vul je ' + m.label + ' in centimeters in.' : 'Vul je ' + m.label + ' in' + (m.example ? ' (bijvoorbeeld ' + m.example + ')' : '') + '.'; input.focus(); return; }
        if (v < m.min || v > m.max) { field.classList.add('is-invalid'); err.textContent = amount(m, v) + ' lijkt niet te kloppen. ' + (m.recheck || 'Meet je ' + m.label + ' nog eens na.'); input.focus(); return; }
        state.values[id] = v;
        if (state.scanned[id] && Math.abs(state.scanned[id] - v) > 0.05) state.scanned[id] = 0;
        state.idx = nextIdx();
        track(cfg, 'measure', {step: id, value: v});
        renderStep(); focusInput();
      }
      var scanBtn = box.querySelector('[data-scan]');
      if (scanBtn) scanBtn.addEventListener('click', function(){ scanIntro(id); });
      bindBack();
    }

    function renderChoice(order, id){
      var ch = choices[id], first = state.idx === 0, cur = state.choices[id];
      var fam = ((cfg.measures[allSteps.filter(function(x){ return !isChoice(x); })[0]] || {}).illustration || '').split('-')[0];
      figEl.innerHTML = ch.svg || ch.img ? picture(ch) : basePicture(false, ch.illustration || fam);
      mainEl.innerHTML =
        '<div class="akh-maat__step">' + stepHead(order) +
          '<h3 class="akh-maat__title">' + (first ? 'Stap 1: ' : '') + esc(ch.title) + '</h3>' +
          (ch.text ? '<p class="akh-maat__text">' + esc(ch.text) + '</p>' : '') +
          '<div class="akh-maat__choices">' + optionsOf(id).map(function(o, i){
            return '<button type="button" class="akh-maat__choice' + (cur && cur.value === o.value ? ' is-on' : '') + '" data-i="' + i + '">' +
                   (o.icon === 'hand-left' ? iconHand(false) : o.icon === 'hand-right' ? iconHand(true) : '') + esc(o.label) + '</button>';
          }).join('') + '</div>' +
          (state.idx > 0 ? '<div class="akh-maat__actions"><button type="button" class="akh-maat__link" data-back>&larr; Vorige</button></div>' : '') +
        '</div>';
      var opts = optionsOf(id);
      Array.prototype.forEach.call(mainEl.querySelectorAll('.akh-maat__choice'), function(b){
        b.addEventListener('click', function(){
          state.choices[id] = opts[+b.getAttribute('data-i')];
          if (!started) { started = true; track(cfg, 'start'); }
          track(cfg, 'choice', {step: id, value: state.choices[id].value});
          state.idx = nextIdx();
          renderStep(); focusInput();
        });
      });
      bindBack();
    }
    function bindBack(){
      var back = mainEl.querySelector('[data-back]');
      if (back) back.addEventListener('click', function(){ state.idx--; track(cfg, 'back'); renderStep(); focusInput(); });
    }
    function focusInput(){
      var i = mainEl.querySelector('input');
      if (i) { try { i.focus({preventScroll: true}); } catch(e){} }
    }

    function chatAvailable(){ return !!(document.getElementById('sleak-buttonwrap') || document.querySelector('[open-widget]')); }
    // Chat met de digitale assistent (Sleak). Kan de chat een vraag klaarzetten (slk-message-trigger), dan staat
    // de vraag van de klant al voorgeformuleerd in de chat: maat, metingen en product.
    function canPrefill(){ return typeof window.toggleSleakWidget === 'function'; }
    function chatButton(text, msg){
      if (!chatAvailable()) return '';
      return '<button type="button" class="akh-maat__chat" data-chat' + (msg ? ' data-msg="' + esc(msg) + '"' : '') + '>' + esc(text) + '</button>';
    }
    function prefillChat(msg){
      if (!msg || !canPrefill()) return false;
      var wrap = document.getElementById('sleak-buttonwrap'), scope = wrap && wrap.closest ? wrap.closest('[slk-instance]') : null, host = scope || document.body;
      var t = document.createElement('span');
      t.setAttribute('slk-message-trigger', msg); t.setAttribute('aria-hidden', 'true');
      t.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden';
      host.appendChild(t);
      // Alleen de zwevende chat (eigen slk-instance) de vraag laten klaarzetten, niet ook de chat die in de pagina staat.
      if (scope) scope.addEventListener('click', function stop(e){ if (e.target === t) e.stopPropagation(); scope.removeEventListener('click', stop); });
      t.click();
      setTimeout(function(){ if (t.parentNode) t.parentNode.removeChild(t); }, 0);
      return true;
    }
    function openChat(msg){
      track(cfg, 'chat', {prefill: !!msg});
      closeDialogAround(root);
      if (prefillChat(typeof msg === 'string' ? msg : '')) return;
      var l = document.getElementById('sleak-buttonwrap') || document.querySelector('[open-widget]');
      if (l) l.click();
    }
    function productTitle(){
      var h = document.querySelector('h1.page-title, .page-title h1, h1');
      var t = h ? (h.textContent || '').replace(/\s+/g, ' ').trim() : '';
      return t || cfg.productName;
    }
    // Voor de klaargezette chatvraag: metingen ("mijn schoenmaat is 47 en mijn kuitomvang is 38 cm") en keuzes ("linkervoet").
    function andList(f){ return f.length > 1 ? f.slice(0, -1).join(', ') + ' en ' + f[f.length - 1] : (f[0] || ''); }
    function chatFacts(order){
      return andList(order.filter(function(id){ return !isChoice(id) && state.values[id] != null; }).map(function(id){
        return 'mijn ' + cfg.measures[id].label + ' is ' + amount(cfg.measures[id], state.values[id]);
      }));
    }
    function chatSubject(){
      var c = allSteps.filter(isChoice).map(function(id){ var o = state.choices[id]; return o && !o.autoPicked && !choices[id].auto ? lcFirst(o.label || o.value) : ''; }).filter(Boolean);
      return 'de ' + productTitle() + (c.length ? ' (' + c.join(', ') + ')' : '');
    }
    // Maattabel op het advies (v14): de tabel van dit product, met de geadviseerde maat gemarkeerd, als bevestiging.
    // Alleen maten die het product heeft (en na een eigen keuze alleen de overgebleven maten). Niet bij grafieken
    // (lengte x gewicht: dezelfde maat in veel vakjes) of heel lange tabellen.
    function sizeTable(list, intro){
      var html = '';
      list.forEach(function(r){
        var m = r.mapping;
        if (!m || (m.type !== 'range' && m.type !== 'fit') || (!r.pick && r.status !== 'nofit')) return;   // v18: ook zonder passende maat
        var rows = adv.candidates(m), seen = {}, dup = false;
        rows.forEach(function(x){ var k = norm(x.value); if (seen[k]) dup = true; seen[k] = 1; });
        if (dup || rows.length < 2 || rows.length > 14) return;
        var keys = m.type === 'fit' ? fitMeasures(m).filter(function(k){ return rows.some(function(x){ return Array.isArray(x[k]); }); }) : [m.measure];
        if (!keys.length || keys.some(function(k){ return !cfg.measures[k]; })) return;
        var th = 'text-align:left;padding:7px 10px;font-size:12px;font-weight:700;color:var(--muted,#5b6b78);border-bottom:1px solid var(--blue-line,#cfeaf4);';
        var head = '<tr><th style="' + th + '">' + esc(m.label || 'Maat') + '</th>' + keys.map(function(k){
          var ms = cfg.measures[k], v = state.values[k];
          return '<th style="' + th + '">' + esc(ucFirst(ms.short || ms.label)) + (v != null ? '<br><span style="font-weight:400">jij: ' + esc(amount(ms, v)) + '</span>' : '') + '</th>';
        }).join('') + '</tr>';
        var body = rows.map(function(x){
          var on = !!r.pick && norm(x.value) === norm(r.pick.value);
          var td = 'padding:7px 10px;font-size:13.5px;border-bottom:1px solid var(--blue-line,#cfeaf4);' + (on ? 'background:var(--blue-soft,#eaf6fb);color:var(--blue-dark,#1a7ba3);font-weight:700;' : '');
          return '<tr' + (on ? ' data-advised' : '') + '><td style="' + td + (on ? 'box-shadow:inset 3px 0 0 var(--blue,#2399c7);' : '') + '">' + esc(x.value) +
                 (on ? ' <span style="display:inline-block;margin-left:6px;padding:1px 7px;border-radius:9999px;background:var(--blue,#2399c7);color:#fff;font-size:11px;font-weight:700;vertical-align:1px">jouw maat</span>' : '') + '</td>' +
                 keys.map(function(k){
                   var lo = m.type === 'fit' ? (x[k] || [])[0] : x.min, hi = m.type === 'fit' ? (x[k] || [])[1] : x.max;
                   var v = state.values[k], inside = lo != null && v != null && v >= lo - 1e-9 && v <= hi + 1e-9;   // v18: meting valt in dit bereik
                   return '<td style="' + td + (inside && !on ? 'font-weight:700;color:var(--blue-dark,#1a7ba3);' : '') + '">' + (lo == null ? '\u2013' : esc(rangeText(cfg.measures[k], lo, hi))) + '</td>';
                 }).join('') + '</tr>';
        }).join('');
        html += '<table style="width:100%;border-collapse:collapse;margin:8px 0 4px;background:#fff;border:1px solid var(--blue-line,#cfeaf4);border-radius:10px;overflow:hidden">' +
                '<thead>' + head + '</thead><tbody>' + body + '</tbody></table>';
      });
      if (!html) return '';
      return '<div class="akh-maat__sizetable" style="margin:0 0 12px">' +
               '<button type="button" data-sizetable aria-expanded="false" style="background:none;border:0;padding:0;font:inherit;font-size:13px;font-weight:600;color:var(--blue-dark,#1a7ba3) !important;text-decoration:underline;cursor:pointer">Bekijk de maattabel</button>' +
               '<div data-sizetable-box hidden>' + (intro ? '<div style="margin-top:10px">' + intro + '</div>' : '') + html + '</div>' +
             '</div>';
    }
    // v19: korte uitleg als "valt klein/groot" het advies heeft veranderd.
    function shiftNote(list){
      var r = list.filter(function(x){ return x.shifted; })[0];
      if (!r) return '';
      var lbl = lcFirst(r.mapping.label || 'maat'), adv = esc(lbl + ' ' + r.pick.value);
      return '<p class="akh-maat__note">Deze ' + esc(cfg.productName) + ' valt ' + (cfg.shift > 0 ? 'klein' : 'groot') + ' uit. ' +
        (r.tablePick ? 'Je meting hoort in de maattabel bij ' + esc(lbl + ' ' + r.tablePick) + ', maar op basis van ervaringen van andere klanten past ' + adv + ' beter. '
                     : 'Op basis van ervaringen van andere klanten past ' + adv + ' het best. ') +
        '<b>Bestel daarom ' + adv + '.</b></p>';
    }
    function failMsg(fail, order){
      var facts = chatFacts(order), subj = chatSubject();
      if (fail.status === 'none') return 'Ik wil graag maatadvies voor ' + subj + '.' + (facts ? ' ' + ucFirst(facts) + '.' : '') + ' Welke maat past bij mij?';
      if (fail.mixed) return 'Ik zoek de juiste maat voor ' + subj + '. Volgens het maatadvies passen mijn maten niet in \u00e9\u00e9n maat' + (facts ? ': ' + facts : '') + '. Welke maat raad je aan?';
      return 'Ik zoek de juiste maat voor ' + subj + '. ' + (facts ? ucFirst(facts) + ', maar daar' : 'Daar') + ' past volgens het maatadvies geen maat bij. Welke maat of welk alternatief raad je aan?';
    }
    function renderResult(order){
      var measured = cfg.mappings.map(function(m){
        var a = adviceFor(m);
        if (!a) {
          var c = adv.candidates(m), p = c.filter(function(x){ return x.available !== false; })[0] || c[0] || null;
          return {mapping: m, pick: p, status: c.length ? 'ok' : 'none', measured: null, unavailable: !!(p && p.available === false)};
        }
        return a;
      });
      var chosen = allSteps.filter(isChoice).filter(function(id){ return state.choices[id]; }).map(function(id){
        var o = state.choices[id];
        return {mapping: {attribute: choices[id].attribute, label: choices[id].resultLabel || choices[id].title}, pick: {value: o.short || o.value, optionId: o.optionId}, status: 'ok'};
      });
      var results = measured.concat(chosen);
      var fail = measured.filter(function(r){ return r.status === 'nofit' || r.status === 'none'; })[0];
      var gone = !fail && measured.filter(function(r){ return r.unavailable; });
      // Zelfde regel als het oorspronkelijke ontwerp: "Op basis van 35,6 cm nekomtrek en 10 cm nekhoogte."
      var parts = order.filter(function(id){ return !isChoice(id) && state.values[id] != null; })
        .map(function(id){ return esc(basisPart(cfg.measures[id], state.values[id])); });
      var basis = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' en ' + parts[parts.length - 1] : (parts[0] || '');
      var foot = '<div class="akh-maat__foot"><button type="button" class="akh-maat__link" data-restart>Opnieuw beginnen</button></div>';
      var illu = (cfg.measures[allSteps.filter(function(id){ return !isChoice(id); })[0]] || {}).illustration || '';

      if (fail) {
        figEl.innerHTML = basePicture(false, illu.split('-')[0]);
        mainEl.innerHTML =
          '<div class="akh-maat__step">' +
            '<div class="akh-maat__top"><span class="akh-maat__eyebrow">Jouw maatadvies</span>' + dots(order, order.length) + '</div>' +
            '<h3 class="akh-maat__title">Geen passende maat gevonden</h3>' +
            '<p class="akh-maat__text">' + (fail.status === 'none'
              ? 'We konden de maten van dit product nu niet uitlezen.'
              : fail.mixed
              ? 'Je maten passen niet samen in \u00e9\u00e9n maat van deze ' + esc(cfg.productName) + '. Controleer je metingen, of vraag onze digitale assistent welke maat het best bij je past.'
              : 'Met een ' + esc(cfg.measures[fail.failMeasure || fail.mapping.measure].label) + ' van ' + esc(amount(cfg.measures[fail.failMeasure || fail.mapping.measure], fail.measured)) + ' is deze ' + esc(cfg.productName) + ' ' + (fail.dir === 'small' ? 'te groot' : 'te klein') + ' voor je. ' + (unitOf(cfg.measures[fail.failMeasure || fail.mapping.measure]) === 'cm' ? 'Meet nog eens na.' : esc(cfg.measures[fail.failMeasure || fail.mapping.measure].recheck || 'Controleer je invoer.'))) + '</p>' +
            (fail.status === 'nofit' ? sizeTable(measured) : '') +
            chatButton('Vraag onze digitale assistent om advies', failMsg(fail, order)) + foot +
          '</div>';
        bindResult(results);
        track(cfg, 'advice_none', {attribute: fail.mapping.attribute});
        return;
      }

      // De passende maat bestaat wel, maar is nu uitverkocht: eerlijk zeggen, geen andere maat adviseren.
      if (gone && gone.length) {
        figEl.innerHTML = basePicture(false, illu.split('-')[0]);
        mainEl.innerHTML =
          '<div class="akh-maat__step">' +
            '<div class="akh-maat__top"><span class="akh-maat__eyebrow">Jouw maatadvies</span>' + dots(order, order.length) + '</div>' +
            '<h3 class="akh-maat__title">Jouw maat is nu niet leverbaar</h3>' +
            '<p class="akh-maat__text">' + (basis ? 'Op basis van ' + basis + ' past ' : 'Bij jou past ') +
              gone.map(function(r){ return esc(lcFirst(r.mapping.label)) + ' ' + esc(r.pick.value); }).join(' en ') +
              ' het best, maar die is op dit moment niet leverbaar.</p>' + sizeTable(gone, shiftNote(gone)) +
            chatButton('Vraag onze digitale assistent om een alternatief', 'Volgens het maatadvies past ' + gone.map(function(r){ return lcFirst(r.mapping.label) + ' ' + r.pick.value; }).join(' en ') + ' van ' + chatSubject() + ' het best bij mij' + (chatFacts(order) ? ' (' + chatFacts(order) + ')' : '') + ', maar die is nu niet leverbaar. Wanneer is die weer leverbaar, of welk alternatief raad je aan?') + foot +
          '</div>';
        bindResult(results);
        track(cfg, 'advice_unavailable', {advice: gone.map(function(r){ return r.pick.value; }).join(' / ')});
        return;
      }
      var notes = measured.filter(function(r){ return r.status === 'note' && !r.split; });
      var splits = measured.filter(function(r){ return r.status === 'note' && r.split; });
      var variant = adv.variantFor(adv.selectionFrom(results));
      var buy = '';
      if (!variant && pc) {
        buy = '<p class="akh-maat__note">Deze maat is in deze uitvoering op dit moment niet leverbaar.</p>' + chatButton('Vraag onze digitale assistent om een alternatief', 'Ik wil ' + chatSubject() + ' bestellen in ' + results.filter(function(r){ return r.mapping.label; }).map(function(r){ return lcFirst(r.mapping.label) + ' ' + r.pick.value; }).join(', ') + ', maar die uitvoering is nu niet leverbaar. Welk alternatief raad je aan?');
      } else if (variant) {
        buy = '<div class="akh-maat__buy"><span class="akh-maat__price">' +
                (variant.price != null ? '<b>' + euro(variant.price) + '</b>' : '') +
                (variant.oldPrice != null ? '<s>' + euro(variant.oldPrice) + '</s>' : '') + '</span>' +
                (variant.available
                  ? '<span class="akh-maat__stock' + (variant.slow ? ' is-slow' : '') + '"><i></i>' + esc(variant.stock || 'Op voorraad') + '</span>'
                  : '<span class="akh-maat__stock is-no"><i></i>Tijdelijk niet leverbaar</span>') +
              '</div>' +
              '<button type="button" class="akh-maat__cart" data-cart' + (variant.available ? '' : ' disabled') + '>' + ICON_CART + 'In winkelwagen</button>' +
              (variant.available ? '' : chatButton('Vraag onze digitale assistent om een alternatief', 'Ik wil ' + chatSubject() + ' bestellen in ' + results.filter(function(r){ return r.mapping.label; }).map(function(r){ return lcFirst(r.mapping.label) + ' ' + r.pick.value; }).join(', ') + ', maar die uitvoering is nu niet leverbaar. Welk alternatief raad je aan?'));
      }
      // v23: controle ("controle: voorvoet"): past het controle-meetpunt niet in de geadviseerde maat?
      var wide = widthCheck(measured), alts = wide && (cfg.alternatives || []).length;
      if (wide) {
        var wm = cfg.measures[wide.check.measure] || {};
        var wtxt = (wm.checkText || 'Je {l} ({v}) is groter dan deze {p} in maat {s} (tot {max}).')
          .replace('{l}', wm.label || '').replace('{v}', amount(wm, wide.value)).replace('{p}', cfg.productName || 'product')
          .replace('{s}', wide.size).replace('{max}', amount(wm, wide.row.max));
        // Niet deze maat adviseren: eerst de uitleg en de bredere schoenen; "toch deze bestellen" is een kleine knop
        // die de gewone uitslag (maat, maattabel, prijs en winkelwagen) pas na een klik toont.
        var wideHead = '<p class="akh-maat__text">' + esc(wtxt) + '</p>' +
              (alts ? '<div class="akh-maat__alts" data-alts aria-live="polite"><p class="akh-maat__altload">' + esc(wm.altLoading || 'Alternatieven zoeken\u2026') + '</p></div>' : '') +
              '<button type="button" class="akh-maat__toch" data-toch aria-expanded="false">' + esc((wm.tochText || 'Ik wil toch dit product bestellen').replace('{p}', cfg.productName || 'product')) + '</button>' +
              '<div class="akh-maat__tochbox" data-toch-box hidden>';
        track(cfg, 'width_check', {measure: wide.check.measure, value: wide.value, size: wide.size, alternatives: alts ? cfg.alternatives.length : 0});
      }
      figEl.innerHTML = basePicture(true, illu.split('-')[0]);
      root.classList.toggle('akh-maat--breed', !!wide);
      mainEl.innerHTML =
        '<div class="akh-maat__step">' +
          '<div class="akh-maat__top"><span class="akh-maat__eyebrow">Jouw maatadvies</span>' + dots(order, order.length) + '</div>' +
          '<h3 class="akh-maat__title" data-akh-title>' + (wide ? esc(alts ? (wm.checkTitle || 'Kies liever een ruimer model') : (wm.checkTitleNone || 'Dit model is te krap voor je')) : 'Bestel deze maat') + '</h3>' +
          (wide ? wideHead : '') +
          '<div class="akh-maat__result' + (results.length > 2 ? ' is-many' : '') + '">' + results.map(function(r){
            return '<div><small>' + esc(r.mapping.label) + '</small><strong>' + esc(r.pick.value) + '</strong></div>';
          }).join('') + '</div>' +
          (basis ? '<p class="akh-maat__basis">Op basis van ' + basis + '.</p>' : '') +
          sizeTable(measured, shiftNote(measured)) +
          (splits.length ? '<p class="akh-maat__note">' + splits.map(function(n){
              var parts = n.split.map(function(x, i){ return 'je ' + esc(cfg.measures[x.measure].label) + (i ? '' : ' past') + ' bij maat ' + esc(x.value); });
              return ucFirst(parts.slice(0, -1).join(', ') + ' en ' + parts[parts.length - 1]) + '. Zoals de fabrikant aanraadt, adviseren we dan de ' +
                     (n.mapping.mixed === 'smaller' ? 'kleinere' : 'grotere') + ' maat.';
            }).join(' ') + '</p>' : '') +
          (notes.length ? '<p class="akh-maat__note">' + notes.map(function(n){
              if (n.mapping.type === 'fit') {
                return n.off.map(function(k){
                  return 'Je ' + esc(cfg.measures[k].label) + ' (' + esc(amount(cfg.measures[k], state.values[k])) + ') valt net buiten maat ' + esc(n.pick.value) + ' (' + esc(rangeText(cfg.measures[k], n.pick[k][0], n.pick[k][1])) + ')';
                }).join('. ') + ', maar dit is de best passende maat.';
              }
              var mm = cfg.measures[n.mapping.measure], lbl = esc(mm.label);
              return n.mapping.type === 'range'
                ? 'Je ' + lbl + ' (' + esc(amount(mm, n.measured)) + ') valt net buiten maat ' + esc(n.pick.value) + ' (' + esc(rangeText(mm, n.pick.min, n.pick.max)) + '), maar dit is de best passende maat.'
                : 'Je ' + lbl + ' (' + esc(amount(mm, n.measured)) + ') wijkt wat af van de beschikbare maten.';
            }).join(' ') + (notes.every(function(n){ return n.mapping.type !== 'fit' && unitOf(cfg.measures[n.mapping.measure]) !== 'cm'; }) ? ' Controleer je ' + esc(cfg.measures[notes[0].mapping.measure].label) : ' Meet nog eens na') +
            (chatAvailable() ? ', of <button type="button" data-chat data-msg="' + esc('Ik twijfel over mijn maat voor ' + chatSubject() + '. ' + (chatFacts(order) ? ucFirst(chatFacts(order)) + '; dat' : 'Dat') + ' valt net buiten ' + notes.map(function(n){ return lcFirst(n.mapping.label) + ' ' + n.pick.value; }).join(' en ') + ' volgens het maatadvies. Welke maat raad je aan?') + '">vraag onze digitale assistent om advies</button>.' : '.') + '</p>' : '') +
          buy + (wide ? '</div>' : '') + foot +
        '</div>';
      bindResult(results);
      var tch = mainEl.querySelector('[data-toch]'), tbox = mainEl.querySelector('[data-toch-box]');
      if (tch && tbox) tch.addEventListener('click', function(){
        tbox.removeAttribute('hidden'); tch.parentNode.removeChild(tch);
        track(cfg, 'alt_toch', {size: wide.size});
      });
      var vals = {}; Object.keys(state.values).forEach(function(k){ if (state.values[k] != null) vals[(cfg.measures[k] || {}).short || k] = state.values[k]; });
      track(cfg, 'advice_shown', {advice: results.map(function(r){ return r.pick.value; }).join(' / '), note: notes.length > 0, measurements: vals, wide: !!wide});
      if (wide && alts) showAlternatives(wide, wm);
      // v15: advies bewaren (zelfde attribuut-/optie-id's als in het winkelmandje).
      journeyMaat(function(e){
        e.adviceAt = Date.now();
        e.advice = results.filter(function(r){ return r.pick; }).map(function(r){
          var a = adv.attrByCode(r.mapping.attribute);
          return {label: r.mapping.label || '', value: r.pick.value, attributeId: a ? String(a.id) : null, optionId: r.pick.optionId != null ? String(r.pick.optionId) : null};
        });
      });
    }

    // v23: controle-meetpunt tegen de geadviseerde maat (eerste maattabel-koppeling).
    function widthCheck(measured){
      var size = measured.filter(function(r){ return r.pick && (r.mapping.type === 'range' || r.mapping.type === 'fit'); })[0];
      if (!size) return null;
      for (var i = 0; i < (cfg.checks || []).length; i++) {
        var c = cfg.checks[i], v = state.values[c.measure];
        if (v == null) continue;
        var row = c.table.filter(function(x){ return norm(x.value) === norm(size.pick.value); })[0];
        if (row && v > row.max + (c.tolerance || 0) + 1e-9) return {check: c, value: v, row: row, size: size.pick.value, label: size.mapping.label || 'maat'};
      }
      return null;
    }
    function showAlternatives(wide, wm){
      var box = mainEl.querySelector('[data-alts]');
      if (!box) return;
      var vals = Object.assign({}, state.values);
      loadAlternatives(cfg.alternatives, vals, function(list){
        if (!box.isConnected) return;
        if (!list.length) {
          box.parentNode.removeChild(box);
          var t = mainEl.querySelector('[data-akh-title]'); if (t) t.textContent = wm.checkTitleNone || 'Dit model is te krap voor je';
          track(cfg, 'alt_none', {});
          return;
        }
        box.innerHTML = '<p class="akh-maat__altkop">' + esc(wm.altTitle || 'Deze passen beter, in jouw maat:') + '</p>' + list.map(function(a){
          return '<a class="akh-maat__alt" href="' + esc(a.href) + '" data-sku="' + esc(a.sku) + '">' +
                   (a.img ? '<img src="' + esc(a.img) + '" alt="" loading="lazy" width="64" height="64">' : '<span class="akh-maat__altimg"></span>') +
                   '<span class="akh-maat__alttxt"><b>' + esc(a.name) + '</b>' +
                   '<span>' + esc(a.label) + ' ' + esc(a.size) + (a.price != null ? ' \u00b7 ' + euro(a.price) : '') + '</span>' +
                   '<em class="' + (!a.inStock ? 'is-no' : a.slow ? 'is-slow' : '') + '"><i></i>' + esc(!a.inStock ? 'Tijdelijk niet leverbaar' : (a.stock || 'Leverbaar')) + '</em></span>' +
                   ICON_ARROW + '</a>';
        }).join('');
        Array.prototype.forEach.call(box.querySelectorAll('[data-sku]'), function(el){
          el.addEventListener('click', function(){ track(cfg, 'alt_click', {sku: el.getAttribute('data-sku')}); });
        });
        track(cfg, 'alt_shown', {count: list.length, skus: list.map(function(a){ return a.sku; }).join(',')});
      });
    }
    function bindResult(results){
      var tb = mainEl.querySelector('[data-sizetable]'), box = mainEl.querySelector('[data-sizetable-box]');
      if (tb && box) tb.addEventListener('click', function(){
        var open = box.hasAttribute('hidden');
        if (open) box.removeAttribute('hidden'); else box.setAttribute('hidden', '');
        tb.setAttribute('aria-expanded', open ? 'true' : 'false');
        tb.textContent = open ? 'Verberg de maattabel' : 'Bekijk de maattabel';
        if (open) track(cfg, 'size_table');
      });
      var rs = mainEl.querySelector('[data-restart]');
      if (rs) rs.addEventListener('click', function(){ state = {idx: 0, values: {}, choices: {}, scanned: {}}; track(cfg, 'restart'); renderStep(); focusInput(); });
      Array.prototype.forEach.call(mainEl.querySelectorAll('[data-chat]'), function(b){ b.addEventListener('click', function(){ openChat(b.getAttribute('data-msg') || ''); }); });
      var cart = mainEl.querySelector('[data-cart]');
      if (cart) cart.addEventListener('click', function(){ addToCart(adv.selectionFrom(results), results); });
    }

    function addToCart(sel, results){
      var form = document.getElementById('product_addtocart_form');
      track(cfg, 'add_to_cart', {selection: results.map(function(r){ return r.pick.value; }).join(' / ')});
      if (!form) {
        window.location.href = window.location.pathname + '#' + Object.keys(sel).map(function(a){ return a + '=' + sel[a]; }).join('&');
        return;
      }
      Object.keys(sel).forEach(function(attrId){
        var val = String(sel[attrId]), name = 'super_attribute[' + attrId + ']';
        var radios = form.querySelectorAll('input[type="radio"][name="' + name + '"]');
        var select = form.querySelector('select[name="' + name + '"]');
        if (radios.length) {
          Array.prototype.forEach.call(radios, function(r){
            if (r.value === val) { r.disabled = false; r.checked = true; r.dispatchEvent(new Event('change', {bubbles: true})); }
          });
        } else if (select) {
          select.value = val; select.dispatchEvent(new Event('change', {bubbles: true}));
        } else {
          var h = form.querySelector('input[type="hidden"][name="' + name + '"]');
          if (!h) { h = document.createElement('input'); h.type = 'hidden'; h.name = name; form.appendChild(h); }
          h.value = val;
        }
      });
      closeDialogAround(root);
      var submitter = document.getElementById('product-addtocart-button');
      setTimeout(function(){
        try {
          if (typeof form.requestSubmit === 'function') {
            if (submitter && submitter.form === form) form.requestSubmit(submitter); else form.requestSubmit();
          } else if (submitter) submitter.click();
          else form.submit();
        } catch(e) { if (submitter) submitter.click(); else form.submit(); }
      }, 60);
    }

    /* ---------- camerameting (nieuw) ---------- */
    var scan = null;
    function canScan(m){
      if (m.scan && m.scan.devices !== 'all' && !isPhone()) return false;   // standaard alleen op telefoons
      return !!(m.scan && SCANNERS[m.scan.type] && cfg.scanner && window.isSecureContext &&
                navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    function scanShell(inner){
      root.classList.add('is-scanning');
      mainEl.innerHTML = '<div class="akh-maat__step"><div class="akh-maat__top"><span class="akh-maat__eyebrow">Camerameting &middot; nieuw</span></div>' + inner + '</div>';
    }
    function backToStep(){ stopScan(); renderStep(); focusInput(); }
    function txt(v, o){ return typeof v === 'function' ? v(o) : v; }
    function scanIntro(id){
      var sc = SCANNERS[cfg.measures[id].scan.type], o = scanOpts();
      track(cfg, 'scan_open', {step: id});
      scanShell(
        '<h3 class="akh-maat__title">' + esc(txt(sc.title, o)) + '</h3>' +
        '<ol class="akh-maat__tips">' + txt(sc.tips, o).map(function(t, i){ return '<li><b>' + (i + 1) + '</b><span>' + esc(t) + '</span></li>'; }).join('') + '</ol>' +
        '<p class="akh-maat__privacy">Je camerabeeld wordt alleen op je eigen toestel verwerkt. Er wordt niets opgeslagen of verstuurd.</p>' +
        '<div class="akh-maat__actions"><button type="button" class="akh-maat__link" data-cancel>Annuleren</button>' +
        '<button type="button" class="akh-maat__next" data-start>' + ICON_CAM + 'Start camera</button></div>');
      mainEl.querySelector('[data-cancel]').addEventListener('click', backToStep);
      mainEl.querySelector('[data-start]').addEventListener('click', function(){ startScan(id); });
    }
    function scanError(id, text){
      stopScan();
      track(cfg, 'scan_error', {step: id, reason: text});
      scanShell(
        '<h3 class="akh-maat__title">Camerameting lukt nu niet</h3>' +
        '<p class="akh-maat__text">' + esc(text) + '</p>' +
        '<div class="akh-maat__actions"><button type="button" class="akh-maat__next" data-tape>Meten met een meetlint</button></div>');
      mainEl.querySelector('[data-tape]').addEventListener('click', backToStep);
    }
    function startScan(id){
      var m = cfg.measures[id], sc = SCANNERS[m.scan.type], o = scanOpts();
      scanShell('<div class="akh-maat__loading"><span class="akh-maat__spin"></span>Camera en meetmodel laden&hellip;</div>');
      var cam = navigator.mediaDevices.getUserMedia({video: {facingMode: 'user', width: {ideal: 1280}, height: {ideal: 960}}, audio: false});
      Promise.all([cam, loadModels(cfg.scanner, sc.models)]).then(function(r){
        var stream = r[0], mp = r[1];
        scanShell(
          '<h3 class="akh-maat__title" style="text-align:center" data-live-title></h3>' +
          '<div class="akh-maat__cam"><video playsinline muted autoplay></video><canvas></canvas><div class="akh-maat__count" aria-live="assertive"></div></div>' +
          '<p class="akh-maat__scanmsg" aria-live="polite">Camera starten&hellip;</p>' +
          '<ul class="akh-maat__checks"></ul>' +
          '<div class="akh-maat__scanbar" hidden><i></i></div>' +
          '<div class="akh-maat__center"><button type="button" class="akh-maat__link" data-cancel>Annuleren</button></div>');
        var video = mainEl.querySelector('video'), canvas = mainEl.querySelector('canvas');
        scan = {id: id, stream: stream, mp: mp, video: video, canvas: canvas, ctx: canvas.getContext('2d'),
                sc: sc, opts: o, cal: m.scan.calibration || {factor: 1, offset: 0},
                view: 0, viewValues: [], spreads: [], samples: [], lastT: -1, raf: 0,
                phase: 'position', t0: performance.now(), okSince: 0, cdStart: 0, lastSample: 0, lostSince: 0, cdShown: '', switchAt: 0,
                title: mainEl.querySelector('[data-live-title]'), msg: mainEl.querySelector('.akh-maat__scanmsg'),
                checksEl: mainEl.querySelector('.akh-maat__checks'), barWrap: mainEl.querySelector('.akh-maat__scanbar'),
                bar: mainEl.querySelector('.akh-maat__scanbar i'), count: mainEl.querySelector('.akh-maat__count')};
        setView(scan, 0);
        mainEl.querySelector('[data-cancel]').addEventListener('click', function(){ track(cfg, 'scan_cancel'); backToStep(); });
        video.srcObject = stream;
        var p = video.play(); if (p && p.catch) p.catch(function(){});
        track(cfg, 'scan_start', {step: id});
        scan.raf = requestAnimationFrame(loop);
      }).catch(function(e){
        cam.then(function(st){ st.getTracks().forEach(function(t){ t.stop(); }); }).catch(function(){});
        var denied = e && (e.name === 'NotAllowedError' || e.name === 'SecurityError');
        var nocam = e && (e.name === 'NotFoundError' || e.name === 'OverconstrainedError');
        scanError(id, denied ? 'We hebben geen toegang tot je camera. Sta de camera toe in je browser, of meet met een meetlint.'
                     : nocam ? 'We vinden geen camera op dit toestel. Meet met een meetlint.'
                     : 'Het meetmodel kon niet geladen worden. Meet met een meetlint.');
      });
    }
    function setView(s, i){
      var v = s.sc.views[i];
      s.view = i; s.samples = []; s.phase = 'position'; s.okSince = 0;
      s.title.textContent = txt(v.title, s.opts);
      s.checksEl.innerHTML = v.checks.map(function(c){ return '<li data-c="' + c.key + '"><i></i>' + esc(c.label) + '</li>'; }).join('');
    }
    function setCount(s, n){
      if (String(s.cdShown) === String(n)) return;
      s.cdShown = n; s.count.textContent = n;
      s.count.classList.remove('is-pop'); void s.count.offsetWidth; if (n !== '') s.count.classList.add('is-pop');
    }
    function stopScan(){
      if (!scan) return;
      cancelAnimationFrame(scan.raf);
      try { scan.stream.getTracks().forEach(function(t){ t.stop(); }); } catch(e){}
      scan = null;
    }
    function loop(){
      var s = scan;
      if (!s) return;
      // Block verborgen (popup gesloten) of weggehaald: camera direct uit.
      if (!root.isConnected || root.offsetParent === null) { stopScan(); renderStep(); return; }
      var v = s.video;
      if (v.readyState >= 2 && v.videoWidth && v.currentTime !== s.lastT) {
        s.lastT = v.currentTime;
        var W = v.videoWidth, H = v.videoHeight, now = performance.now(), frame = {};
        var view = s.sc.views[s.view];
        var wantSeg = s.mp.seg && s.phase === 'measure' && now - s.lastSample >= SCAN_SAMPLE_MS;
        try {
          if (s.mp.face) { var fr = s.mp.face.detectForVideo(v, now); frame.face = fr.faceLandmarks && fr.faceLandmarks[0]; }
          if (s.mp.pose) { var pr = s.mp.pose.detectForVideo(v, now); frame.pose = pr.landmarks && pr.landmarks[0]; }
          if (s.mp.hand) { var hr = s.mp.hand.detectForVideo(v, now); frame.hand = hr.landmarks && hr.landmarks[0]; }
          if (wantSeg) {
            var sr = s.mp.seg.segmentForVideo(v, now), mk = sr.categoryMask;
            if (mk) frame.seg = {data: mk.getAsUint8Array(), w: mk.width, h: mk.height, skin: s.mp.skinIndex};
            if (sr.close) sr.close();
          }
        } catch(e){ return scanError(s.id, 'De meting liep vast. Meet met een meetlint.'); }
        if (s.canvas.width !== W) {
          s.canvas.width = W; s.canvas.height = H;
          // Kader volgt de camera (staand op telefoons, liggend op laptops): niets wegsnijden.
          var camBox = s.canvas.parentNode;
          camBox.style.aspectRatio = W + ' / ' + H;
          camBox.style.maxWidth = W > H ? '480px' : '340px';
        }
        var res = s.sc.measure(frame, view.key, W, H, s.opts);
        if (now - s.t0 < SCAN_WARMUP_MS) res = {ok: false, checks: {}, msg: 'Camera starten\u2026'};
        s.ctx.clearRect(0, 0, W, H);
        s.sc.guide(s.ctx, W, H, res.ok, view.key, s.opts);
        if (res.ok && s.phase === 'measure' && s.sc.draw) s.sc.draw(s.ctx, res, W, H, view.key);
        Array.prototype.forEach.call(s.checksEl.children, function(li){ li.classList.toggle('is-ok', !!(res.checks && res.checks[li.getAttribute('data-c')])); });

        if (s.phase === 'switch') {
          if (now >= s.switchAt) { setCount(s, ''); setView(s, s.view + 1); }
        } else if (s.phase === 'position') {
          if (res.ok) {
            if (!s.okSince) s.okSince = now;
            s.msg.textContent = 'Goed zo, blijf zo\u2026';
            if (now - s.okSince >= SCAN_SETTLE_MS) { s.phase = 'countdown'; s.cdStart = now; }
          } else { s.okSince = 0; s.msg.textContent = res.msg; }
        } else if (s.phase === 'countdown') {
          if (!res.ok) { s.phase = 'position'; s.okSince = 0; setCount(s, ''); s.msg.textContent = res.msg; }
          else {
            var left = SCAN_COUNTDOWN - Math.floor((now - s.cdStart) / 1000);
            if (left <= 0) {
              s.phase = 'measure'; s.samples = []; s.lastSample = 0; s.lostSince = 0; s.noValSince = 0; setCount(s, '');
              s.barWrap.hidden = false; s.msg.textContent = 'Meten\u2026 niet bewegen';
            } else { setCount(s, left); s.msg.textContent = 'Niet bewegen, we beginnen zo'; }
          }
        } else if (s.phase === 'measure') {
          if (res.ok) {
            s.lostSince = 0;
            if (wantSeg || !s.mp.seg) {
              if (res.value != null && isFinite(res.value)) { s.samples.push(res.value); s.noValSince = 0; }
              else if (!s.noValSince) s.noValSince = now;
              s.lastSample = now;
            }
            // Wel goed in beeld, maar geen bruikbare meting (bv. randen niet te zien): uitleg geven.
            s.msg.textContent = s.noValSince && now - s.noValSince > SCAN_NOVALUE_MS
              ? (txt(s.sc.noValueMsg, s.opts) || 'We kunnen niet goed meten. Zorg voor goed licht en een rustige achtergrond.')
              : 'Meten\u2026 niet bewegen';
          } else {
            if (!s.lostSince) s.lostSince = now;
            s.msg.textContent = res.msg;
            if (now - s.lostSince > SCAN_LOST_MS) { s.phase = 'position'; s.okSince = 0; s.samples = []; }
          }
          var nViews = s.sc.views.length;
          s.bar.style.width = Math.min(100, Math.round((s.view + Math.min(1, s.samples.length / SCAN_NEED)) / nViews * 100)) + '%';
          if (s.samples.length >= SCAN_NEED) {
            var spread = iqr(s.samples), maxSpread = s.sc.maxSpread || 1;
            if (spread <= maxSpread || s.samples.length >= SCAN_NEED * 2) {
              s.viewValues.push(median(s.samples)); s.spreads.push(spread / maxSpread);
              if (s.view + 1 < nViews) {
                s.phase = 'switch'; s.switchAt = now + SCAN_SWITCH_MS; setCount(s, '\u2713');
                s.msg.textContent = txt(s.sc.views[s.view + 1].intro, s.opts) || 'Goed zo!';
              } else {
                return finishScan(s.sc.combine(s.viewValues, s.cal), Math.max.apply(null, s.spreads));
              }
            }
          }
        }
      }
      s.raf = requestAnimationFrame(loop);
    }
    function finishScan(value, spreadRatio){
      var id = scan.id, m = cfg.measures[id];
      stopScan();
      value = Math.round(value * 10) / 10;
      var unsure = spreadRatio > 1;
      track(cfg, 'scan_result', {step: id, value: value, spread: Math.round(spreadRatio * 100) / 100});
      scanShell(
        '<h3 class="akh-maat__title" style="text-align:center">Je ' + esc(m.label) + ' is gemeten</h3>' +
        '<div class="akh-maat__estimate"><small>Geschatte ' + esc(m.label) + '</small><strong>' + fmt(value) + ' cm</strong></div>' +
        (unsure ? '<p class="akh-maat__note">De metingen liepen wat uiteen. Probeer het nog eens in goed licht en beweeg zo min mogelijk, of meet met een meetlint.</p>'
                : '<p class="akh-maat__privacy" style="text-align:center">Dit is een schatting. Twijfel je? Meet dan na met een meetlint.</p>') +
        '<div class="akh-maat__actions"><button type="button" class="akh-maat__next" data-use>Gebruik deze meting' + ICON_ARROW + '</button></div>' +
        '<div class="akh-maat__center"><button type="button" class="akh-maat__link" data-again>Opnieuw meten</button><button type="button" class="akh-maat__link" data-tape>Toch met meetlint</button></div>');
      mainEl.querySelector('[data-use]').addEventListener('click', function(){
        state.values[id] = value; state.scanned[id] = value;
        track(cfg, 'scan_use', {step: id, value: value});
        renderStep(); focusInput();
      });
      mainEl.querySelector('[data-again]').addEventListener('click', function(){ startScan(id); });
      mainEl.querySelector('[data-tape]').addEventListener('click', backToStep);
    }

    renderStep();
  }

  /* ---------- camerameting: gedeelde helpers ---------- */
  // Telefoon: touchscreen met een smal scherm, of een mobiele user-agent. Tablets en laptops vallen erbuiten.
  function isPhone(){
    var coarse = !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches);
    var s = Math.min(screen.width || 0, screen.height || 0);
    return (coarse && s > 0 && s < 600) || /Android.+Mobile|iPhone|iPod/i.test(navigator.userAgent || '');
  }
  var SCAN_NEED = 30;          // metingen per aanzicht (bij ~10 per seconde ~ 3 seconden)
  var SCAN_WARMUP_MS = 1000;   // camera eerst laten opstarten/belichten
  var SCAN_SETTLE_MS = 1500;   // zo lang moet alles goed staan voordat het aftellen begint
  var SCAN_COUNTDOWN = 3;      // aftellen 3-2-1
  var SCAN_SAMPLE_MS = 100;    // max. 10 metingen per seconde
  var SCAN_LOST_MS = 1500;     // langer uit positie tijdens meten: terug naar positioneren
  var SCAN_NOVALUE_MS = 3000;  // zo lang geen bruikbare meting: uitleg tonen
  var SCAN_SWITCH_MS = 2200;   // pauze tussen twee aanzichten (bv. pols voor -> zij)
  var IRIS_MM = 11.7;          // gemiddelde irisdiameter volwassene: de "liniaal" in beeld
  function median(a){ var b = a.slice().sort(function(x, y){ return x - y; }), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; }
  function iqr(a){ var b = a.slice().sort(function(x, y){ return x - y; }); return b[Math.floor(b.length * 0.75)] - b[Math.floor(b.length * 0.25)]; }
  function dist(a, b){ return Math.hypot(a.x - b.x, a.y - b.y); }
  // Irisbreedte in pixels + gezichtskader (voor schaal en positie).
  function faceInfo(face, W, H){
    if (!face) return null;
    function P(i){ return {x: face[i].x * W, y: face[i].y * H}; }
    var iris = (dist(P(469), P(471)) + dist(P(474), P(476))) / 2;
    var eR = P(33), eL = P(263), fl = P(234), fr = P(454), nose = P(1), top = P(10), chin = P(152);
    return {
      P: P, iris: iris,
      roll: Math.abs(Math.atan2(eL.y - eR.y, Math.abs(eL.x - eR.x))) * 180 / Math.PI,
      yaw: Math.abs(nose.x - (fl.x + fr.x) / 2) / Math.max(1, Math.abs(fr.x - fl.x)),
      cx: (fl.x + fr.x) / 2, cy: (top.y + chin.y) / 2, w: Math.abs(fr.x - fl.x), h: Math.abs(chin.y - top.y)
    };
  }

  // Modellen worden pas geladen als een klant de camerameting start, en alleen de modellen die die scanner nodig heeft.
  var VISION = null, MODEL = {};
  function loadModels(sc, needed){
    function vision(){
      if (!VISION) {
        VISION = import(sc.libBase + '/vision_bundle.mjs').then(function(v){
          return v.FilesetResolver.forVisionTasks(sc.libBase + '/wasm').then(function(fs){ return {v: v, fs: fs}; });
        });
        VISION.catch(function(){ VISION = null; });
      }
      return VISION;
    }
    function make(Cls, fs, opts){
      return Cls.createFromOptions(fs, Object.assign({}, opts, {baseOptions: {modelAssetPath: opts.path, delegate: 'GPU'}}))
        .catch(function(){ return Cls.createFromOptions(fs, Object.assign({}, opts, {baseOptions: {modelAssetPath: opts.path, delegate: 'CPU'}})); });
    }
    function one(key){
      if (!MODEL[key]) {
        MODEL[key] = vision().then(function(x){
          var v = x.v, fs = x.fs, url = sc.models[key];
          if (key === 'face') return make(v.FaceLandmarker, fs, {path: url, runningMode: 'VIDEO', numFaces: 1});
          if (key === 'pose') return make(v.PoseLandmarker, fs, {path: url, runningMode: 'VIDEO', numPoses: 1});
          if (key === 'hand') return make(v.HandLandmarker, fs, {path: url, runningMode: 'VIDEO', numHands: 1});
          if (key === 'seg') return make(v.ImageSegmenter, fs, {path: url, runningMode: 'VIDEO', outputCategoryMask: true, outputConfidenceMasks: false});
          throw new Error('onbekend model ' + key);
        });
        MODEL[key].catch(function(){ MODEL[key] = null; });
      }
      return MODEL[key];
    }
    return Promise.all(needed.map(one)).then(function(list){
      var out = {};
      needed.forEach(function(k, i){ out[k] = list[i]; });
      if (out.seg) {
        var labels = [];
        try { labels = out.seg.getLabels() || []; } catch(e){}
        var i = labels.map(norm).indexOf('body-skin');
        out.skinIndex = i >= 0 ? i : 2;   // selfie_multiclass: 0 achtergrond, 1 haar, 2 huid lichaam, 3 huid gezicht, 4 kleding, 5 overig
      }
      return out;
    });
  }

  function dashed(ctx, W){ ctx.lineWidth = Math.max(3, W / 200); ctx.setLineDash([ctx.lineWidth * 3, ctx.lineWidth * 2.5]); }

  /* ---------- scanners ----------
     Elke scanner: models, title/tips (tekst of functie van opts), views[{key,title,intro,checks}],
     measure(frame, viewKey, W, H, opts) -> {ok, checks, msg, value}, guide(), draw(),
     combine(waarden per aanzicht, kalibratie) -> cm, maxSpread (in de eenheid van value). */
  var SCANNERS = {
    'neck-height': {
      models: ['face', 'pose'],
      title: 'Meet je nekhoogte met je camera',
      tips: [
        'Houd je telefoon rechtop op ooghoogte, ongeveer een armlengte van je af.',
        'Zorg dat je gezicht en allebei je schouders in beeld zijn.',
        'Haar weg van je hals; geen sjaal of hoge kraag.',
        'Kijk recht vooruit en houd je hoofd een paar seconden stil.'
      ],
      views: [{key: 'front', title: 'Plaats je hoofd en schouders in de lijnen', checks: [
        {key: 'face', label: 'Gezicht'}, {key: 'dist', label: 'Afstand'}, {key: 'level', label: 'Hoofd recht'}, {key: 'shoulders', label: 'Schouders'}]}],
      maxSpread: 1.0,
      measure: function(frame, view, W, H){
        var face = frame.face, pose = frame.pose;
        var c = {face: false, dist: false, level: false, shoulders: false}, msgs = [];
        var hasPose = !!(pose && pose[11] && pose[12] && (pose[11].visibility || 0) >= 0.5 && (pose[12].visibility || 0) >= 0.5);
        var sL = hasPose ? {x: pose[11].x * W, y: pose[11].y * H} : null, sR = hasPose ? {x: pose[12].x * W, y: pose[12].y * H} : null;
        var f = faceInfo(face, W, H);
        if (f) {
          c.face = true;
          c.level = f.roll <= 5 && f.yaw <= 0.07;
          if (!c.level) msgs.push(f.roll > 5 ? 'Houd je hoofd recht.' : 'Kijk recht in de camera.');
        } else msgs.push('We zien je gezicht nog niet. Kijk recht in de camera.');
        var tooFar = f && f.iris < 8, tooClose = hasPose && Math.max(sL.y, sR.y) > H * 0.97;
        c.dist = !!f && !tooFar && !tooClose && hasPose;
        if (tooFar) msgs.unshift('Kom iets dichterbij met je telefoon.');
        else if (tooClose) msgs.unshift('Houd je telefoon iets verder van je af.');
        c.shoulders = hasPose;
        if (!hasPose) msgs.push('Zorg dat allebei je schouders in beeld zijn.');
        if (!(c.face && c.dist && c.level && c.shoulders)) return {ok: false, checks: c, msg: msgs[0] || 'Kijk recht in de camera.'};
        var jL = f.P(172), jR = f.P(397);
        var jawY = (jL.y + jR.y) / 2, shY = (sL.y + sR.y) / 2, px = shY - jawY;
        if (px <= 0) return {ok: false, checks: c, msg: 'Kijk recht in de camera.'};
        return {ok: true, checks: c, value: px * (IRIS_MM / f.iris) / 10, jawL: jL, jawR: jR, shL: sL, shR: sR, jawY: jawY, shY: shY};
      },
      combine: function(v, cal){ return v[0] * (cal.factor || 1) + (cal.offset || 0); },
      guide: function(ctx, W, H, ok){
        ctx.save(); ctx.strokeStyle = ok ? 'rgba(85,185,52,.95)' : 'rgba(255,255,255,.75)'; dashed(ctx, W);
        ctx.beginPath(); ctx.ellipse(W / 2, H * 0.36, W * 0.17, H * 0.19, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W * 0.12, H * 0.92); ctx.quadraticCurveTo(W * 0.2, H * 0.68, W * 0.42, H * 0.64);
        ctx.moveTo(W * 0.88, H * 0.92); ctx.quadraticCurveTo(W * 0.8, H * 0.68, W * 0.58, H * 0.64); ctx.stroke();
        ctx.restore();
      },
      draw: function(ctx, r, W){
        function mx(x){ return W - x; }   // video wordt gespiegeld getoond
        ctx.save(); ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = Math.max(2, W / 320);
        ctx.beginPath(); ctx.moveTo(mx(r.jawL.x), r.jawL.y); ctx.lineTo(mx(r.jawR.x), r.jawR.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx(r.shL.x), r.shL.y); ctx.lineTo(mx(r.shR.x), r.shR.y); ctx.stroke();
        var x = mx((r.jawL.x + r.jawR.x) / 2);
        ctx.strokeStyle = A; ctx.lineWidth = Math.max(4, W / 180); ctx.setLineDash([ctx.lineWidth * 1.5, ctx.lineWidth * 1.5]);
        ctx.beginPath(); ctx.moveTo(x, r.jawY); ctx.lineTo(x, r.shY); ctx.stroke();
        ctx.restore();
      }
    }
  };

  /* ---------- sjablonen per lichaamsdeel ----------
     Een sjabloon bevat alles wat voor een productgroep gelijk is: wat je meet,
     de teksten, pictogrammen en grenzen. Het CMS-blokje per maattabel geeft
     alleen nog de koppelingen (mappings) met de cm-bereiken mee, en kan elk
     onderdeel overschrijven. Metingen die geen enkele koppeling gebruikt,
     worden niet gevraagd. */
  var TEMPLATES = {
    pols: {
      productName: 'polsbrace',
      order: ['kant', 'omvang', 'hand', 'handlengte', 'handbreedte'],
      choices: {
        kant: {
          title: 'Voor welke pols is de brace?', attribute: 'side', resultLabel: 'Kant', illustration: 'wrist',
          options: [
            {value: 'Links',  label: 'Linkerpols',  short: 'Links',  icon: 'hand-left'},
            {value: 'Rechts', label: 'Rechterpols', short: 'Rechts', icon: 'hand-right'}
          ]
        }
      },
      measures: {
        omvang: {
          title: 'Meet de omvang van je pols',
          text: 'Leg het meetlint om je pols, net boven het uitstekende botje aan de zijkant. Niet strak trekken.',
          label: 'polsomvang', short: 'Pols', illustration: 'wrist-circumference', min: 10, max: 30
        },
        hand: {
          title: 'Meet de omvang van je hand',
          text: 'Meet rondom je handpalm, op de grote knokkels waar je vingers beginnen (die zie je bovenop je hand als je een vuist maakt). Dus niet om je vingers zelf. Je duim laat je erbuiten. Niet strak trekken.',
          label: 'handomvang', short: 'Hand', illustration: 'wrist-hand', min: 12, max: 32
        },
        handlengte: {
          title: 'Meet de lengte van je hand',
          text: 'Leg je hand plat op tafel. Meet van de plooi bij je pols tot het topje van je middelvinger.',
          label: 'handlengte', short: 'Handlengte', illustration: 'wrist-handlength', min: 10, max: 26
        },
        handbreedte: {
          title: 'Meet de breedte van je hand',
          text: 'Leg je hand plat op tafel met de binnenkant naar boven. Meet de breedte van je handpalm, net onder je vingers. Je duim telt niet mee.',
          label: 'handbreedte', short: 'Handbreedte', illustration: 'wrist-handwidth', min: 5, max: 15
        }
      }
    },
    vinger: {
      // Vinger- en duimspalken: omvang van de vinger (op de plek van de spalk, of bij het DIP-/PIP-gewricht) of de lengte.
      productName: 'vingerspalk',
      order: ['omvang', 'dip', 'pip', 'lengte'],
      measures: {
        omvang: {title: 'Meet de omvang van je vinger', label: 'vingeromvang', short: 'Vinger', illustration: 'wrist-finger-mid', min: 3, max: 12,
                 text: 'Meet rondom je vinger, in het midden van de plek waar de spalk moet komen. Dat kan ook een andere plek zijn dan op het plaatje. Gebruik een smal strookje papier en meet dat na met een liniaal.'},
        dip: {title: 'Meet de omvang van je vingertopgewricht', label: 'omvang van het vingertopgewricht', short: 'DIP-gewricht', illustration: 'wrist-finger-dip', min: 3, max: 12,
              text: 'Meet rondom het bovenste gewricht van je vinger, tussen het middelste en het bovenste kootje (het DIP-gewricht). Gebruik een smal strookje papier en meet dat na met een liniaal.'},
        pip: {title: 'Meet de omvang van je middelste vingergewricht', label: 'omvang van het middelste vingergewricht', short: 'PIP-gewricht', illustration: 'wrist-finger-pip', min: 3, max: 12,
              text: 'Meet rondom het middelste gewricht van je vinger (het PIP-gewricht). Gebruik een smal strookje papier en meet dat na met een liniaal.'},
        lengte: {title: 'Meet de lengte van je vinger', label: 'vingerlengte', short: 'Lengte', illustration: 'wrist-finger-length', min: 2, max: 12,
                 text: 'Meet de lengte van de vinger waarvoor je de spalk nodig hebt, aan de binnenkant van de hand: van de plooi onderaan je vinger tot het topje.'}
      }
    },
    duim: {
      // Duimbrace: omvang van de pols, van de hand (zonder duim, onder de knokkels) of van de duim zelf.
      productName: 'duimbrace',
      order: ['kant', 'omvang', 'hand', 'duim'],
      choices: {
        kant: {
          title: 'Voor welke hand is de duimbrace?', attribute: 'side', resultLabel: 'Kant', illustration: 'wrist',
          options: [
            {value: 'Links',  label: 'Linkerhand',  short: 'Links',  icon: 'hand-left'},
            {value: 'Rechts', label: 'Rechterhand', short: 'Rechts', icon: 'hand-right'}
          ]
        }
      },
      measures: {
        omvang: {
          title: 'Meet de omvang van je pols',
          text: 'Leg het meetlint om je pols, net boven het uitstekende botje aan de zijkant. Niet strak trekken.',
          label: 'polsomvang', short: 'Pols', illustration: 'wrist-circumference', min: 10, max: 30
        },
        hand: {
          title: 'Meet de omvang van je hand',
          text: 'Meet rondom je handpalm, op de grote knokkels waar je vingers beginnen (die zie je bovenop je hand als je een vuist maakt). Dus niet om je vingers zelf. Je duim laat je erbuiten. Niet strak trekken.',
          label: 'handomvang', short: 'Hand', illustration: 'wrist-hand', min: 12, max: 32
        },
        duim: {
          title: 'Meet de omvang van je duim',
          text: 'Leg het meetlint om het midden van je duim. Niet strak trekken.',
          label: 'duimomvang', short: 'Duim', illustration: 'wrist-thumb', min: 3, max: 12
        }
      }
    },
    elleboog: {
      // Elleboog: omvang over het gewricht, de onderarm (x cm onder de elleboog of op het breedste punt) of de bovenarm.
      productName: 'elleboogbrace',
      order: ['kant', 'oksel', 'bovenarm', 'elleboog', 'onderarm', 'onderarmBreed', 'pols', 'armlengte'],
      choices: {
        kant: {title: 'Voor welke arm is de brace?', attribute: 'side', resultLabel: 'Kant',
               options: [{value: 'Links', label: 'Linkerarm', short: 'Links'}, {value: 'Rechts', label: 'Rechterarm', short: 'Rechts'}]}
      },
      measures: {
        elleboog: {title: 'Meet de omvang van je elleboog', label: 'elleboogomvang', short: 'Elleboog', min: 15, max: 45,
                   text: 'Houd je arm gestrekt en ontspannen. Meet rondom over het midden van je elleboog. Niet strak trekken.'},
        onderarm: {title: 'Meet de omvang van je onderarm', label: 'onderarmomvang', short: 'Onderarm', min: 12, max: 45, dist: 5,
                   text: 'Houd je arm gestrekt en ontspannen. Meet 5 cm onder je elleboog rondom je onderarm. Niet strak trekken.'},
        onderarmBreed: {title: 'Meet de omvang van je onderarm', label: 'onderarmomvang', short: 'Onderarm (breedste punt)', min: 12, max: 45,
                   text: 'Houd je arm ontspannen. Meet rondom je onderarm op het breedste punt, net onder je elleboog. Niet strak trekken.'},
        bovenarm: {title: 'Meet de omvang van je bovenarm', label: 'bovenarmomvang', short: 'Bovenarm', min: 15, max: 60,
                   text: 'Laat je arm ontspannen hangen. Meet rondom je bovenarm, halverwege tussen schouder en elleboog (over je biceps). Niet strak trekken.'},
        oksel: {title: 'Meet de omvang van je bovenarm bij je oksel', label: 'bovenarmomvang bij de oksel', short: 'Bovenarm (oksel)', min: 15, max: 65,
                   text: 'Houd je arm dicht tegen je lichaam. Meet rondom je bovenarm, net onder je oksel. Niet strak trekken.'},
        pols: {title: 'Meet de omvang van je pols', label: 'polsomvang', short: 'Pols', min: 10, max: 30,
                   text: 'Leg het meetlint om je pols, net boven het uitstekende botje aan de zijkant. Niet strak trekken.'},
        armlengte: {title: 'Meet de lengte van je arm', label: 'armlengte', short: 'Armlengte', min: 25, max: 80,
                   text: 'Houd je arm gestrekt langs je lichaam. Meet van net onder je oksel tot je pols.'}
      }
    },
    been: {
      // Been: sleeves en braces voor dij en kuit, compressiebroeken (meetpunten langs het hele been).
      productName: 'brace',
      order: ['kant', 'dijBoven', 'dijDik', 'dijMidden', 'dijOnder', 'kuit', 'beenlengte', 'taille'],
      choices: {
        kant: {title: 'Voor welk been is het?', attribute: 'side', resultLabel: 'Kant',
               options: [{value: 'Links', label: 'Linkerbeen', short: 'Links'}, {value: 'Rechts', label: 'Rechterbeen', short: 'Rechts'}]}
      },
      measures: {
        dijBoven: {title: 'Meet de omvang van je bovenbeen bij je bil', label: 'bovenbeenomvang bij de bilplooi', short: 'Bovenbeen boven', min: 30, max: 100,
                   text: 'Sta rechtop. Meet rondom je bovenbeen, net onder je bilplooi. Niet strak trekken.'},
        dijDik: {title: 'Meet de omvang van je bovenbeen', label: 'bovenbeenomvang', short: 'Bovenbeen', min: 25, max: 100,
                   text: 'Sta rechtop. Meet rondom het dikste deel van je bovenbeen. Niet strak trekken.'},
        dijMidden: {title: 'Meet de omvang van je bovenbeen', label: 'omvang midden bovenbeen', short: 'Midden bovenbeen', min: 25, max: 100,
                   text: 'Sta rechtop. Meet rondom je bovenbeen, halverwege tussen je knie en je lies. Niet strak trekken.'},
        dijOnder: {title: 'Meet de omvang van je bovenbeen boven je knie', label: 'bovenbeenomvang boven de knie', short: 'Boven knie', min: 20, max: 80, dist: 2,
                   text: 'Sta rechtop. Meet rondom je bovenbeen, 2 cm boven je knieschijf. Niet strak trekken.'},
        kuit: {title: 'Meet de omvang van je kuit', label: 'kuitomvang', short: 'Kuit', min: 20, max: 70,
                   text: 'Sta rechtop. Meet rondom het breedste (volste) deel van je kuit. Niet strak trekken.'},
        beenlengte: {title: 'Meet de lengte van je bovenbeen', label: 'lengte van je bovenbeen', short: 'Lengte', min: 10, max: 50,
                   text: 'Meet langs de buitenkant van je bovenbeen de afstand tussen de twee meetpunten: van net boven je knie tot net onder je bilplooi.'},
        taille: {title: 'Meet de omvang van je taille', label: 'tailleomvang', short: 'Taille', min: 40, max: 180,
                   text: 'Sta rechtop met een ontspannen buik. Meet rondom het smalste deel van je taille. Houd het meetlint recht.'}
      }
    },
    romp: {
      // Romp: borst, onder de borst, taille, buik, heup, bekken, bovenarm, schouderbreedte, onderarmlengte, lichaamslengte.
      // Dezelfde meetpunten onder de namen schouder, mitella, rug, bekken en borst (andere productnaam en keuzevraag).
      productName: 'brace',
      order: ['kant', 'lichaamslengte', 'borst', 'onderBorst', 'borstSchouder', 'bovenarm', 'schouderbreedte', 'taille', 'buik', 'heup', 'bekken', 'onderarmlengte'],
      measures: {
        borst: {title: 'Meet de omvang van je borst', label: 'borstomvang', short: 'Borst', min: 50, max: 160,
                text: 'Sta rechtop en adem rustig uit. Meet rondom het volste deel van je borstkas, onder je oksels door. Houd het meetlint recht (evenwijdig aan de grond).'},
        onderBorst: {title: 'Meet de omvang onder je borst', label: 'omvang onder de borst', short: 'Onder borst', min: 45, max: 160,
                text: 'Sta rechtop en adem rustig uit. Meet rondom je lichaam, direct onder je borst. Houd het meetlint recht.'},
        borstSchouder: {title: 'Meet de omvang over je schouder', label: 'omvang over schouder en borst', short: 'Schouder-borst', min: 60, max: 170,
                text: 'Leg het meetlint over de schouder die je wilt ondersteunen, schuin over je borst en onder je andere oksel door, en weer terug naar je schouder.'},
        bovenarm: {title: 'Meet de omvang van je bovenarm', label: 'bovenarmomvang', short: 'Bovenarm', min: 15, max: 60,
                text: 'Laat je arm ontspannen hangen. Meet rondom je bovenarm, halverwege tussen schouder en elleboog (over je biceps). Niet strak trekken.'},
        schouderbreedte: {title: 'Meet de breedte van je schouders', label: 'schouderbreedte', short: 'Schouderbreedte', min: 15, max: 100,
                text: 'Laat iemand anders meten: van het uiteinde van je ene schouder over je rug naar het uiteinde van je andere schouder.'},
        taille: {title: 'Meet de omvang van je taille', label: 'tailleomvang', short: 'Taille', min: 40, max: 180,
                text: 'Sta rechtop en adem rustig uit. Meet rondom je middel, ter hoogte van je navel. Niet strak trekken.'},
        buik: {title: 'Meet de omvang van je buik', label: 'buikomvang', short: 'Buik', min: 40, max: 200,
                text: 'Sta rechtop en adem rustig uit. Meet rondom het breedste deel van je buik. Niet strak trekken.'},
        heup: {title: 'Meet de omvang van je heupen', label: 'heupomvang', short: 'Heup', min: 50, max: 200,
                text: 'Sta rechtop met je voeten tegen elkaar. Meet rondom het breedste deel van je heupen en billen.'},
        bekken: {title: 'Meet de omvang van je bekken', label: 'bekkenomvang', short: 'Bekken', min: 50, max: 200,
                text: 'Sta rechtop. Meet rondom je bekken, ter hoogte van de uitstekende heupbotten aan de zijkant, tussen je taille en je heupen in.'},
        onderarmlengte: {title: 'Meet de lengte van je onderarm', label: 'onderarmlengte', short: 'Onderarm', min: 8, max: 60,
                text: 'Buig je elleboog in een hoek van 90 graden en maak een vuist. Meet van de achterkant van je elleboog tot je knokkels.'},
        lichaamslengte: {title: 'Wat is je lichaamslengte?', label: 'lichaamslengte', short: 'Lengte', min: 90, max: 220,
                text: 'Vul je lengte in centimeters in, zonder schoenen.'}
      }
    },
    nek: {
      productName: 'nekbrace',
      order: ['omtrek', 'hoogte'],
      measures: {
        omtrek: {
          title: 'Meet de omtrek van je nek',
          text: 'Leg het meetlint achter in je nek en meet rondom over je adamsappel. Niet strak trekken.',
          label: 'nekomtrek', short: 'Nekomtrek', illustration: 'neck-circumference', min: 20, max: 60
        },
        hoogte: {
          title: 'Meet de hoogte van je nek',
          text: 'Houd je hoofd rechtop en meet aan de zijkant van je kaak tot je sleutelbeen.',
          label: 'nekhoogte', short: 'Nekhoogte', illustration: 'neck-height', min: 3, max: 20,
          scan: {type: 'neck-height', devices: 'mobile', calibration: {factor: 1, offset: 0}}
        }
      },
      scanner: {
        libBase: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1',
        models: {
          face: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          pose: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task'
        }
      }
    },
    // Medische steunkousen: meetpunten volgens de gangbare indeling (cB, cC, cD, cG, cH, lD, lG).
    steunkous: {
      productName: 'steunkous',
      intro: {title: 'Vind je maat in een paar stappen'},
      order: ['lichaamslengte', 'gewicht', 'schoenmaat', 'enkel', 'hielWreef', 'kuit', 'onderKnie', 'dij', 'heup', 'lengteKuit', 'lengteKnie', 'lengteKruis'],
      measures: {
        enkel: {
          title: 'Meet de omvang van je enkel',
          text: 'Meet op het smalste punt, net boven je enkelbotjes. Meet bij voorkeur ’s ochtends, als je benen nog niet opgezet zijn.',
          label: 'enkelomvang', short: 'Enkel', illustration: 'leg-cB', min: 12, max: 45
        },
        kuit: {
          title: 'Meet de omvang van je kuit',
          text: 'Meet op het dikste punt van je kuit. Sta rechtop, met je gewicht op beide benen.',
          label: 'kuitomvang', short: 'Kuit', illustration: 'leg-cC', min: 12, max: 75
        },
        onderKnie: {
          title: 'Meet de omvang net onder je knie',
          text: 'Meet ongeveer twee vingers breed onder je knieholte.',
          label: 'omvang onder de knie', short: 'Onder knie', illustration: 'leg-cD', min: 20, max: 75
        },
        dij: {
          title: 'Meet de omvang van je bovenbeen',
          text: 'Meet ongeveer 5 cm onder je kruis, rondom je bovenbeen.',
          label: 'dijomvang', short: 'Dij', illustration: 'leg-cG', min: 30, max: 110
        },
        heup: {
          title: 'Meet de omvang van je heupen',
          text: 'Meet rondom over het breedste punt van je heupen en billen.',
          label: 'heupomvang', short: 'Heup', illustration: 'leg-cH', min: 60, max: 190
        },
        lengteKnie: {
          title: 'Meet je beenlengte tot de knie',
          text: 'Zet je voet plat op de grond. Meet aan de zijkant van de vloer tot net onder je knie.',
          label: 'beenlengte tot de knie', short: 'Lengte knie', illustration: 'leg-lD', min: 25, max: 65
        },
        lengteKruis: {
          title: 'Meet je beenlengte tot je kruis',
          text: 'Sta rechtop met je voet plat op de grond. Meet aan de binnenkant van je been van de vloer tot je kruis.',
          label: 'beenlengte tot het kruis', short: 'Lengte kruis', illustration: 'leg-lG', min: 50, max: 105
        },
        lichaamslengte: {title: 'Wat is je lichaamslengte?', label: 'lichaamslengte', short: 'Lengte', min: 120, max: 220, illustration: 'leg-lG',
          text: 'Vul je lengte in centimeters in, zonder schoenen.'},
        gewicht: {title: 'Wat is je lichaamsgewicht?', label: 'lichaamsgewicht', short: 'Gewicht', unit: 'kg', min: 30, max: 250, illustration: 'leg',
          text: 'Vul je gewicht in kilo in.', recheck: 'Controleer je gewicht.'},
        lengteKuit: {
          title: 'Meet de lengte van je kuit',
          text: 'Meet aan de zijkant van je been de afstand tussen het smalste punt boven je enkel en het breedste punt van je kuit.',
          label: 'lengte van je kuit', short: 'Lengte kuit', illustration: 'leg-lD', min: 10, max: 60
        }
      }
    },
    knie: {
      // Knie: omvang rond de knieschijf, bovenbeen en onderbeen (standaard 15 cm boven/onder; "afstand: 10" past tekst + pictogram aan).
      productName: 'kniebrace',
      order: ['kant', 'knie', 'boven', 'onder', 'onderKnie', 'kniebreedte'],
      svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M84 0C86 38 91 72 94 90C95.5 100 94.5 108 95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C145.5 108 144.5 100 146 90C149 72 154 38 156 0Z" fill="#cfe4ee"/><path d="M95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C136 122 104 122 95.5 116Z" fill="#bcd8e5" opacity=".45"/><ellipse cx="120" cy="99" rx="14" ry="17" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M103 84c4-4 9-6 17-6s13 2 17 6M104 118c5 3 10 4 16 4s11-1 16-4" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/></svg>',
      choices: {
        kant: {title: 'Voor welke knie is de brace?', attribute: 'side', resultLabel: 'Kant',
               options: [{value: 'Links', label: 'Linkerknie', short: 'Links'}, {value: 'Rechts', label: 'Rechterknie', short: 'Rechts'}]}
      },
      measures: {
        knie: {title: 'Meet de omvang van je knie', label: 'knieomvang', short: 'Knie', min: 15, max: 75,
               text: 'Sta rechtop met je knie licht gebogen en je gewicht op beide benen. Meet rondom over het midden van je knieschijf. Niet strak trekken.',
               svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M84 0C86 38 91 72 94 90C95.5 100 94.5 108 95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C145.5 108 144.5 100 146 90C149 72 154 38 156 0Z" fill="#cfe4ee"/><path d="M95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C136 122 104 122 95.5 116Z" fill="#bcd8e5" opacity=".45"/><ellipse cx="120" cy="99" rx="14" ry="17" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M103 84c4-4 9-6 17-6s13 2 17 6M104 118c5 3 10 4 16 4s11-1 16-4" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M93.5 95Q120 90.2 146.5 95" stroke="#2399c7" stroke-width="6" fill="none" opacity=".28"/><g transform="translate(145.5 99) rotate(60)"><rect x="0" y="-4" width="30" height="8" rx="1.2" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="4" y1="-3.2" x2="4" y2="-1.2000000000000002"/><line x1="7.5" y1="-3.2" x2="7.5" y2="0.20000000000000018"/><line x1="11" y1="-3.2" x2="11" y2="-1.2000000000000002"/><line x1="14.5" y1="-3.2" x2="14.5" y2="0.20000000000000018"/><line x1="18" y1="-3.2" x2="18" y2="-1.2000000000000002"/><line x1="21.5" y1="-3.2" x2="21.5" y2="0.20000000000000018"/><line x1="25" y1="-3.2" x2="25" y2="-1.2000000000000002"/></g><rect x="27" y="-5" width="5" height="10" rx="1.2" fill="#1a7ba3"/></g><path d="M93.5 95Q120 101 146.5 95L146.5 103Q120 109 93.5 103Z" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="97.9" y1="96.7" x2="97.9" y2="98.7"/><line x1="102.3" y1="97.5" x2="102.3" y2="101.1"/><line x1="106.8" y1="98.0" x2="106.8" y2="100.0"/><line x1="111.2" y1="98.5" x2="111.2" y2="102.1"/><line x1="115.6" y1="98.7" x2="115.6" y2="100.7"/><line x1="120.0" y1="98.8" x2="120.0" y2="102.4"/><line x1="124.4" y1="98.7" x2="124.4" y2="100.7"/><line x1="128.8" y1="98.5" x2="128.8" y2="102.1"/><line x1="133.3" y1="98.0" x2="133.3" y2="100.0"/><line x1="137.7" y1="97.5" x2="137.7" y2="101.1"/><line x1="142.1" y1="96.7" x2="142.1" y2="98.7"/></g><circle class="akh-maat__pulse" cx="120" cy="107.5" r="3.6" fill="#12263A"/></svg>'},
        boven: {title: 'Meet de omvang van je bovenbeen', label: 'bovenbeenomvang', short: 'Bovenbeen', min: 30, max: 95,
                text: 'Sta rechtop met je knie licht gebogen en je gewicht op beide benen. Meet 15 cm boven het midden van je knieschijf rondom je bovenbeen. Niet strak trekken.',
                svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M84 0C86 38 91 72 94 90C95.5 100 94.5 108 95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C145.5 108 144.5 100 146 90C149 72 154 38 156 0Z" fill="#cfe4ee"/><path d="M95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C136 122 104 122 95.5 116Z" fill="#bcd8e5" opacity=".45"/><ellipse cx="120" cy="99" rx="14" ry="17" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M103 84c4-4 9-6 17-6s13 2 17 6M104 118c5 3 10 4 16 4s11-1 16-4" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M134 99H180" stroke="#12263A" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M176 96V49" stroke="#12263A" stroke-width="1.6"/><path d="M172 53L176 46L180 53M172 92L176 99L180 92" stroke="#12263A" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="184" y="76.5" font-size="12" font-weight="700" fill="#12263A" font-family="inherit">15 cm</text><path d="M88 40Q120 34.4 152 40" stroke="#2399c7" stroke-width="6" fill="none" opacity=".28"/><g transform="translate(151 44) rotate(60)"><rect x="0" y="-4" width="30" height="8" rx="1.2" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="4" y1="-3.2" x2="4" y2="-1.2000000000000002"/><line x1="7.5" y1="-3.2" x2="7.5" y2="0.20000000000000018"/><line x1="11" y1="-3.2" x2="11" y2="-1.2000000000000002"/><line x1="14.5" y1="-3.2" x2="14.5" y2="0.20000000000000018"/><line x1="18" y1="-3.2" x2="18" y2="-1.2000000000000002"/><line x1="21.5" y1="-3.2" x2="21.5" y2="0.20000000000000018"/><line x1="25" y1="-3.2" x2="25" y2="-1.2000000000000002"/></g><rect x="27" y="-5" width="5" height="10" rx="1.2" fill="#1a7ba3"/></g><path d="M88 40Q120 47 152 40L152 48Q120 55 88 48Z" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="92.6" y1="41.7" x2="92.6" y2="43.7"/><line x1="97.1" y1="42.5" x2="97.1" y2="46.1"/><line x1="101.7" y1="43.2" x2="101.7" y2="45.2"/><line x1="106.3" y1="43.7" x2="106.3" y2="47.3"/><line x1="110.9" y1="44.0" x2="110.9" y2="46.0"/><line x1="115.4" y1="44.2" x2="115.4" y2="47.8"/><line x1="120.0" y1="44.3" x2="120.0" y2="46.3"/><line x1="124.6" y1="44.2" x2="124.6" y2="47.8"/><line x1="129.1" y1="44.0" x2="129.1" y2="46.0"/><line x1="133.7" y1="43.7" x2="133.7" y2="47.3"/><line x1="138.3" y1="43.2" x2="138.3" y2="45.2"/><line x1="142.9" y1="42.5" x2="142.9" y2="46.1"/><line x1="147.4" y1="41.7" x2="147.4" y2="43.7"/></g><circle class="akh-maat__pulse" cx="120" cy="53.5" r="3.6" fill="#12263A"/></svg>'},
        onder: {title: 'Meet de omvang van je kuit', label: 'kuitomvang', short: 'Kuit', min: 20, max: 75,
                text: 'Sta rechtop met je knie licht gebogen en je gewicht op beide benen. Meet 15 cm onder het midden van je knieschijf rondom je kuit. Niet strak trekken.',
                svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M84 0C86 38 91 72 94 90C95.5 100 94.5 108 95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C145.5 108 144.5 100 146 90C149 72 154 38 156 0Z" fill="#cfe4ee"/><path d="M95.5 116C89 136 87 160 93 200H147C153 160 151 136 144.5 116C136 122 104 122 95.5 116Z" fill="#bcd8e5" opacity=".45"/><ellipse cx="120" cy="99" rx="14" ry="17" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M103 84c4-4 9-6 17-6s13 2 17 6M104 118c5 3 10 4 16 4s11-1 16-4" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M134 99H180" stroke="#12263A" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M176 102V149" stroke="#12263A" stroke-width="1.6"/><path d="M172 145L176 152L180 145M172 106L176 99L180 106" stroke="#12263A" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="184" y="129.5" font-size="12" font-weight="700" fill="#12263A" font-family="inherit">15 cm</text><path d="M89.5 150Q120 145.2 150.5 150" stroke="#2399c7" stroke-width="6" fill="none" opacity=".28"/><g transform="translate(149.5 154) rotate(60)"><rect x="0" y="-4" width="30" height="8" rx="1.2" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="4" y1="-3.2" x2="4" y2="-1.2000000000000002"/><line x1="7.5" y1="-3.2" x2="7.5" y2="0.20000000000000018"/><line x1="11" y1="-3.2" x2="11" y2="-1.2000000000000002"/><line x1="14.5" y1="-3.2" x2="14.5" y2="0.20000000000000018"/><line x1="18" y1="-3.2" x2="18" y2="-1.2000000000000002"/><line x1="21.5" y1="-3.2" x2="21.5" y2="0.20000000000000018"/><line x1="25" y1="-3.2" x2="25" y2="-1.2000000000000002"/></g><rect x="27" y="-5" width="5" height="10" rx="1.2" fill="#1a7ba3"/></g><path d="M89.5 150Q120 156 150.5 150L150.5 158Q120 164 89.5 158Z" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="93.9" y1="151.6" x2="93.9" y2="153.6"/><line x1="98.2" y1="152.3" x2="98.2" y2="155.9"/><line x1="102.6" y1="152.8" x2="102.6" y2="154.8"/><line x1="106.9" y1="153.2" x2="106.9" y2="156.8"/><line x1="111.3" y1="153.6" x2="111.3" y2="155.6"/><line x1="115.6" y1="153.7" x2="115.6" y2="157.3"/><line x1="120.0" y1="153.8" x2="120.0" y2="155.8"/><line x1="124.4" y1="153.7" x2="124.4" y2="157.3"/><line x1="128.7" y1="153.6" x2="128.7" y2="155.6"/><line x1="133.1" y1="153.2" x2="133.1" y2="156.8"/><line x1="137.4" y1="152.8" x2="137.4" y2="154.8"/><line x1="141.8" y1="152.3" x2="141.8" y2="155.9"/><line x1="146.1" y1="151.6" x2="146.1" y2="153.6"/></g><circle class="akh-maat__pulse" cx="120" cy="162.5" r="3.6" fill="#12263A"/></svg>'}
      }
    },
    enkel: {
      // Enkel: omvang net boven de enkelbotjes, of over hiel en wreef.
      productName: 'enkelbrace',
      order: ['kant', 'omvang', 'hielWreef', 'voetMidden', 'voetlengte', 'voetBal', 'hielBreedte', 'schoenmaat'],
      svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98 0C99 50 99 95 99 116C99 132 90 146 88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C205 161 196 157 184 154C164 148 148 139 142 127C139 117 137 99 137 80V0Z" fill="#cfe4ee"/><path d="M88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C175 172 120 171 88 160Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="117" cy="140" rx="6.5" ry="5.5" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M197 159c4 1 6 4 6 7" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M104 112c4 2 10 3 16 2" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/></svg>',
      choices: {
        kant: {title: 'Voor welke enkel is de brace?', attribute: 'side', resultLabel: 'Kant',
               options: [{value: 'Links', label: 'Linkerenkel', short: 'Links'}, {value: 'Rechts', label: 'Rechterenkel', short: 'Rechts'}]}
      },
      measures: {
        omvang: {title: 'Meet de omvang van je enkel', label: 'enkelomvang', short: 'Enkel', min: 10, max: 45,
                 text: 'Meet rondom je enkel, net boven de enkelbotjes. Niet strak trekken.',
                 svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98 0C99 50 99 95 99 116C99 132 90 146 88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C205 161 196 157 184 154C164 148 148 139 142 127C139 117 137 99 137 80V0Z" fill="#cfe4ee"/><path d="M88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C175 172 120 171 88 160Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="117" cy="140" rx="6.5" ry="5.5" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M197 159c4 1 6 4 6 7" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M104 112c4 2 10 3 16 2" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M98.5 114Q118 109.84 137.5 114" stroke="#2399c7" stroke-width="5" fill="none" opacity=".28"/><g transform="translate(136.5 118) rotate(55)"><rect x="0" y="-3.5" width="30" height="7" rx="1.2" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="4" y1="-2.7" x2="4" y2="-0.7000000000000002"/><line x1="7.5" y1="-2.7" x2="7.5" y2="0.7000000000000002"/><line x1="11" y1="-2.7" x2="11" y2="-0.7000000000000002"/><line x1="14.5" y1="-2.7" x2="14.5" y2="0.7000000000000002"/><line x1="18" y1="-2.7" x2="18" y2="-0.7000000000000002"/><line x1="21.5" y1="-2.7" x2="21.5" y2="0.7000000000000002"/><line x1="25" y1="-2.7" x2="25" y2="-0.7000000000000002"/></g><rect x="27" y="-4.5" width="5" height="9" rx="1.2" fill="#1a7ba3"/></g><path d="M98.5 114Q118 119.2 137.5 114L137.5 121Q118 126.2 98.5 121Z" fill="#2399c7"/><g stroke="#fff" stroke-width=".9" opacity=".9"><line x1="102.8" y1="115.8" x2="102.8" y2="117.8"/><line x1="107.2" y1="116.6" x2="107.2" y2="120.2"/><line x1="111.5" y1="117.1" x2="111.5" y2="119.1"/><line x1="115.8" y1="117.4" x2="115.8" y2="121.0"/><line x1="120.2" y1="117.4" x2="120.2" y2="119.4"/><line x1="124.5" y1="117.1" x2="124.5" y2="120.7"/><line x1="128.8" y1="116.6" x2="128.8" y2="118.6"/><line x1="133.2" y1="115.8" x2="133.2" y2="119.4"/></g><circle class="akh-maat__pulse" cx="118" cy="124" r="3.6" fill="#12263A"/></svg>'},
        hielWreef: {title: 'Meet de omvang over je hiel en wreef', label: 'omvang over hiel en wreef', short: 'Hiel-wreef', min: 20, max: 45,
                    text: 'Leg het meetlint schuin om je voet: onder je hiel door en over de bovenkant van je voet, vlak voor je enkel. Niet strak trekken.',
                    svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98 0C99 50 99 95 99 116C99 132 90 146 88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C205 161 196 157 184 154C164 148 148 139 142 127C139 117 137 99 137 80V0Z" fill="#cfe4ee"/><path d="M88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C175 172 120 171 88 160Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="117" cy="140" rx="6.5" ry="5.5" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M197 159c4 1 6 4 6 7" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M104 112c4 2 10 3 16 2" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/><g transform="rotate(-40 124 152)"><ellipse cx="124" cy="152" rx="38" ry="13" fill="none" stroke="#2399c7" stroke-width="3" opacity=".3"/><path d="M86 152a38 13 0 0 0 76 0" fill="none" stroke="#2399c7" stroke-width="6" class="akh-maat__tape" stroke-linecap="round"/></g><circle class="akh-maat__pulse" cx="140" cy="141" r="3.6" fill="#12263A"/></svg>'},
        voetMidden: {title: 'Meet de omvang van het midden van je voet', label: 'omvang midden voet', short: 'Midden voet', min: 15, max: 35,
                     text: 'Zet je voet plat op de grond. Meet rondom het midden van je voet, halverwege je hiel en je tenen. Niet strak trekken.',
                     svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98 0C99 50 99 95 99 116C99 132 90 146 88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C205 161 196 157 184 154C164 148 148 139 142 127C139 117 137 99 137 80V0Z" fill="#cfe4ee"/><path d="M88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C175 172 120 171 88 160Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="117" cy="140" rx="6.5" ry="5.5" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M197 159c4 1 6 4 6 7" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M104 112c4 2 10 3 16 2" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/><g transform="rotate(-8 163 165)"><ellipse cx="163" cy="165" rx="7" ry="19" fill="none" stroke="#2399c7" stroke-width="3" opacity=".3"/><path d="M163 146a7 19 0 0 1 0 38" fill="none" stroke="#2399c7" stroke-width="6" class="akh-maat__tape" stroke-linecap="round"/></g><circle class="akh-maat__pulse" cx="170" cy="165" r="3.6" fill="#12263A"/></svg>'},
        hielBreedte: {title: 'Meet de breedte van je hiel', label: 'hielbreedte', short: 'Hielbreedte', min: 3, max: 12,
                      text: 'Zet je voet plat op de grond. Meet aan de achterkant de breedte van je hiel, van links naar rechts op het breedste punt.',
                      svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M101 0C101 50 100 95 99 120C97 140 88 152 88 168C88 181 99 188 120 188C141 188 152 181 152 168C152 152 143 140 141 120C140 95 139 50 139 0Z" fill="#cfe4ee"/><path d="M88 168C88 181 99 188 120 188C141 188 152 181 152 168C140 175 100 175 88 168Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="97" cy="132" rx="5" ry="6" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><ellipse cx="143" cy="132" rx="5" ry="6" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M112 60c3 20 3 40 0 55M128 60c-3 20-3 40 0 55" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M88 158V176M152 158V176" stroke="#12263A" stroke-width="1.6" stroke-linecap="round"/><path d="M91 167H149" stroke="#12263A" stroke-width="1.6"/><path d="M96 163L90 167L96 171M144 163L150 167L144 171" stroke="#12263A" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle class="akh-maat__pulse" cx="120" cy="167" r="3.6" fill="#12263A"/></svg>'},
        schoenmaat: {title: 'Wat is je schoenmaat?', label: 'schoenmaat', short: 'Schoenmaat', unit: '', field: 'EU', phrase: 'schoenmaat {v}', example: '42 of 42,5',
                     recheck: 'Controleer je schoenmaat.', min: 16, max: 52,
                     text: 'Vul je gewone (Europese) schoenmaat in. Een halve maat mag ook, bijvoorbeeld 42,5.',
                     svg: '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98 0C99 50 99 95 99 116C99 132 90 146 88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C205 161 196 157 184 154C164 148 148 139 142 127C139 117 137 99 137 80V0Z" fill="#cfe4ee"/><path d="M88 160C86 175 95 182 108 182C124 182 136 177 152 177C164 177 176 182 190 182C202 182 209 176 207 168C175 172 120 171 88 160Z" fill="#bcd8e5" opacity=".6"/><ellipse cx="117" cy="140" rx="6.5" ry="5.5" fill="#bcd8e5" stroke="#a9c9d8" stroke-width="1.6"/><path d="M197 159c4 1 6 4 6 7" stroke="#a9c9d8" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M104 112c4 2 10 3 16 2" stroke="#a9c9d8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M87 186V196M209 186V196" stroke="#12263A" stroke-width="1.6" stroke-linecap="round"/><path d="M90 191H206" stroke="#12263A" stroke-width="1.6"/><path d="M95 187L89 191L95 195M201 187L207 191L201 195" stroke="#12263A" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="148" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#12263A" font-family="inherit">EU</text></svg>'}
      }
    }
  };
  (function(){
    // Enkel: omvang bij de bal van de voet en de voetlengte (pictogram op basis van de enkel-tekening)
    var m = TEMPLATES.enkel.measures, src = m.voetMidden.svg, base = src.slice(0, src.indexOf('<g transform="rotate(-8 163 165)">'));
    m.voetBal = {title: 'Meet de omvang van je voorvoet', label: 'omvang voorvoet', short: 'Voorvoet', min: 15, max: 35,
      text: 'Zet je voet plat op de grond. Meet rondom het breedste deel van je voet, bij de bal van je voet (net achter je tenen). Niet strak trekken.',
      svg: '<svg viewBox="30 0 180 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M122 186C105 186 97 175 97 158C97 140 103 126 101 110C99 96 91 86 91 71C91 60 95 54 102 52L151 57C157 61 158 71 155 83C151 104 147 119 147 140C147 163 141 186 122 186Z" fill="#cfe4ee"/><ellipse cx="106" cy="42" rx="11.5" ry="17" fill="#cfe4ee"/><ellipse cx="125" cy="45" rx="7.5" ry="12" fill="#cfe4ee"/><ellipse cx="138" cy="50" rx="6.8" ry="10.5" fill="#cfe4ee"/><ellipse cx="149" cy="56" rx="6.2" ry="9" fill="#cfe4ee"/><ellipse cx="157" cy="64" rx="5.4" ry="7.5" fill="#cfe4ee"/><path d="M101 110C99 96 91 86 91 71" stroke="#bcd8e5" stroke-width="3" fill="none" opacity=".0"/><ellipse cx="122" cy="166" rx="17" ry="13" fill="#bcd8e5" opacity=".55"/><ellipse cx="124" cy="78" rx="24" ry="13" fill="#bcd8e5" opacity=".45"/><path d="M86 74C100 71 140 74 160 80" stroke="#2399c7" stroke-width="3" fill="none" opacity=".3"/><path d="M86 84C100 81 140 84 158 90" stroke="#2399c7" stroke-width="3" fill="none" opacity=".3"/><path d="M87 79C102 76 140 79 159 85" stroke="#2399c7" stroke-width="9" fill="none" class="akh-maat__tape" stroke-linecap="round"/><circle class="akh-maat__pulse" cx="159" cy="85" r="3.6" fill="#12263A"/></svg>',
      checkText: 'Je voorvoet is {v}. Deze {p} past tot {max}, dus hij is te smal voor je voet.', checkTitle: 'Kies liever een extra brede schoen',
      checkTitleNone: 'Deze schoen is te smal voor je voet', tochText: 'Ik wil toch deze {p} bestellen', altTitle: 'Daarom raden we je deze extra brede schoenen aan, in jouw maat:', altLoading: 'Extra brede schoenen zoeken\u2026'};
    m.voetlengte = {title: 'Meet de lengte van je voet', label: 'voetlengte', short: 'Voetlengte', min: 10, max: 35,
      text: 'Zet je hiel tegen een muur en meet met je voet plat op de grond van de muur tot het puntje van je langste teen.',
      svg: '<svg viewBox="30 0 180 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M122 186C105 186 97 175 97 158C97 140 103 126 101 110C99 96 91 86 91 71C91 60 95 54 102 52L151 57C157 61 158 71 155 83C151 104 147 119 147 140C147 163 141 186 122 186Z" fill="#cfe4ee"/><ellipse cx="106" cy="42" rx="11.5" ry="17" fill="#cfe4ee"/><ellipse cx="125" cy="45" rx="7.5" ry="12" fill="#cfe4ee"/><ellipse cx="138" cy="50" rx="6.8" ry="10.5" fill="#cfe4ee"/><ellipse cx="149" cy="56" rx="6.2" ry="9" fill="#cfe4ee"/><ellipse cx="157" cy="64" rx="5.4" ry="7.5" fill="#cfe4ee"/><path d="M101 110C99 96 91 86 91 71" stroke="#bcd8e5" stroke-width="3" fill="none" opacity=".0"/><ellipse cx="122" cy="166" rx="17" ry="13" fill="#bcd8e5" opacity=".55"/><ellipse cx="124" cy="78" rx="24" ry="13" fill="#bcd8e5" opacity=".45"/><rect x="58" y="188" width="128" height="8" fill="#a9c9d8"/><path d="M62 196l6-8M74 196l6-8M86 196l6-8M98 196l6-8M110 196l6-8M122 196l6-8M134 196l6-8M146 196l6-8M158 196l6-8M170 196l6-8" stroke="#fff" stroke-width="1.4" opacity=".8"/><path d="M70 25H106" stroke="#12263A" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M70 186V28" stroke="#2399c7" stroke-width="3" stroke-linecap="round"/><path d="M64 34L70 26L76 34M64 180L70 188L76 180" stroke="#2399c7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle class="akh-maat__pulse" cx="106" cy="25" r="3.6" fill="#12263A"/></svg>', basePicture: true};
  })();
  (function(){
    // Teen: teenbeschermers en -spreiders (voet-pictogram, maatlijn bij de tenen)
    var src = TEMPLATES.enkel.measures.voetMidden.svg, base = src.slice(0, src.indexOf('<g transform="rotate(-8 163 165)">'));
    var lijn = '<path d="M186 160H210" stroke="' + INK + '" stroke-width="1.6"/><path d="M191 156L185 160L191 164M205 156L211 160L205 164" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    TEMPLATES.teen = {
      productName: 'teenbeschermer', order: ['kant', 'lengte', 'tussenruimte', 'diameter', 'schoenmaat'],
      svg: base + '</svg>',
      measures: {
        lengte: {title: 'Meet de lengte van je teen', label: 'teenlengte', short: 'Teen', min: 0.5, max: 10, svg: base + lijn + '</svg>',
                 text: 'Meet met een liniaal de lengte van de teen (of tenen) waar het product om moet, van de basis tot het topje.'},
        tussenruimte: {title: 'Meet de ruimte tussen je tenen', label: 'lengte van de ruimte tussen je tenen', short: 'Tussen tenen', min: 0.5, max: 10, svg: base + lijn + '</svg>',
                 text: 'Meet met een liniaal hoe lang de ruimte tussen de twee tenen is, van de basis tot het topje van de kortste teen.'},
        diameter: {title: 'Meet de dikte van je teen', label: 'diameter van je teen', short: 'Diameter', unit: 'mm', min: 5, max: 40, svg: base + lijn + '</svg>',
                 text: 'Meet met een liniaal de dikte (diameter) van je teen in millimeters, op het dikste punt.'},
        schoenmaat: clone(TEMPLATES.enkel.measures.schoenmaat)
      }
    };
  })();
  (function(){
    // Steunkous: ook hiel-wreef en schoenmaat (pictogrammen van het enkel-sjabloon)
    var em = TEMPLATES.enkel.measures, sm = TEMPLATES.steunkous.measures;
    sm.hielWreef = Object.assign(clone(em.hielWreef), {text: 'Buig je voet in een hoek van 90 graden. Meet rondom over je hiel en wreef (de lijn van achter je hiel schuin over de bovenkant van je voet). Niet strak trekken.'});
    sm.schoenmaat = clone(em.schoenmaat);
  })();
  (function(){
    // Romp-pictogrammen: bovenlichaam met armen langs het lichaam; band of maatlijn per meetpunt.
    // v11: strakker bovenlichaam (symmetrisch, schouders en armen als één lijn, armen iets donkerder).
    var mir = function(d){ return d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, function(m0, x, y){ return (240 - +x) + ' ' + y; }); };
    var ARM_R = 'M166 28C181 29 190 39 190 55L193 110C194 126 196 142 196 156C196 167 193 174 187 174C181 174 179 167 179 157L177 116C176 102 173 88 169 74Z';
    var T = '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M107 0H133V13C137 19 149 22 161 25C172 28 177 37 176 49C175 61 168 71 166 85C164 99 160 109 160 122C160 136 165 148 166 163C167 177 166 190 165 200H75C74 190 73 177 74 163C75 148 80 136 80 122C80 109 76 99 74 85C72 71 65 61 64 49C63 37 68 28 79 25C91 22 103 19 107 13Z" fill="' + SKIN + '"/>' +
      '<path d="' + ARM_R + '" fill="' + SHADE + '"/><path d="' + mir(ARM_R) + '" fill="' + SHADE + '"/>' +
      '<path d="M94 35C103 38 111 38 117 35M146 35C137 38 129 38 123 35" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M120 46V100" stroke="' + LINE + '" stroke-width="1.2" opacity=".35"/><circle cx="120" cy="130" r="2.2" fill="' + LINE + '"/>';
    // Hele lichaam (voor lichaamslengte en gewicht): staand, met vloer (lift = voeten hoger, voor de weegschaal).
    var body = function(lift){
      var f = 194 - lift, leg = 'M121 104L137 104L135 ' + (f - 12) + 'C135 ' + (f - 8) + ' 137 ' + (f - 6) + ' 141 ' + (f - 5) + 'C144 ' + (f - 4) + ' 143 ' + f + ' 139 ' + f + 'L124 ' + f + 'C122 ' + f + ' 121 ' + (f - 2) + ' 121 ' + (f - 5) + 'Z';
      var arm = 'M144 37C149 39 151 45 151 51L154 97C154 102 153 106 150 106C147 106 146 102 146 97L143 58Z';
      return '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M80 ' + (f + 1) + 'L200 ' + (f + 1) + '" stroke="' + LINE + '" stroke-width="2" stroke-linecap="round"' + (lift ? ' opacity="0"' : '') + '/>' +
        '<path d="' + arm + '" fill="' + SHADE + '"/><path d="' + mir(arm) + '" fill="' + SHADE + '"/>' +
        '<path d="' + leg + '" fill="' + SKIN + '"/><path d="' + mir(leg) + '" fill="' + SKIN + '"/>' +
        '<path d="M114 28L126 28L126 32C132 33 140 34 143 37C146 40 146 46 145 52L141 70C139 78 138 86 138 96L137 108L103 108L102 96C102 86 101 78 99 70L95 52C94 46 94 40 97 37C100 34 108 33 114 32Z" fill="' + SKIN + '"/>' +
        '<circle cx="120" cy="' + (16 - lift) + '" r="11" fill="' + SKIN + '"/>';
    };
    TEMPLATES.romp.bodyPlain = body(0) + '</svg>';
    TEMPLATES.romp.bodyHeight = body(0) + '<path d="M58 5H110M58 195H96" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".55"/><path d="M62 8V192" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<path d="M58 13L62 6L66 13M58 187L62 194L66 187" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    TEMPLATES.romp.bodyWeight = body(0) .replace('<path d="M80 195L200 195" stroke="' + LINE + '" stroke-width="2" stroke-linecap="round"/>',
      '<rect x="86" y="194" width="68" height="6" rx="2" fill="' + A + '"/><rect x="113" y="195.5" width="14" height="3" rx="1" fill="#fff" opacity=".9"/>') + '</svg>';
    TEMPLATES.steunkous.measures.lichaamslengte.svg = TEMPLATES.romp.bodyHeight;
    TEMPLATES.steunkous.measures.gewicht.svg = TEMPLATES.romp.bodyWeight;
    var r = TEMPLATES.romp.measures, pd = function(x, y){ return '<circle class="akh-maat__pulse" cx="' + x + '" cy="' + y + '" r="3.5" fill="' + INK + '"/>'; };
    var band = function(x0, x1, y){ return tapeBand(x0, x1, y, 3, 7, {x: x1 - 1, y: y + 3.5, a: 60, len: 28}) + pd((x0 + x1) / 2, y + 12); };
    var arrow = function(x0, y0, x1, y1){
      return '<path d="M' + x0 + ' ' + y0 + 'L' + x1 + ' ' + y1 + '" stroke="' + INK + '" stroke-width="1.6"/>' + pd(x0, y0) + pd(x1, y1);
    };
    TEMPLATES.romp.svg = T + '</svg>';
    r.borst.svg = T + band(71, 169, 56) + '</svg>';
    r.onderBorst.svg = T + band(74, 166, 82) + '</svg>';
    r.borstSchouder.svg = T + '<path d="M80 26Q122 40 168 76" stroke="' + A + '" stroke-width="6" fill="none" stroke-linecap="round" class="akh-maat__tape"/>' + pd(80, 26) + pd(168, 76) + '</svg>';
    r.bovenarm.svg = T + tapeBand(49, 72, 66, 1.4, 6, {x: 71, y: 69, a: 60, len: 20}) + pd(60.5, 76) + '</svg>';
    r.schouderbreedte.svg = T + '<path d="M60 18V34M180 18V34" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".55"/><path d="M63 24H177" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<path d="M69 20L63 24L69 28M171 20L177 24L171 28" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    r.taille.svg = T + band(80, 160, 118) + '</svg>';
    r.buik.svg = T + band(79, 161, 134) + '</svg>';
    r.heup.svg = T + band(74, 166, 162) + '</svg>';
    r.bekken.svg = T + band(75.5, 164.5, 152) + '</svg>';
    r.lichaamslengte.svg = TEMPLATES.romp.bodyHeight;
    ['schouder', 'mitella', 'rug', 'bekken', 'borst', 'buik'].forEach(function(name){
      var c = clone(TEMPLATES.romp);
      c.productName = {schouder: 'schouderbrace', mitella: 'mitella', rug: 'rugbrace', bekken: 'bekkenband', borst: 'brace', buik: 'buikband'}[name];
      if (name === 'schouder' || name === 'mitella')
        c.choices = {kant: {title: name === 'mitella' ? 'Voor welke arm is de mitella?' : 'Voor welke schouder is de brace?', attribute: 'side', resultLabel: 'Kant',
                     options: [{value: 'Links', label: name === 'mitella' ? 'Linkerarm' : 'Linkerschouder', short: 'Links'}, {value: 'Rechts', label: name === 'mitella' ? 'Rechterarm' : 'Rechterschouder', short: 'Rechts'}]}};
      TEMPLATES[name] = c;
    });
  })();
  (function(){
    // Arm (recht, elleboog halverwege) met een meetlint per meetpunt.
    var arm = '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
              '<path d="M96 0C97 30 100 60 101 78C101 86 99 92 99 100C99 122 104 146 108 164H132C136 146 141 122 141 100C141 92 139 86 139 78C140 60 143 30 144 0Z" fill="' + SKIN + '"/>' +
              '<path d="M101 78C101 86 99 92 99 100C99 122 104 146 108 164H132C136 146 141 122 141 100C141 92 139 86 139 78C128 83 112 83 101 78Z" fill="' + SHADE + '" opacity=".45"/>' +
              '<path d="M107 162C103 172 102 184 104 196C105 200 110 200 111 196L112 186L113 199C114 202 119 202 119 198L120 187L121 199C122 202 127 202 127 198L128 186L129 196C130 200 135 199 136 195C138 184 137 172 133 162Z" fill="' + SKIN + '"/>' +
              '<path d="M109 79c7 3 15 3 22 0" stroke="' + LINE + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    var e = TEMPLATES.elleboog.measures, dot = function(x, y){ return '<circle class="akh-maat__pulse" cx="' + x + '" cy="' + y + '" r="3.5" fill="' + INK + '"/>'; };
    TEMPLATES.elleboog.svg = arm + '</svg>';
    e.elleboog.svg = arm + tapeBand(100, 140, 75, 2.4, 7, {x: 139, y: 78.5, a: 60, len: 26}) + dot(120, 86) + '</svg>';
    e.onderarm.svg = arm + '<path d="M134 79H174" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M170 82V109" stroke="' + INK + '" stroke-width="1.6"/>' +
                     '<path d="M166 86L170 79L174 86M166 105L170 112L174 105" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
                     '<text x="178" y="99.5" font-size="12" font-weight="700" fill="' + INK + '" font-family="inherit">5 cm</text>' +
                     tapeBand(99, 141, 109, 2.4, 7, {x: 140, y: 112.5, a: 60, len: 26}) + dot(120, 120) + '</svg>';
    e.onderarmBreed.svg = arm + tapeBand(98.5, 141.5, 97, 2.4, 7, {x: 140.5, y: 100.5, a: 60, len: 26}) + dot(120, 108) + '</svg>';
    e.bovenarm.svg = arm + tapeBand(97.5, 142.5, 36, 2.6, 7, {x: 141.5, y: 39.5, a: 60, len: 26}) + dot(120, 47) + '</svg>';
    e.oksel.svg = arm + tapeBand(96.5, 143.5, 8, 2.6, 7, {x: 142.5, y: 11.5, a: 60, len: 26}) + dot(120, 19) + '</svg>';
    e.pols.svg = arm + tapeBand(107, 133, 152, 2, 6, {x: 132, y: 155, a: 60, len: 22}) + dot(120, 161) + '</svg>';
    e.armlengte.svg = arm + '<path d="M144 4H168M134 160H168" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M164 8V156" stroke="' + INK + '" stroke-width="1.6"/>' +
                      '<path d="M160 13L164 6L168 13M160 151L164 158L168 151" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    // Been (op basis van het knie-pictogram)
    var ksrc = TEMPLATES.knie.measures.onder.svg, leg = ksrc.slice(0, ksrc.indexOf('<path d="M134 99H180"')), b = TEMPLATES.been.measures;
    var bb = function(x0, x1, y){ return tapeBand(x0, x1, y, 2.6, 7, {x: x1 - 1, y: y + 3.5, a: 60, len: 26}) + dot((x0 + x1) / 2, y + 11); };
    TEMPLATES.been.svg = leg + '</svg>';
    b.dijBoven.svg = leg + bb(84.5, 155.5, 8) + '</svg>';
    b.dijDik.svg = leg + bb(85.5, 154.5, 22) + '</svg>';
    b.dijMidden.svg = leg + bb(87.5, 152.5, 42) + '</svg>';
    b.dijOnder.svg = leg + bb(91.5, 148.5, 70) + '</svg>';
    b.kuit.svg = leg + bb(88.5, 151.5, 142) + '</svg>';
    b.beenlengte.svg = leg + '<path d="M156 8H178M150 76H178" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M174 12V72" stroke="' + INK + '" stroke-width="1.6"/>' +
                       '<path d="M170 17L174 10L178 17M170 67L174 74L178 67" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.taille.svg = TEMPLATES.romp.measures.taille.svg;
    // onderarmlengte (mitella): van de elleboog tot de knokkels
    var oal = arm + '<path d="M134 79H166M136 192H166" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/><path d="M162 83V188" stroke="' + INK + '" stroke-width="1.6"/>' +
              '<path d="M158 88L162 81L166 88M158 183L162 190L166 183" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + dot(120, 86) + '</svg>';
    ['romp', 'schouder', 'mitella', 'rug', 'bekken', 'borst', 'buik'].forEach(function(t){ if (TEMPLATES[t]) TEMPLATES[t].measures.onderarmlengte.svg = oal; });
  })();
  (function(){
    var k = TEMPLATES.knie.measures, src = k.onder.svg, base = src.slice(0, src.indexOf('<path d="M134 99H180"'));
    k.onderKnie = {title: 'Meet de omvang net onder je knie', label: 'omvang onder de knie', short: 'Onder knie', min: 20, max: 60,
      text: 'Sta rechtop met je knie licht gebogen. Meet rondom je onderbeen op het smalste deel, direct onder je knieschijf. Niet strak trekken.',
      svg: base + tapeBand(94, 146, 123, 2.4, 7, {x: 145, y: 126.5, a: 60, len: 28}) + '<circle class="akh-maat__pulse" cx="120" cy="134" r="3.6" fill="' + INK + '"/></svg>'};
    k.kniebreedte = {title: 'Meet de breedte van je knie', label: 'kniebreedte', short: 'Kniebreedte', min: 6, max: 20,
      text: 'Ga zitten met je knie gebogen. Meet met een liniaal de breedte van je knie, van de binnenkant naar de buitenkant, ter hoogte van het midden van je knieschijf.',
      svg: base + '<path d="M93 86V112M147 86V112" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="3 3" opacity=".55"/><path d="M96 99H144" stroke="' + INK + '" stroke-width="1.6"/>' +
           '<path d="M101 95L95 99L101 103M139 95L145 99L139 103" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle class="akh-maat__pulse" cx="120" cy="99" r="3.4" fill="' + INK + '"/></svg>'};
  })();
  // Vaste teksten voor automatische keuzestappen bij bekende productopties (kousen e.d.).
  var AUTO_TEXT = {
    compressie_klasse: {title: 'Welke compressieklasse heb je nodig?', text: 'Dit staat op je recept of in het advies van je arts of therapeut. Twijfel je? Vraag het onze digitale assistent.', resultLabel: 'Compressieklasse'},
    silicone_band: {title: 'Welk boord wil je bovenaan de kous?', text: 'Een siliconenboord zorgt dat de kous niet afzakt. Een noppenboord houdt het best; een balanceboord of smal boord is zachter voor de huid.', resultLabel: 'Boord'},
    teenstuk: {title: 'Wil je een open of gesloten teen?', text: 'Met een open teen (tenen vrij) kun je de kous makkelijker aantrekken en heb je minder druk op de tenen.', resultLabel: 'Teenstuk'},
    protection_fit: {title: 'Welke pasvorm wil je?', resultLabel: 'Pasvorm'}
  };
  var DEFAULTS = {intro: {eyebrow: 'Maatadvies', title: 'Vind je maat in 30 seconden'}, analytics: true, mappings: []};

  function clone(o){ return o == null ? o : JSON.parse(JSON.stringify(o)); }
  // Sjabloon + config samenvoegen; metingen en keuzes per stuk (zodat je bv. alleen een tekst kunt aanpassen).
  function resolve(config){
    // template: naam van een ingebouwd sjabloon, of een compleet sjabloon-object uit het CMS-blokje.
    var t = clone(typeof config.template === 'object' ? config.template : TEMPLATES[config.template] || {}), c = Object.assign({}, config), out = Object.assign({}, clone(DEFAULTS), t);
    ['measures', 'choices'].forEach(function(k){
      var merged = Object.assign({}, t[k] || {});
      Object.keys(c[k] || {}).forEach(function(id){ merged[id] = c[k][id] === false ? null : Object.assign({}, merged[id] || {}, c[k][id]); });
      Object.keys(merged).forEach(function(id){ if (!merged[id]) delete merged[id]; });
      out[k] = merged; delete c[k];
    });
    out.intro = Object.assign({}, DEFAULTS.intro, t.intro || {}, c.intro || {}); delete c.intro;
    Object.assign(out, c);
    out.order = (out.order || []).filter(function(id){ return out.measures[id] || out.choices[id]; });
    return out;
  }

  // Staat het block in de "(Maattabel)"-popup (native <dialog>), sluit die dan netjes
  // via het eigen cancel-event, zodat de winkelwagen-popup of chat erboven verschijnt.
  function closeDialogAround(el){
    var d = el.closest && el.closest('dialog[open]');
    if (!d) return;
    try { d.dispatchEvent(new Event('cancel', {cancelable: true})); } catch(e){}
    setTimeout(function(){ try { if (d.open) d.close(); } catch(e){} }, 60);
  }

  /* ---------- v23: bredere alternatieven ophalen (GraphQL op SKU) ----------
     Per SKU: naam, foto, URL, prijs en varianten (maat + voorraad). De maat voor de klant volgt uit de
     maattabel van dat product zelf (size_chart via GraphQL; lukt dat niet, dan uit de productpagina). */
  var altCache = {};
  function gqlUrl(q){ return String(window.BASE_URL || '/').replace(/\/?$/, '/') + 'graphql?query=' + encodeURIComponent(q); }
  function gql(q){
    return fetch(gqlUrl(q), {credentials: 'same-origin', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
      .then(function(r){ return r.json(); });
  }
  function configFromDoc(doc){
    var sc = doc.querySelectorAll('script[type="application/json"]');
    for (var i = 0; i < sc.length; i++) {
      var j = null; try { j = JSON.parse(sc[i].textContent); } catch(e){ continue; }
      if (j && j.attributes && j.index) return j;
    }
    return null;
  }
  function chartFromDoc(doc){
    var w = doc.createTreeWalker(doc.body, 4, null), n;
    while ((n = w.nextNode())) {
      if (!MARK.test(n.nodeValue)) continue;
      var el = n.parentNode, box = el && el.parentNode;
      if (box && !/^(BODY|HTML)$/.test(box.tagName) && box.querySelectorAll('p,div,li,br').length > 1) return linesOf(box).join('\n');
      return linesOf(el).join('\n');
    }
    return '';
  }
  // Per alternatief: maattabel (GraphQL size_chart, anders uit de pagina) en de productconfig van de pagina
  // (levertijdtekst per maat, zoals die pagina hem zelf toont).
  function pagesFor(skus, items){
    var q = '{products(filter:{sku:{in:' + JSON.stringify(skus) + '}}){items{sku size_chart}}}', charts = {}, pcs = {};
    return gql(q).then(function(res){
      ((res && res.data && res.data.products && res.data.products.items) || []).forEach(function(it){ if (it.size_chart && MARK.test(it.size_chart)) charts[it.sku] = it.size_chart; });
    }, function(){}).then(function(){
      return Promise.all(items.filter(function(it){ return it.href; }).map(function(it){
        return fetch(it.href.split('#')[0], {credentials: 'same-origin'}).then(function(r){ return r.text(); }).then(function(h){
          var doc = new DOMParser().parseFromString(h, 'text/html');
          pcs[it.sku] = configFromDoc(doc);
          if (!charts[it.sku]) { var t = chartFromDoc(doc); if (t) charts[it.sku] = t; }
        }, function(){});
      }));
    }).then(function(){ return {charts: charts, pcs: pcs}; });
  }
  function htmlToLines(t){
    var d = document.createElement('div');
    d.innerHTML = /<\w/.test(t) ? t : esc(t).replace(/\n/g, '<br>');
    return linesOf(d);
  }
  function loadAlternatives(skus, values, done){
    var key = skus.join(',');
    var base = String(window.BASE_URL || '/').replace(/\/?$/, '/');
    var q = '{products(filter:{sku:{in:' + JSON.stringify(skus) + '}}){items{sku name url_key url_suffix small_image{url} ' +
            'price_range{minimum_price{final_price{value}}} ... on ConfigurableProduct{configurable_options{attribute_id attribute_code values{value_index label}} ' +
            'variants{attributes{code value_index label} product{sku stock_status price_range{minimum_price{final_price{value}}}}}}}}}';
    var p = altCache[key] || (altCache[key] = gql(q).then(function(res){
      var items = ((res && res.data && res.data.products && res.data.products.items) || []).map(function(it){
        return Object.assign({}, it, {href: it.url_key ? base + it.url_key + (it.url_suffix || '') : ''});
      });
      return pagesFor(items.map(function(it){ return it.sku; }), items).then(function(x){ return {items: items, charts: x.charts, pcs: x.pcs}; });
    }));
    p.then(function(d){
      var list = [];
      skus.forEach(function(sku){
        var it = d.items.filter(function(x){ return x.sku === sku; })[0], txt = d.charts[sku];
        if (!it || !txt || !it.variants) return;
        var parsed = parseSnippet(htmlToLines(txt));
        if (!parsed.config) return;
        var acfg = resolve(parsed.config), aadv = Advisor(acfg, null);
        var m = acfg.mappings.filter(function(x){ return x.type === 'range' || x.type === 'fit'; })[0];
        if (!m) return;
        var keys = mappingMeasures(m);
        if (keys.some(function(k){ return values[k] == null; })) return;
        var sh = acfg.shift || 0, r;
        if (m.type === 'fit') { var v = {}; keys.forEach(function(k){ v[k] = values[k] + sh; }); r = aadv.adviseOne(m, v); }
        else r = aadv.adviseOne(m, values[m.measure] + sh);
        if (!r.pick || r.status === 'nofit' || r.status === 'none') return;
        // Ook het alternatief moet de controle doorstaan (anders is het net zo krap).
        var tooWide = (acfg.checks || []).some(function(c){
          var row = c.table.filter(function(x){ return norm(x.value) === norm(r.pick.value); })[0];
          return row && values[c.measure] != null && values[c.measure] > row.max + (c.tolerance || 0) + 1e-9;
        });
        if (tooWide) return;
        var hit = it.variants.filter(function(vr){ return (vr.attributes || []).some(function(a){ return norm(a.label) === norm(r.pick.value); }); });
        if (!hit.length) return;
        var vr = hit.filter(function(x){ return x.product && x.product.stock_status === 'IN_STOCK'; })[0] || hit[0];
        var at = (vr.attributes || []).filter(function(a){ return norm(a.label) === norm(r.pick.value); })[0];
        var opt = (it.configurable_options || []).filter(function(o){ return o.attribute_code === at.code; })[0];
        var pr = vr.product && vr.product.price_range ? vr.product.price_range.minimum_price.final_price.value
               : it.price_range ? it.price_range.minimum_price.final_price.value : null;
        var inStock = !!(vr.product && vr.product.stock_status === 'IN_STOCK'), stock = '', slow = false;
        // Levertijd zoals op de productpagina van het alternatief ("Op voorraad", "Levertijd 2-3 werkdagen").
        var apc = d.pcs[sku], cpid = null;
        if (apc && opt) Object.keys(apc.index).forEach(function(pid){ if (String(apc.index[pid][opt.attribute_id]) === String(at.value_index)) cpid = pid; });
        if (cpid) {
          stock = (apc.stockInfo && apc.stockInfo[cpid]) || '';
          slow = apc.stockAvailabilityOrder ? apc.stockAvailabilityOrder[cpid] > 0 : false;
          if (apc.stockAvailability && apc.stockAvailability[cpid] === false) inStock = false;
          var op = apc.optionPrices && apc.optionPrices[cpid];
          if (op && op.finalPrice) pr = op.finalPrice.amount;
        }
        list.push({sku: sku, name: it.name, img: it.small_image && it.small_image.url, size: r.pick.value, label: m.label || 'Maat',
                   price: pr, inStock: inStock, stock: stock, slow: slow,
                   href: it.href + (opt && opt.attribute_id ? '#' + opt.attribute_id + '=' + at.value_index : '')});
      });
      list.sort(function(a, b){ return ((b.inStock ? 2 : 0) - (b.slow ? 1 : 0)) - ((a.inStock ? 2 : 0) - (a.slow ? 1 : 0)); });
      done(list.slice(0, 3));
    }, function(){ done([]); });
  }

  // v23: kleine aanvulling op de opmaak (zodat er geen nieuw css-bestand nodig is).
  (function(){
    if (document.getElementById('akh-maat-css-v23')) return;
    var st = document.createElement('style'); st.id = 'akh-maat-css-v23';
    st.textContent =
      '.akh-maat.akh-maat--breed{background:#fff !important;box-shadow:none;}' +
      '.akh-maat--breed .akh-maat__fig{display:none !important;}' +
      '.akh-maat--breed .akh-maat__main{flex-basis:100%;}' +
      '.akh-maat__toch{display:inline-block;margin:2px 0 6px;min-height:44px;padding:0;border:0;background:none;font:inherit;font-size:13.5px;font-weight:600;color:var(--muted);text-decoration:underline;text-underline-offset:3px;cursor:pointer;}' +
      '.akh-maat__toch:hover{color:var(--ink);}' +
      '.akh-maat__tochbox{margin-top:6px;}' +
      '.akh-maat__alts{display:flex;flex-direction:column;gap:8px;margin:0 0 14px;}' +
      '.akh-maat__altkop{font-size:14px;font-weight:700;margin:0;}' +
      '.akh-maat__altload{font-size:13px;color:var(--muted);margin:0;}' +
      '.akh-maat a.akh-maat__alt{display:flex;align-items:center;gap:12px;padding:8px 12px 8px 8px;border:1.5px solid var(--blue-line);border-radius:12px;background:#fff;color:var(--ink) !important;text-decoration:none !important;transition:border-color .12s ease;}' +
      '.akh-maat a.akh-maat__alt:hover{border-color:var(--blue);}' +
      '.akh-maat__alt img,.akh-maat__altimg{flex:none;width:64px;height:64px;object-fit:contain;border-radius:8px;background:#f6f8fa;}' +
      '.akh-maat__alttxt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;font-size:13.5px;line-height:1.35;}' +
      '.akh-maat__alttxt b{font-size:14px;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.akh-maat__alttxt em{font-style:normal;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:var(--green);}' +
      '.akh-maat__alttxt em.is-no{color:var(--muted);}' +
      '.akh-maat__alttxt em.is-slow{color:#d08a12;}' +
      '.akh-maat__alttxt em i{width:8px;height:8px;border-radius:50%;background:currentColor;display:block;}' +
      '.akh-maat__alt svg{flex:none;color:var(--blue-dark);}';
    (document.head || document.documentElement).appendChild(st);
  })();

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  // Mount op elk nog niet gestart [data-akh-maat]-element. Heeft het element een naam
  // (data-akh-maat="..."), dan alleen de config met dezelfde id.
  function init(config){
    ready(function(){
      var cfg = resolve(config || {});
      Array.prototype.forEach.call(document.querySelectorAll('[data-akh-maat]'), function(root){
        var want = root.getAttribute('data-akh-maat');
        if (want && cfg.id && want !== cfg.id) return;
        try { mount(root, cfg); } catch(e){ if (window.console) console.error('[maatadvies]', e); }
      });
    });
  }

  /* ---------- maattabel als tekst in het productattribuut (size_chart) ----------
     Medewerkers zetten in het Text Editor-attribuut van het product bv.:
       [maatadvies]
       sjabloon: knie
       tussen 2 maten: grotere
       speling: bovenbeen 1, onderbeen 2
       S: bovenbeen 43-46, onderbeen 35,5-38,5
       M: bovenbeen 46-49, onderbeen 38,5-41,5
     De engine zoekt die tekst op de pagina, vervangt hem door het maatadvies en
     laat bij een fout de tekst gewoon staan (en meldt de fout in de console). */
  var ALIASES = {
    pols: {omvang: ['pols', 'polsomvang', 'polsgewricht', 'omvang'], hand: ['hand', 'handomvang', 'middenhand', 'hand zonder duim'],
           handlengte: ['handlengte', 'lengte hand'], handbreedte: ['handbreedte', 'breedte hand']},
    romp: {borst: ['borst', 'borstomvang', 'borstkas'], onderBorst: ['onder borst', 'onder de borst', 'onderborst'], borstSchouder: ['schouder borst', 'over schouder', 'borst schouder'],
              bovenarm: ['bovenarm', 'biceps'], schouderbreedte: ['schouderbreedte'], taille: ['taille', 'middel'], buik: ['buik', 'buikomvang'], heup: ['heup', 'heupen', 'heupomvang'],
              bekken: ['bekken', 'bekkenomvang'], onderarmlengte: ['onderarmlengte', 'knokkels-elleboog', 'knokkels elleboog', 'lengte onderarm'], lichaamslengte: ['lichaamslengte', 'lengte']},
    been: {dijBoven: ['bilplooi', 'onder bilplooi', 'bovenbeen boven'], dijDik: ['bovenbeen', 'dikste deel', 'dij'], dijMidden: ['midden bovenbeen', 'midden'],
           dijOnder: ['boven knie', 'onder bovenbeen', 'bovenbeen onder'], kuit: ['kuit', 'kuitomvang'], beenlengte: ['lengte', 'beenlengte', 'afstand'], taille: ['taille', 'middel']},
    elleboog: {elleboog: ['elleboog', 'elleboogomvang', 'omvang'], oksel: ['oksel', 'bovenarm oksel', 'onder oksel'], pols: ['pols', 'polsomvang'], armlengte: ['armlengte', 'lengte arm', 'lengte'], onderarm: ['onderarm', 'onder elleboog', 'arm'], onderarmBreed: ['breedste punt onderarm', 'onderarm breedste punt', 'breedste punt'],
               bovenarm: ['bovenarm', 'biceps']},
    teen: {lengte: ['lengte', 'teenlengte', 'grote teen'], tussenruimte: ['tussenruimte', 'ruimte tussen tenen', 'tussen tenen'], diameter: ['diameter', 'dikte'], schoenmaat: ['schoenmaat', 'schoen', 'eu']},
    vinger: {omvang: ['vinger', 'vingeromvang', 'omvang'], dip: ['dip', 'dip-gewricht', 'dipgewricht'], pip: ['pip', 'pip-gewricht', 'pipgewricht'], lengte: ['lengte', 'vingerlengte']},
    duim: {omvang: ['pols', 'polsomvang', 'polsgewricht', 'omvang'], hand: ['hand', 'handomvang', 'middenhand', 'hand zonder duim'], duim: ['duim', 'duimomvang']},
    nek: {omtrek: ['omtrek', 'nekomtrek', 'nek'], hoogte: ['hoogte', 'nekhoogte']},
    knie: {knie: ['knie', 'knieomvang', 'knieschijf', 'omvang', 'midden'], boven: ['bovenbeen', 'boven', 'dij'], onder: ['onderbeen', 'onder', 'kuit'],
           onderKnie: ['onder knie', 'onder de knie', 'net onder de knie', 'smalste deel'], kniebreedte: ['kniebreedte', 'doorsnede', 'doorsnede knie', 'breedte knie']},
    enkel: {omvang: ['enkel', 'enkelomvang', 'omvang'], hielWreef: ['hiel-wreef', 'hiel en wreef', 'hielwreef', 'wreef', 'hielomvang', 'wreefomvang'],
            voetMidden: ['voet midden', 'midden voet', 'middenvoet', 'voetomvang', 'omvang voet'], hielBreedte: ['hielbreedte', 'hiel breedte', 'breedte hiel'],
            schoenmaat: ['schoenmaat', 'schoen', 'eu'], voetBal: ['voorvoet', 'bal van de voet', 'voetbreedte', 'omtrek voet'], voetlengte: ['voetlengte', 'lengte voet']},
    steunkous: {lichaamslengte: ['lichaamslengte', 'lengte'], gewicht: ['gewicht', 'lichaamsgewicht', 'kg'], hielWreef: ['hiel-wreef', 'hielwreef', 'hiel wreef', 'ca'], schoenmaat: ['schoenmaat', 'schoen', 'eu'], lengteKuit: ['lengte kuit', 'kuitlengte'], enkel: ['enkel', 'cb'], kuit: ['kuit', 'cc'], onderKnie: ['onder knie', 'onder de knie', 'cd'], dij: ['dij', 'bovenbeen', 'cg'],
                heup: ['heup', 'heupen', 'ch'], lengteKnie: ['lengte knie', 'beenlengte knie', 'ld'], lengteKruis: ['lengte kruis', 'beenlengte kruis', 'lg']}
  };
  ['schouder', 'mitella', 'rug', 'bekken', 'borst', 'buik'].forEach(function(n){ ALIASES[n] = ALIASES.romp; });
  // "<meetpunt>: uit product" = waarden uit het product zelf (bv. nekhoogte 8/10/12 cm).
  var PRODUCT_MAPS = {
    nek: {hoogte: {attribute: 'hoogte_nek', label: 'Hoogte', type: 'nearest', tie: 'lower', tolerance: 1.5, maxDeviation: 3}}
  };
  var MARK = /\[\s*maatadvies\s*\]/i, END = /\[\s*\/\s*maatadvies\s*\]/i;
  var NUM = '(\\d+(?:[.,]\\d+)?)';
  function toNum(s){ return parseFloat(String(s).replace(',', '.')); }
  function cleanLine(s){ return String(s || '').replace(/\u00a0/g, ' ').replace(/[‐-―−]/g, '-').replace(/\s+/g, ' ').trim(); }
  function measureIds(tplName, t){
    var map = {}, al = ALIASES[tplName] || {};
    Object.keys(t.measures || {}).forEach(function(id){
      var m = t.measures[id];
      [id, m.label, m.short].forEach(function(n){ if (n && !map[norm(n)]) map[norm(n)] = id; });
    });
    // aliassen gaan voor (bv. "onderarm" = x cm onder de elleboog, niet het breedste punt)
    Object.keys(al).forEach(function(id){ (al[id] || []).forEach(function(n){ map[norm(n)] = id; }); });
    return map;
  }
  function firstMeasure(t){ return (t.order || []).filter(function(id){ return t.measures && t.measures[id]; })[0]; }

  function parseSnippet(lines){
    var opts = {}, rows = [], fromProduct = [], texts = {}, tplName = '', grp = 1;
    lines.forEach(function(raw){
      var line = cleanLine(raw);
      if (!line || MARK.test(line) || END.test(line)) return;
      var m = line.match(/^([^:]{1,40}):\s*(.*)$/);
      if (!m) return;
      var key = norm(m[1]), val = m[2].trim();
      if (key === 'sjabloon') tplName = norm(val);
      else if (key === 'naam' || key === 'productnaam') opts.productName = val;
      else if (/^tussen (2|twee) maten/.test(key)) opts.between = norm(val);
      else if (key === 'speling') opts.speling = val;
      else if (/^verschillende maten/.test(key)) opts.mixed = norm(val);
      else if (/^keuze\b/.test(key)) (opts.keuzes = opts.keuzes || []).push({label: m[1].trim().replace(/^keuze\s*/i, ''), val: val});
      else if (key === 'attribuut') opts.attribute = val;
      else if (/^valt (klein|groot)\b/.test(key)) opts.shift = (/klein/.test(key) ? 1 : -1) * (toNum(val) || 0);
      // "tweede maat: Lengte" — de regels hierna horen bij een tweede productoptie (bv. Kort/Lang).
      else if (/^tweede maat\b/.test(key)) { opts.grp2 = val || 'Lengte'; grp = 2; }
      else if (key === 'afstand') opts.afstand = val;
      // v23: "controle: voorvoet" (wel meten, niet de maat laten bepalen) en "breder alternatief: <sku>, <sku>"
      else if (key === 'controle' || /^alleen controle\b/.test(key)) opts.controle = val;
      else if (/^(bred(er|e)|ruimer)\s+(alternatie(f|ven)|model(len)?)\b/.test(key) || /^alternatie(f|ven) breed\b/.test(key)) opts.breed = val;
      else if (/^tekst\b/.test(key)) texts[key.replace(/^tekst\s*/, '')] = val;
      else if (/^uit product\b/i.test(norm(val))) fromProduct.push(key);
      else {
        // "Medium [grote teen]: schoenmaat 36-40": maat met een label voor een keuze ("keuze ...").
        var tg = m[1].trim().match(/^(.*?)\s*\[([^\]]+)\]$/);
        rows.push(tg ? {value: tg[1], tag: tg[2].trim(), spec: val, grp: grp} : {value: m[1].trim(), spec: val, grp: grp});
      }
    });
    var errs = [];
    var t = TEMPLATES[tplName];
    if (!tplName) errs.push('regel "sjabloon: ..." ontbreekt');
    else if (!t) errs.push('onbekend sjabloon "' + tplName + '" (bestaat: ' + Object.keys(TEMPLATES).join(', ') + ')');
    if (errs.length) return {errors: errs};
    var ids = measureIds(tplName, t), def = firstMeasure(t);
    function idOf(name){ return name ? ids[norm(name)] : def; }

    var table = [], used = [], tagOnly = [];
    rows.forEach(function(r){
      // Bereik "19-22" / "19 tot 22", of open: "<21", "tot 21", "kleiner dan 21", ">6", "vanaf 48", "48+", "48 of groter".
      var LT = '(?:<\\s*=?|\\u2264|tot(?:\\s+en\\s+met)?|kleiner\\s+dan|minder\\s+dan)', GT = '(?:>\\s*=?|\\u2265|vanaf|groter\\s+dan|meer\\s+dan)';
      var re = new RegExp('([A-Za-z\\u00c0-\\u017f][A-Za-z\\u00c0-\\u017f \\-]*?)?\\s*(?:' + NUM + '\\s*(?:-|tot)\\s*' + NUM +
                          '|' + LT + '\\s*' + NUM + '|' + GT + '\\s*' + NUM + '|' + NUM + '\\s*(?:\\+|(?:cm\\s*)?(?:of|en)\\s+(?:groter|meer|hoger)))', 'gi'), mm, row = r.tag ? {value: r.value, tag: r.tag, grp: r.grp} : {value: r.value, grp: r.grp}, n = 0;
      while ((mm = re.exec(r.spec))) {
        var name = (mm[1] || '').replace(/^[\s,;-]+|[\s,;-]+$/g, '').replace(/\s*cm$/i, '');
        var id = idOf(name);
        if (!id) { errs.push('onbekend meetpunt "' + name + '" bij maat ' + r.value); continue; }
        var ms0 = t.measures[id], lo, hi;
        if (mm[2] != null) { lo = toNum(mm[2]); hi = toNum(mm[3]); }
        // "<21" en ">6" zijn exclusief (21 zelf hoort bij de volgende maat); "tot 21", "vanaf 48" en "48+" inclusief.
        else if (mm[4] != null) { lo = ms0.min; hi = toNum(mm[4]) - (/<(?!\s*=)/.test(mm[0]) ? 0.01 : 0); }
        else { lo = toNum(mm[5] != null ? mm[5] : mm[6]) + (mm[5] != null && />(?!\s*=)/.test(mm[0]) ? 0.01 : 0); hi = ms0.max; }
        if (!(lo <= hi)) { errs.push('bereik "' + mm[0].trim() + '" bij maat ' + r.value + ' klopt niet'); continue; }
        row[id] = [lo, hi]; n++;
        if (used.indexOf(id) === -1) used.push(id);
      }
      // Eén losse waarde ("1: 5,96" of "S: lengte 7"): bereik van één punt; tussen twee punten kiest de engine de dichtstbijzijnde.
      if (!n) {
        var one = r.spec.match(new RegExp('^([A-Za-z\\u00c0-\\u017f][A-Za-z\\u00c0-\\u017f \\-]*?)?\\s*' + NUM + '\\s*(?:cm)?(?![\\s\\S])', 'i'));
        if (one) {
          var oid = idOf((one[1] || '').trim());
          if (oid) { row[oid] = [toNum(one[2]), toNum(one[2])]; n++; if (used.indexOf(oid) === -1) used.push(oid); }
          else errs.push('onbekend meetpunt "' + one[1].trim() + '" bij maat ' + r.value);
        }
      }
      // Een regel zonder getallen (bv. "Let op: valt klein") is gewone tekst en telt niet mee.
      if (!n) {
        if (/\d/.test(r.spec)) errs.push('regel "' + r.value + ': ' + r.spec + '" heeft geen bereik (bv. 19-22)');
        else if (r.tag) tagOnly.push(row);   // maat die alleen uit een keuze volgt (geen meting)
      }
      else table.push(row);
    });
    fromProduct.forEach(function(k){ if (!idOf(k)) errs.push('onbekend meetpunt "' + k + '"'); });
    if (!table.length && tagOnly.length && (opts.keuzes || []).length) table = tagOnly;
    else if (tagOnly.length) errs.push('maten met [label] zonder bereik werken alleen samen met een regel "keuze ..."');
    if (!table.length && !fromProduct.length) errs.push('geen maten gevonden (bv. "S: 19-22")');
    if (errs.length) return {errors: errs};

    var tol = 1;
    if (opts.speling != null) {
      var per = {}, any = false, re2 = new RegExp('([A-Za-z\\u00c0-\\u017f][A-Za-z\\u00c0-\\u017f \\-]*?)\\s*' + NUM, 'g'), s2;
      while ((s2 = re2.exec(opts.speling))) { var pid = idOf(s2[1].trim()); if (pid) { per[pid] = toNum(s2[2]); any = true; } }
      if (any) { tol = {}; used.forEach(function(id){ tol[id] = per[id] != null ? per[id] : 1; }); }
      else if (!isNaN(toNum(opts.speling))) tol = toNum(opts.speling);
    }
    var between = opts.between || '';
    var side = /kleiner/.test(between) ? 'smaller' : 'larger';
    var gaps = /grot|kleiner/.test(between) ? side : undefined;
    var mappings = [];
    var all = table, checks = [];
    // v23: controle-meetpunten uit de maatbepaling halen, maar hun bereiken per maat bewaren.
    if (opts.controle) {
      opts.controle.split(/\s*(?:,|;|\ben\b)\s*/).filter(Boolean).forEach(function(nm){
        var cid = idOf(nm);
        if (!cid) { errs.push('onbekend meetpunt "' + nm + '" bij controle'); return; }
        if (checks.some(function(c){ return c.measure === cid; })) return;
        checks.push({measure: cid, tolerance: typeof tol === 'number' ? tol : (tol[cid] != null ? tol[cid] : 1),
                     table: all.filter(function(r){ return Array.isArray(r[cid]); }).map(function(r){ return {value: r.value, min: r[cid][0], max: r[cid][1]}; })});
      });
      if (checks.length) {
        all = all.map(function(r){ var o = {}; Object.keys(r).forEach(function(k){ if (!checks.some(function(c){ return c.measure === k; })) o[k] = r[k]; }); return o; });
        if (!all.some(function(r){ return Object.keys(r).some(function(k){ return Array.isArray(r[k]); }); })) errs.push('na "controle" blijft er geen meetpunt over om de maat te bepalen');
      }
      if (errs.length) return {errors: errs};
    }
    [1, 2].forEach(function(g){
    var table = all.filter(function(r){ return (r.grp || 1) === g; });
    if (!table.length) return;
    var used = [];
    table.forEach(function(r){ Object.keys(r).forEach(function(k){ if (Array.isArray(r[k]) && used.indexOf(k) === -1) used.push(k); }); });
    var attr = g === 1 ? (opts.attribute ? (norm(opts.attribute) === 'auto' ? '__auto_1' : opts.attribute) : 'sizes_alphabetic') : '__auto_2', lbl = g === 1 ? 'Maat' : ucFirst(opts.grp2);
    if (table.length) {
      if (!used.length) {
        // alleen keuzes, geen meting: de keuze bepaalt de maat
        mappings.push({attribute: attr, label: lbl, measure: null, type: 'range', table: table.map(function(r){ return {value: r.value, tag: r.tag}; })});
      } else if (used.length === 1) {
        mappings.push({attribute: attr, label: lbl, measure: used[0], type: 'range', overlap: side, gaps: gaps, tolerance: typeof tol === 'number' ? tol : tol[used[0]],
                       table: table.map(function(r){ var o = {value: r.value, min: r[used[0]][0], max: r[used[0]][1]}; if (r.tag) o.tag = r.tag; return o; })});
      } else {
        mappings.push({attribute: attr, label: lbl, type: 'fit', overlap: side, tolerance: tol, table: table,
                       mixed: /grot/.test(opts.mixed || '') ? 'larger' : /klein/.test(opts.mixed || '') ? 'smaller' : undefined});
      }
    }
    });
    fromProduct.forEach(function(k){
      var id = idOf(k), pm = (PRODUCT_MAPS[tplName] || {})[id];
      mappings.push(Object.assign({measure: id}, pm || {attribute: id, label: ucFirst(k), type: 'nearest', tolerance: 1.5, maxDeviation: 3}));
    });
    var cfg = {template: tplName, mappings: mappings, measures: {}};
    (opts.keuzes || []).forEach(function(kz, i){
      var k = kz.val, parts = k.split('='), title = parts[0].trim(), list = (parts[1] || '').split('/');
      var options = list.map(function(o){
        var mm = o.match(/^\s*(.*?)\s*\(([^)]*)\)\s*$/);
        if (!mm) return null;
        return {value: mm[1], label: mm[1], short: mm[1], sizes: mm[2].split(/\s*,\s*/).filter(Boolean)};
      }).filter(Boolean);
      if (!title || options.length < 2) { errs.push('regel "keuze: ' + k + '" klopt niet (bv. keuze: Welke hoogte? = 18 cm (1, 2) / 25 cm (3, 4))'); return; }
      cfg.choices = cfg.choices || {};
      cfg.choices['keuze' + (i + 1)] = {title: title, filter: true, resultLabel: kz.label ? ucFirst(kz.label) : ucFirst(title.replace(/^(welke|wat voor|hoe)\s+/i, '').replace(/\s*(wil je|heb je).*$/i, '').replace(/\?$/, '')), options: options};
    });
    if (errs.length) return {errors: errs};
    if (opts.productName) cfg.productName = opts.productName;
    if (opts.shift) cfg.shift = opts.shift;
    if (checks.length) cfg.checks = checks;
    if (opts.breed) cfg.alternatives = opts.breed.split(/[\s,;]+/).filter(Boolean);
    Object.keys(texts).forEach(function(k){
      var id = k ? idOf(k) : def;
      if (id) cfg.measures[id] = Object.assign(cfg.measures[id] || {}, {text: texts[k]});
    });
    // "afstand: 10" (alle meetpunten) of "afstand: bovenbeen 14, onderbeen 12" (per meetpunt).
    var afst = {};
    if (opts.afstand != null) {
      var re3 = new RegExp('([A-Za-z\\u00c0-\\u017f][A-Za-z\\u00c0-\\u017f \\-]*?)\\s*' + NUM, 'g'), s3, anyA = false;
      while ((s3 = re3.exec(opts.afstand))) { var aid = idOf(s3[1].trim()); if (aid) { afst[aid] = toNum(s3[2]); anyA = true; } }
      if (!anyA && !isNaN(toNum(opts.afstand))) Object.keys(t.measures).forEach(function(id){ afst[id] = toNum(opts.afstand); });
    }
    if (Object.keys(afst).length) {
      Object.keys(t.measures).forEach(function(id){
        if (afst[id] == null) return;
        // standaardafstand van het meetpunt (dist, anders 15 cm zoals bij de knie) vervangen in tekst en pictogram
        var ms = t.measures[id], d = fmt(afst[id]) + ' cm', o = cfg.measures[id] || {}, from = new RegExp(fmt(ms.dist || 15) + ' cm', 'g');
        if (from.test(ms.text || '') || (from.lastIndex = 0, from.test(ms.svg || ''))) {
          from.lastIndex = 0;
          if (!o.text) o.text = String(ms.text || '').replace(from, d);
          if (ms.svg) o.svg = ms.svg.replace(from, d);
          cfg.measures[id] = o;
        }
      });
    }
    return {config: cfg};
  }

  // Tekstregels van een element: <br> en blokken als nieuwe regel.
  function linesOf(el){
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('br'), function(b){ b.parentNode.replaceChild(document.createTextNode('\n'), b); });
    Array.prototype.forEach.call(c.querySelectorAll('p,div,li'), function(b){ b.appendChild(document.createTextNode('\n')); });
    return c.textContent.split('\n').map(cleanLine);
  }
  var LINE_LIKE = /^([^:]{1,40}):/;
  function scanText(){
    if (!document.body || !document.createTreeWalker) return;
    var w = document.createTreeWalker(document.body, 4, null), n, hits = [];
    while ((n = w.nextNode())) {
      if (MARK.test(n.nodeValue) && n.parentNode && !n.parentNode.closest('script,style,textarea,[data-akh-maat],[data-akh-maat-done]')) hits.push(n);
    }
    var INLINE = /^(SPAN|STRONG|B|EM|I|U|A|FONT|SMALL|BR)$/;
    hits.forEach(function(tn){
      var par = tn.parentNode, nodes, lines, blk, ended = false;
      var own = /^(P|LI|PRE|TD)$/.test(par.nodeName) ? par : (INLINE.test(par.nodeName) && par.parentNode && /^(P|LI|PRE|TD)$/.test(par.parentNode.nodeName) ? par.parentNode : null);
      if (own) {
        // Tekst in eigen alinea('s), zoals de Text Editor het meestal opslaat.
        blk = own;
        if (blk.hasAttribute('data-akh-maat-done')) return;
        nodes = [blk]; lines = linesOf(blk); ended = lines.some(function(l){ return END.test(l); });
        while (lines.length && !lines[lines.length - 1]) lines.pop();
        var gap = lines.indexOf('');
        if (gap > 0) { lines = lines.slice(0, gap); ended = true; }
        var sib = blk.nextElementSibling;
        while (!ended && sib) {
          var ls = linesOf(sib), txt = ls.filter(Boolean);
          if (MARK.test(sib.textContent) || !txt.length) break;   // nieuw maatadvies of een witregel: stoppen
          if (!txt.every(function(l){ return LINE_LIKE.test(l) || END.test(l); })) break;
          nodes.push(sib); lines = lines.concat(ls);
          if (ls.some(function(l){ return END.test(l); })) ended = true;
          sib = sib.nextElementSibling;
        }
      } else {
        // Losse tekst (met regeleinden of <br>) direct in een groter blok, bv. naast de "(Maattabel)"-knop:
        // alleen die tekst inpakken en verbergen, de rest van het blok blijft staan.
        var i = tn.nodeValue.search(MARK);
        if (i > 0) tn = tn.splitText(i);
        var wrap = document.createElement('span'), run = [tn], nx = tn.nextSibling;
        while (nx && (nx.nodeType === 3 || (nx.nodeType === 1 && INLINE.test(nx.nodeName) && !MARK.test(nx.textContent)))) {
          run.push(nx);
          if (END.test(nx.textContent || '')) break;
          nx = nx.nextSibling;
        }
        tn.parentNode.insertBefore(wrap, tn);
        run.forEach(function(x){ wrap.appendChild(x); });
        blk = wrap; nodes = [wrap];
        lines = linesOf(wrap);
        var cut = -1;
        lines.forEach(function(l, k){ if (cut < 0 && END.test(l)) cut = k; });
        if (cut >= 0) lines = lines.slice(0, cut);
        // stoppen bij een witregel ná de eerste inhoud
        var out = [];
        for (var k = 0; k < lines.length; k++) { if (lines[k]) out.push(lines[k]); else if (out.length) break; }
        lines = out;
      }
      var res = parseSnippet(lines);
      if (res.errors) {
        if (window.console) console.warn('[maatadvies] maattabel niet gebruikt: ' + res.errors.join('; '), blk);
        nodes.forEach(function(x){ x.setAttribute('data-akh-maat-done', 'fout'); });
        return;
      }
      var root = document.createElement('div');
      root.className = 'akh-maat';
      root.setAttribute('data-akh-maat', '');
      blk.parentNode.insertBefore(root, blk);
      nodes.forEach(function(x){ x.style.display = 'none'; x.setAttribute('aria-hidden', 'true'); x.setAttribute('data-akh-maat-done', 'ok'); });
      try { mount(root, resolve(res.config)); } catch(e){ if (window.console) console.error('[maatadvies]', e); }
    });
  }
  // Controle voor medewerkers: AKHMaat.check('[maatadvies]\nsjabloon: knie\nS: 32-34') in de console.
  function check(text){ return parseSnippet(String(text).split('\n')); }

  var queued = window.AKHMaatQ;
  window.AKHMaat = {version: ENGINE_VERSION, init: init, templates: TEMPLATES, resolve: resolve, check: check};
  // Wachtrij: het CMS-blokje doet (window.AKHMaatQ = window.AKHMaatQ || []).push({...}).
  // Dat werkt ongeacht of dit bestand ervoor, erna of met defer geladen wordt.
  window.AKHMaatQ = {push: function(c){ init(c); return 1; }};
  if (queued && queued.length) for (var qi = 0; qi < queued.length; qi++) init(queued[qi]);
  ready(scanText);

  /* ---------- v17: #maatadvies opent direct het maatadvies ---------- */
  function openFromHash(){
    if (!/^#maatadvies$/i.test(window.location.hash || '')) return;
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch(e){}
    var start = Date.now(), triedClick = 0;
    function roots(){ return Array.prototype.filter.call(document.querySelectorAll('[data-akh-maat]'), function(r){ return r.querySelector('[data-akh-maat-main]'); }); }
    function inline(){
      // Het maatadvies in de pagina zelf (sectie "Wat is mijn maat?"), niet in de popup.
      var r = roots().filter(function(x){ return !x.closest('dialog'); })[0];
      if (r) { var sec = r.closest('section') || r; sec.scrollIntoView({behavior: 'smooth', block: 'start'}); }
      try { window.dispatchEvent(new CustomEvent('akh-maat:deeplink', {detail: {how: r ? 'inline' : 'none'}})); } catch(e){}
    }
    (function attempt(){
      var dlgRoot = roots().filter(function(x){ return x.closest('dialog'); })[0];
      var dlg = dlgRoot && dlgRoot.closest('dialog');
      if (dlg && dlg.open) {
        try { window.dispatchEvent(new CustomEvent('akh-maat:deeplink', {detail: {how: 'popup'}})); } catch(e){}
        try { if (typeof window.clarity === 'function') window.clarity('event', 'akh_maat_deeplink'); } catch(e){}
        try { if (window.dataLayer && window.dataLayer.push) window.dataLayer.push({event: 'akh_maat_deeplink'}); } catch(e){}
        return;
      }
      if (Date.now() - start > 4000) return inline();
      if (dlg) {
        // De knop "(Maattabel)" naast de popup (Alpine: open = !open). De knop staat in een blok dat Alpine pas
        // start als het in beeld komt (x-defer="intersect"): eerst in beeld brengen, dan klikken.
        var btn = Array.prototype.filter.call(dlg.parentElement.children, function(b){ return b.tagName === 'BUTTON'; })[0];
        if (btn && window.Alpine && Date.now() - triedClick > 700) {
          if (!triedClick) btn.scrollIntoView({block: 'center'});
          triedClick = Date.now();
          btn.click();
        }
      } else if (Date.now() - start > 1500) return inline();   // geen popup op deze pagina
      setTimeout(attempt, 150);
    })();
  }
  if (document.readyState === 'complete') setTimeout(openFromHash, 0);
  else window.addEventListener('load', function(){ setTimeout(openFromHash, 0); });
})();
