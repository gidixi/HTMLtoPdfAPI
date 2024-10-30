const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const app = express();
const PORT = 3000;


app.get("/convert", (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL mancante");
  }


  const outputPath = path.join("/tmp", "output.pdf");


  const cmd = `/usr/bin/chromium-browser --no-sandbox --headless --disable-gpu --disable-web-security --allow-file-access-from-files --print-to-pdf=${outputPath} ${url}`;

  exec(cmd, (error) => {
    if (error) {
      console.error("Errore nella conversione:", error);
      return res.status(500).send("Errore nella generazione del PDF");
    }

    res.sendFile(outputPath, (err) => {
      if (err) {
        console.error("Errore nell'invio del file:", err);
        res.status(500).send("Errore nell'invio del PDF");
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
