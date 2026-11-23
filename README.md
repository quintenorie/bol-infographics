# Bol-infographics

Maakt elke nacht automatisch de Bol-afbeeldingen voor alle configurable producten
met een tekst in het Magento-kenmerk `bol_infographic`, en publiceert ze met een
feed voor EffectConnect.

- Overzicht: `https://<github-naam>.github.io/bol-infographics/`
- Feed voor EffectConnect: `https://<github-naam>.github.io/bol-infographics/feed.xml`

## Wat er per product gemaakt wordt

| Afbeelding | Wanneer | Feed-veld |
|---|---|---|
| Kenmerken (hoofdfoto + 2–6 tegels) | minstens 2 regels `kenmerk:` | `bol_img_kenmerken` |
| Maathulp, per maat | bruikbare `size_chart` | `bol_img_maathulp` |
| Zo werkt het (stappen + detailfoto) | minstens 2 regels `stap:` | `bol_img_verstelbaar` |
| Voor wie (2–4 tegels) | minstens 2 regels `voorwie:` | `bol_img_voorwie` |
| Gemak (1–3 regels, met 3e foto als die er is) | minstens 1 regel `gemak:` | `bol_img_gemak` |

Het script maakt alleen opnieuw wat veranderd is. Een gewijzigde afbeelding krijgt
een nieuwe bestandsnaam, zodat Bol hem opnieuw ophaalt.

## Opbouw van `bol_infographic`

```
kop: Licht, luchtig en verstelbaar
kenmerk: lucht | Ademend mesh | Licht en luchtig
stap: Banden los
voorwie: gezwollen | Gezwollen voeten | Ruimte die meegroeit
gemak: wasbaar30 | Wasbaar op 30 °C | In de wasmachine, op fijnwas
kop stappen: Zo stel je hem in        (optioneel)
kop voorwie: Voor wie is dit?         (optioneel)
kop gemak: Handig in gebruik          (optioneel)
```

Iconen: een korte code (`klittenband lucht zool hiel gezwollen verband steunzool
stevig wasbaar30 vocht warm licht zacht zon breed open`) of elk Phosphor-icoon met
`ph:naam` (zie https://phosphoricons.com). Onbekende iconen worden in het overzicht gemeld.

## Instellingen in GitHub

Settings → Secrets and variables → Actions

- Secret `MAGENTO_URL`: `https://www.all4fysio.nl`
- Secret `MAGENTO_TOKEN`: access token van de Magento-integratie
- Variable `ONLY_SKUS` (optioneel): alleen deze sku's verwerken, bijv. `01-14-1778-00`
- Variable `MISSING_LIKE` (optioneel): welke producten zonder tekst in het overzicht komen (standaard `Varomed%`)

Licenties: Inter (SIL Open Font License, zie `fonts/`), Phosphor Icons (MIT).
