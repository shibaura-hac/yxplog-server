# Contest input and export contract

This document records the 2026 contest profiles for Issue #9. Rule review date: 2026-10-07. The rules listed below are versioned by event year and division; a later year's rules require a new profile instead of silently changing old contest data.

## Supported events and output

| Profile | 2026 event window (local time shown by the organizer) | Scoring/output | Primary rules |
|---|---|---|---|
| ALL JA | Apr 25 21:00–Apr 26 21:00 JST | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/allja_rules.html) |
| ALL JA1 | Jun 27; HIGH 09:00–12:00, DIGITAL 13:00–15:00, LOW 16:00–20:00 JST | JARL R2.1 | [Rules](https://ja1zlo.u-tokyo.org/allja1/38rule/) |
| 6m AND DOWN | Jul 4 21:00–Jul 5 15:00 JST | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/6d_rules.html) |
| Field Day | Aug 1 21:00–Aug 2 15:00 JST | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/fd_rules.html) |
| ALL ASIAN DX CW | Jun 20 00:00–Jun 22 00:00 UTC | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/aadx_rules.html) |
| ALL ASIAN DX Phone | Sep 5 00:00–Sep 7 00:00 UTC | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/aadx_rules.html) |
| All City All Gun (ACAG) | Oct 10 21:00–Oct 11 21:00 JST | JARL R2.1 | [Rules](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/acag_rules.html) |
| CQ WW DX SSB | Oct 24 00:00–Oct 26 00:00 UTC | Cabrillo 3.0 | [Rules](https://www.cqww.com/rules/) |
| CQ WW DX CW | Nov 28 00:00–Nov 30 00:00 UTC | Cabrillo 3.0 | [Rules](https://www.cqww.com/rules/) |
| All Saitama | Jan 12 09:00–15:00 JST | JARL R2.1 | [Rules](https://www.jarl.com/allst/rule/44st.html) |
| Daitoshi | Mar 20 15:00–18:00 JST | JARL R1.0, requested by the 2026 organizer | [Organizer](https://www.no5hc.org/) |

The event window is the envelope for selection. ALL JA1 also has category windows; a QSO inside its envelope but outside every active category window is outside the selected entry. The code catalogue distinguishes category codes by profile because band, mode, operator count, location division, power, age and newcomer status differ between organizers. The selected code is the organizer's exact code, not a yxplog alias.

Normal transmitting entries are supported. SWL entries require recording both the transmitting and receiving stations and are outside this initial contract; an SWL category code must not be treated as a supported transmitting entry.

Category choices and conditional input requirements for the transmitting entries are:

- **ALL JA / ACAG**: single operator or multi-operator; CW, phone, or mixed mode; all band or single band; power classes; contest-specific newcomer, silver, junior, and two-transmitter categories. Newcomer entries require the license date; silver/junior require age; power-restricted categories require the declared maximum power; two-transmitter entries require transmitter identity per QSO. ALL JA telephone all-band excludes 14 MHz.
- **ALL JA1**: operator area inside/outside area 1, individual/group, HIGH/LOW/DIGITAL, mode, and band choice. HIGH, DIGITAL and LOW use the listed non-contiguous time windows. Group entries require the number of operators for final-score division. Digital exchanges store the exchanged dB value and location number while the submitted report is 599.
- **6m AND DOWN**: single/multi operator; CW, phone, mixed or D-STAR; all band, selected band, QRP, newcomer, silver, or junior. Frequencies 2400 MHz and above use municipality multipliers and have no fixed upper band limit for applicable entries.
- **Field Day**: single/multi operator; band/mode and power class; Field Day station A, Field Day station B or home station. A entries require location and power-source declaration; station class determines the score coefficient.
- **ALL ASIAN DX CW / Phone**: single operator or multi-operator; single band, all band, all-band 24-hour, single transmitter or multi-transmitter; high/low power. The exchange requires operator age or the explicit `01` alternative (multi-operator uses mean age). JA entries require the station's DXCC entity and continent; non-Asian entries need the received station's prefix for the prefix multiplier.
- **CQ WW DX CW / SSB**: operator, assistance, band, power, station, transmitter and overlay category fields from the Cabrillo rules. The exchange is RST plus the station's CQ zone. The contacted station needs continent, DXCC/WAE country, CQ zone and frequency; multi-transmitter entries need the transmitter number for each QSO.
- **All Saitama**: Saitama-inside/outside division; single operator by band, HF/VHF band group or all band; multi-operator all band. Entries require the station-side exchange number and local municipality classification where applicable. A local CW contact has a different point value from phone/cross-mode.
- **Daitoshi**: individual multi-band or single-band, and club multi-band. Category determines which bands count. The exchange location is a ward, core city or prefecture/region; a core-city or ward contact cannot also claim the prefecture/region multiplier.

For JARL summary validation, ADDRESS, NAME, CALLSIGN, CATEGORYCODE, TOTALSCORE, POWER, EMAIL, OATH, DATE and SIGNATURE follow R2.1's required rules; email is required for electronic submissions. MULTIOPLIST is required for multi-operator. LICENSEDATE, AGE, FDCOEFF, OPPLACE and POWERSUPPLY are required only for the applicable category/operating circumstances. For Cabrillo, category fields and QSO fields follow that event's Cabrillo specification. The examples demonstrate representative categories, not an alternate category-code catalogue.

## Scoring rules recorded for the scoring implementation

These are specifications for a later scoring module. Issue #29 defines the input and result contract; it does not implement the scoring engine.

| Event | Complete-QSO points and duplicate scope | Multipliers and total |
|---|---|---|
| ALL JA | 1 point; once per station/band across modes | Different worked prefecture/region per band; sum points × sum band multipliers |
| ALL JA1 | 1 point; one per station/band/mode | Worked exchange-number regions per band; personal total is QSO sum × multiplier sum; organization total divides by declared operator count |
| 6m AND DOWN | 50–1200 MHz: 1 point; 2400 MHz and above: 2; one per station/band across modes | 50–1200 MHz: worked prefecture/region per band; 2400 MHz and above: worked city/county/ward per band; sum points × sum multipliers |
| Field Day | 1 point; one per station/band across modes | 1.9–1200 MHz: prefecture/region per band; 2400 MHz and above: city/county/ward per band; sum points × sum multipliers × station coefficient (FD station A 2, FD station B/home 1) |
| ALL ASIAN DX | For Asian entrants: 160m 3/9, 80m and 10m 2/6, other bands 1/3 points for Asia/outside Asia; same entity is zero. For non-Asian entrants, only Asian contacts score 3/2/1 by those band groups. Once per station/band. | Asian entrant: DXCC entities per band. Non-Asian entrant: Asian prefixes per band. Total points × multiplier sum. Maritime mobile has no country/entity multiplier. |
| ACAG | 1 point for a complete exchange; one per station/band across modes | Worked city/county/ward per band; sum points × sum multipliers |
| CQ WW DX | Different continents 3; same continent/different country 1, or 2 within North America; same country 0; once per station/band | CQ zone and DXCC/WAE country per band; maritime mobile only earns a zone multiplier. Total points × (zone + country multipliers) |
| All Saitama | CW/CW: 2, increased to 3 for a Saitama contact; phone or cross-mode: 1, increased to 2 for a Saitama contact; duplicate scope is station/band/mode | Worked prefecture/region and Saitama municipality; total points × multiplier sum |
| Daitoshi | 1 point; one per station/band | Worked ward, core city, and prefecture/region with the organizer's exclusions; total points × multiplier sum |

An incomplete exchange, missing required classifier, unsupported mode or missing location/entity lookup is reported as an issue and is not scored as valid. A duplicate remains visible with its reason and contributes neither points nor a new multiplier. Results retain the rules profile and version used so that a later rules update cannot silently change an existing preview.

## Shared data and time contracts

- Existing QSO IDs are Unix milliseconds. New contest periods and API period values are Unix seconds. Convert only at the boundary; do not infer units from the numeric magnitude.
- New range queries use `[start, end)`: the first instant is included and the end instant is excluded. Category windows use the same rule. Event display time uses the profile's timezone; ALL ASIAN DX and CQ WW contest exchange time is UTC.
- `GET /api/export?start=...&end=...` is a legacy seconds-based route. It currently includes both endpoints and reads from the existing recent-QSO getter. Preserve that route's inclusive boundary while adding the contest-specific API; do not reuse it as the period-query implementation. The in-repository caller is ContestManager.
- QSO sent and received exchange numbers are independent strings. Keep leading zeroes and suffixes. Existing `srst`/`rrst` remain the sent/received RST values; `memo` is not a source for either exchange number.
- Location data is explicit: domestic prefecture/region or municipality code as required by the event; for DX scoring/output, DXCC entity, CQ zone, continent and band are available as independently validated values. A callsign-prefix lookup can suggest values but is not proof when ambiguous; unresolved values produce a review issue.
- Cabrillo needs the QSO frequency in kHz, band, mode, sent/received exchange and (for applicable categories) transmitter number. Missing output-required data prevents a successful download; never invent a frequency from the band name.
- A draft submission includes event/category, station callsign, name, mailing address, email, power, event-specific fields, oath date/signature and a reviewed operator list. Required fields depend on organizer/category. Draft persistence permits incomplete values; preview enforces them.
- The saved contest summary is shared with users of the same server. No user-specific access boundary is implied because the current server has no user authentication. Addresses and email stay out of URLs and application logs.

## Export request and preview contract

The contest-specific API uses `POST /api/export/preview?format=jarl|cabrillo` for validation and preview, and `POST /api/export?format=jarl|cabrillo` for download. The query selects the output format; JSON carries the profile ID, selected `[start,end)` period, contest entry and draft summary. Profile/format combinations are validated against the profile catalogue.

Preview returns generated text, selected QSO count and period, calculated score with per-QSO dispositions and reasons, operator candidates, field-level issues and a confirmation token. Download must receive the token from the latest preview. The token covers the profile/rules version, entry, summary, period, and the ordered QSO IDs and content; any change requires a new preview. Invalid request shape is 400, a missing contest is 404, invalid or incomplete submission data is 422, and a stale preview token is 409. Both routes return `Cache-Control: no-store`; download uses a server-generated filename.

JARL's published R2.1 format specifies fields and half-width log rows but does not prescribe a byte encoding or line ending. The project default is UTF-8 without BOM and CRLF. Treat this as a project interoperability choice, not a JARL guarantee. The 2026 Daitoshi organizer requests R1.0. Cabrillo uses its ASCII field and fixed-column requirements; reject unrepresentable or incomplete values instead of truncating or transliterating them silently.

## Deliberate limits and compatibility

- No SWL scoring/output, automated contest submission, login/permission system, or general-purpose future-year rule editor is included in this profile set.
- CQ WW DX is scored and exported as Cabrillo; it is not emitted as JARL R2.1.
- ALL JA1's 2026 submission system recommends ADIF, zLog binary, CTESTWIN binary or JARL R2.0+. This server's text-export profile chooses JARL R2.1 as its supported JARL text format; it does not claim to reproduce the organizer's preferred upload formats.
- The old GET export remains available with its current inclusive end boundary. Its current 20-record getter is not sufficient for contest output; the new route must use the period-query work in Issue #30.
- Draft summary persistence belongs with contest management (#12/#15); QSO migration and editing belong with #13/#31. This document defines their field contract for those issues.

## References

- [JARL electronic log format](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/logformat.html)
- [JARL 2026 ALL JA](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/allja_rules.html), [6m AND DOWN](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/6d_rules.html), [Field Day](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/fd_rules.html), [ALL ASIAN DX](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/aadx_rules.html), [ACAG](https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/acag_rules.html)
- [2026 ALL JA1](https://ja1zlo.u-tokyo.org/allja1/38rule/), [2026 All Saitama](https://www.jarl.com/allst/rule/44st.html), [2026 Daitoshi organizer](https://www.no5hc.org/)
- [CQ WW 2026 rules](https://www.cqww.com/rules/) and [Cabrillo format](https://www.cqww.com/cabrillo.htm)
