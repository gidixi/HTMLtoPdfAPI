
# HTML to PDF API

Questa applicazione è un'API REST sviluppata in Node.js che consente di convertire una pagina web (URL) in un PDF utilizzando **Chromium in modalità headless**. È containerizzata in Docker per una distribuzione semplice e veloce.

## Funzionalità

- **Converti URL in PDF**: L'API riceve un URL e restituisce un file PDF della pagina.
- **Headless Chrome**: Utilizza Chromium in modalità headless, configurato con tutte le opzioni necessarie per la conversione.
- **Alpine Linux**: Utilizza un'immagine Docker basata su Alpine Linux, ottimizzata per essere leggera.

## Come Funziona

1. L'utente invia una richiesta HTTP GET all'endpoint `/convert` con un parametro `url`.
2. Il server Node.js esegue **Chromium** in modalità headless per renderizzare l'URL e generare il PDF.
3. Il PDF viene inviato come risposta al client.

## Prerequisiti

- **Docker**: Assicurati di avere Docker installato sul sistema.

## Configurazione ed Esecuzione

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-username/html-to-pdf-api.git
   cd html-to-pdf-api
   ```

2. **Costruisci l'immagine Docker**:
   ```bash
   docker build -t html-to-pdf-api .
   ```

3. **Esegui il container**:
   ```bash
   docker run -p 3000:3000 html-to-pdf-api
   ```

L'API sarà disponibile all'indirizzo `http://localhost:3000`.

## Utilizzo dell'API

Per convertire un URL in PDF, invia una richiesta GET a `/convert` con un parametro `url`. Esempio:

```bash
curl "http://localhost:3000/convert?url=http://esempio.com" --output output.pdf
```

Questo comando genera un PDF della pagina `http://esempio.com` e lo salva come `output.pdf`.

## Endpoint API

- **GET** `/convert?url=<URL>`
  - **Parametro**: `url` (obbligatorio) - L'URL della pagina da convertire in PDF.
  - **Risposta**: PDF della pagina specificata.

## Dettagli Tecnici

- **Chromium Headless**: La conversione utilizza `chromium-browser` con le opzioni:
  - `--no-sandbox`: Disabilita il sandboxing, utile per container Docker.
  - `--headless`: Esegue Chrome senza interfaccia.
  - `--disable-gpu`: Disabilita l'accelerazione hardware, non necessaria in modalità headless.
  - `--disable-web-security` e `--allow-file-access-from-files`: Permettono di gestire file locali senza restrizioni CORS.
  - `--print-to-pdf`: Specifica il percorso di output per il PDF generato.

## Problemi Comuni

- **Permessi e sandboxing**: In ambienti Docker, il sandboxing può causare errori, quindi l'opzione `--no-sandbox` è inclusa.
- **Errori di accesso al file**: Se il PDF non viene generato correttamente, verifica i permessi della directory `/tmp` nel container.

## Licenza

Questo progetto è open-source e distribuito sotto licenza MIT.  
Se ti è stato utile, considera di mettere una stella su GitHub! ⭐
