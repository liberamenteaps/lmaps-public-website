# Guida alle Best Practices Frontend per Sviluppatori Backend

Questa guida è pensata per facilitare lo sviluppo in autonomia degli stili e del layout di questo sito, spiegando i concetti e le logiche utilizzate all'interno del progetto.

---

## 1. I "Design Tokens" (Variabili CSS)
Nel backend si evitano i *magic numbers* a favore delle costanti. Nel CSS moderno si fa lo stesso usando le **CSS Custom Properties** (variabili).
* **Regola**: Non definire colori esadecimali (`#2d3748`) o valori di arrotondamento sparsi nel codice. Usa sempre `var()`.
* **Vantaggio**: Se decidi di cambiare il colore primario o il raggio dei bordi, ti basterà modificare una singola riga sotto `:root`.

Nel file `style.css` sono definite all'inizio sotto la pseudo-classe `:root`:
```css
:root {
    --primary-color: hsl(142, 70%, 40%); /* Il verde dell'associazione */
    --bg-dark: hsl(220, 20%, 12%);        /* Colore scuro di sfondo */
    --radius-lg: 24px;
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Esempio di utilizzo: */
.card {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}
```

---

## 2. Flusso di Layout: Flexbox vs Grid
Evita di forzare il posizionamento con `position: absolute` o margini negativi per "spostare" gli elementi. Lascia che sia il browser a calcolare il flusso usando le corrette modalità di posizionamento:

### Flexbox (Monodimensionale - 1D)
Ideale per disporre elementi lungo una sola direzione (riga o colonna), dove la dimensione degli elementi è dettata dal loro contenuto.
* **Casi d'uso tipici**: Navbar, bottoni affiancati, righe di icone, liste semplici.
```css
.navbar {
    display: flex;
    justify-content: space-between; /* Spinge logo a sinistra e menu a destra */
    align-items: center;            /* Allinea verticalmente gli elementi al centro */
}
```

### Grid (Bidimensionale - 2D)
Ideale per definire scheletri strutturali complessi con righe e colonne predefinite indipendentemente dal contenuto.
* **Casi d'uso tipici**: Griglia dei progetti, scheletro generale della pagina, allineamento di card.
```css
.grid {
    display: grid;
    /* Crea colonne automatiche responsive che si adattano allo schermo (minimo 250px ciascuna) */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px; /* Spazio uniforme tra le celle della griglia */
}
```

---

## 3. Fluidità e Responsività (Responsive by Default)
Un'interfaccia web deve adattarsi a schermi che vanno dai 320px (smartphone) ai 3000px+ (monitor desktop). 
* **Evita dimensioni fisse per la larghezza**: 
  * *No*: `width: 450px;` (strborderà su schermi piccoli).
  * *Sì*: `width: 100%; max-width: 450px;` (prende tutto lo spazio disponibile ma non supera mai i 450px).
* **Evita altezze fisse**: Lascia che sia il contenuto a determinare l'altezza tramite il `padding`. Usa `min-height` se hai bisogno di un'altezza minima.
  * *No*: `height: 300px;` (il testo traboccherà se ingrandito o se va a capo).
  * *Sì*: `min-height: 300px;` o semplicemente gestisci lo spazio interno con `padding-block: 40px;`.

---

## 4. Tipografia Fluida ed Accessibile (`rem` e `clamp`)
* **Usa `rem` per i testi**: `1rem` equivale alla dimensione del font impostata dall'utente nel browser (di default `16px`). Se un utente ipovedente aumenta la dimensione del font nelle impostazioni del browser, il tuo sito si adatterà automaticamente.
  * `font-size: 1rem;` (16px)
  * `font-size: 1.25rem;` (20px)
* **CSS `clamp()`**: Permette di definire testi fluidi che si rimpiccioliscono su mobile e si ingrandiscono su desktop in modo continuo, senza dover riempire il foglio di media queries.
  * Formula: `clamp(valore-minimo, valore-dinamico, valore-massimo)`
  ```css
  h2 {
      /* Minimo 32px (2rem), calcolo dinamico basato sul 5% dello schermo, massimo 44.8px (2.8rem) */
      font-size: clamp(2rem, 5vw, 2.8rem);
  }
  ```

---

## 5. Unità di Altezza Dinamiche (`dvh` vs `vh`)
Sui browser per smartphone, la barra degli indirizzi e i controlli di navigazione (in basso o in alto) compaiono e scompaiono dinamicamente durante lo scroll. L'unità standard `100vh` non tiene conto di questo spazio, causando il taglio di elementi posizionati in fondo alla schermata.
* **Soluzione**: Usa **`100dvh`** (Dynamic Viewport Height). Il browser ricalcolerà l'altezza esatta occupabile in base allo stato delle barre di sistema.
```css
.hero {
    min-height: 100dvh; /* Copre sempre l'intera area visibile reale dello schermo */
}
```

---

## 6. Risoluzione di Bug Layout Comuni
* **Bloccare il wrap del testo**: Se hai testi (come il logo del sito o label di pulsanti) che non devono mai spezzarsi andando a capo su schermi stretti:
  ```css
  .logo-text {
      white-space: nowrap;
  }
  ```
* **Forzare il restringimento nei contenitori Flex/Grid**: Per impostazione predefinita, gli elementi flessibili non si restringono oltre la dimensione minima del loro contenuto. Se contengono parole molto lunghe o immagini, potrebbero "spingere" e far traboccare il layout.
  * **Soluzione**: Imposta `min-width: 0;` (o `min-inline-size: 0;`) sull'elemento flessibile figlio per consentirgli di ridursi liberamente fino a occupare solo lo spazio assegnato.
  ```css
  .card {
      width: 100%;
      min-width: 0; /* Impedisce l'overflow orizzontale su schermi stretti */
  }
  ```

---

## 7. Flusso di Lavoro Consigliato per Questo Progetto
Questo sito adotta una struttura a componenti HTML statici sincronizzati tramite script.

1. **Header e Footer**: Non modificarli direttamente nelle singole pagine HTML (es. `index.html`, `trasparenza.html`), poiché verrebbero sovrascritti al successivo aggiornamento.
   * Modifica l'HTML dell'header in `components/header.html`.
   * Modifica l'HTML del footer in `components/footer.html`.
2. **Stili**: Scrivi o modifica le classi all'interno di `style.css`.
3. **Sincronizzazione**: Dopo aver modificato l'header, il footer o il CSS, esegui sempre dal terminale nella cartella radice:
   ```bash
   node update-components.js
   ```
   Questo script inietterà i componenti aggiornati in tutte le pagine HTML del sito e calcolerà un hash di cache-busting univoco per `style.css` (es. `style.css?v=1.5.a4533d7d`) forzando i browser dei visitatori a scaricare immediatamente il foglio di stile aggiornato senza mostrare vecchie versioni in cache.
