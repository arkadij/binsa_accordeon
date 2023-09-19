const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); // To allow cross-origin requests
app.use(express.static(__dirname)); // To serve static files like your HTML, CSS, and client-side JS

app.get("/api/images", (req, res) => {
  const directoryPath = path.join(__dirname, "pics/original");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    res.json(imageFiles);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start the server:", err);
    return;
  }
  console.log(`Server running at http://localhost:${port}/`);
});
