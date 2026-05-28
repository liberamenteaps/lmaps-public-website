# Proposta Tecnica e Organizzativa - Sito Web "Liberamente APS"
**Versione:** 1.0
**Data:** Maggio 2026

Questo documento ha lo scopo di delineare la strategia tecnica, organizzativa e dei costi per la realizzazione del nuovo sito web dell'associazione, da discutere e approvare con la presidenza.

## 1. Obiettivo del Progetto
Creare una presenza online ufficiale, autorevole e veloce per l'associazione. Il sito fungerà da "biglietto da visita" istituzionale e da raccoglitore per:
- Presentare il "Metodo Magrin" e la mission dell'associazione.
- Dare visibilità ai progetti passati, in corso e futuri (scuole, carceri, università, ecc.).
- Rendere pubblici i documenti legali e di trasparenza (Statuto, bandi, finanziamenti).

## 2. Architettura Tecnica Consigliata
Per garantire massima velocità, sicurezza e abbattere i costi di gestione, si propone un'architettura **Jamstack (Sito Statico Moderno)**. 

*   **Tecnologia (Frontend):** Next.js o Astro (Framework moderni per siti statici ultra-veloci).
*   **Gestione Contenuti (CMS - Approccio a Fasi):** 
    *   *Fase 1 (Iniziale):* Per massima velocità di esecuzione e zero configurazioni aggiuntive, i contenuti verranno caricati a sistema dallo Sviluppatore IT (sotto forma di file Markdown), che si limiterà a impaginare i testi approvati dalla Dirigenza.
    *   *Fase 2 (Evolutiva):* Quando l'associazione vorrà essere autonoma nell'aggiornare i progetti, si potrà agganciare un "Headless CMS" (un pannello di controllo visivo e gratuito, es. Decap CMS). Questo permetterà a utenti non tecnici di accedere al sito e pubblicare contenuti tramite un'interfaccia grafica intuitiva, senza richiedere l'intervento dello sviluppatore.
*   **Hosting Server & Codice:** **GitHub Pages**. Il codice sorgente risiederà in un repository su GitHub e il sito verrà pubblicato direttamente da lì (deploy manuale o tramite action) senza necessità di noleggiare server esterni.
*   **Dominio:** Registrazione su Cloudflare o Namecheap (es. `liberamenteaps.org`).

**Perché questa scelta?** 
1. **Costi di server azzerati:** GitHub Pages è gratuito al 100% per l'hosting di siti statici.
2. **Sicurezza assoluta:** Non essendoci un database esposto o plugin di terze parti (come in WordPress), il sito non è hackerabile.
3. **Controllo totale e Zero manutenzione:** Aggiornamenti solo quando necessari, senza i continui aggiornamenti di sicurezza tipici dei CMS tradizionali.

## 3. Struttura dei Contenuti (Mappa del Sito Iniziale)
- **Home Page:** Chi siamo, sintesi del metodo, ultime news/progetti in evidenza.
- **Il Metodo Magrin:** Cos'è, come funziona (sensazioni corporee, rilascio emozionale), benefici.
- **I Nostri Progetti:** Pagina archivio divisa per categorie (Scuole, Carceri, Aziende, Sociale).
- **Trasparenza / Documenti:** Statuto, bandi vinti, bilanci, verbali.
- **Contatti & Sostienici:** Modulo di contatto, info per il tesseramento/donazioni.

## 4. Stima Tempi ed Effort di Sviluppo (IT)
Lo sviluppo del sito richiederà un effort stimato tra le **20 e le 30 ore** di lavoro tecnico, così suddivise:

| Attività di Sviluppo | Ore Stimate |
| :--- | :--- |
| **Setup infrastruttura:** Inizializzazione progetto (Astro/Next.js) e repository GitHub | ~ 2 - 3 h |
| **Sviluppo Base & Layout:** Creazione Home Page, Header, Footer, navigazione | ~ 4 - 6 h |
| **Pagine Informative:** Sviluppo pagina "Metodo Magrin", Contatti, Trasparenza | ~ 4 - 5 h |
| **Sezione Progetti:** Architettura per leggere/mostrare i progetti dai file Markdown | ~ 5 - 7 h |
| **Setup Dominio e Deploy:** Configurazione DNS e setup hosting su GitHub Pages | ~ 2 - 3 h |
| **Revisioni e QA:** Aggiustamenti grafici, responsività mobile, test finali | ~ 3 - 6 h |
| **Totale Ore Stimate** | **~ 20 - 30 h** |

*(Nota: L'effort è da intendersi come quantificazione economica del lavoro svolto per il bilancio dell'associazione o come registro del volontariato qualificato).*

## 5. Analisi dei Costi (Opex)
L'approccio scelto permette di mantenere i costi operativi vicini allo zero.

| Voce | Costo Stimato | Frequenza |
| :--- | :--- | :--- |
| **Dominio** (`.org` o `.com`) | ~ 12-15 € | Annuale |
| **Server / Hosting** (GitHub Pages) | 0 € | - |
| **Email Istituzionale** (es. info@) | 0 € (via forwarding o Google Nonprofits) | - |
| **Totale Costi Monetari** | **~ 15 € / Anno** | |

## 6. Organizzazione e Ruoli
Per procedere in modo fluido, occorre definire i ruoli interni:
- **Sviluppo Tecnico (IT):** Silvio (Sviluppo frontend/backend, gestione GitHub, setup domini).
- **Fornitura Contenuti (Copy & Media):** Presidente/Segretario (Testi ufficiali, statuto, descrizioni dei progetti e foto).
- **Referente Legale:** Per l'approvazione di Privacy Policy e Cookie Policy.
