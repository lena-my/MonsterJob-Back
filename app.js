const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev")).use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello world ! 👋");
});

let getOffer = require("./src/routes/getOffer");
let getOfferById = require('./src/routes/getOfferById')

app.use("/getOffer", getOffer);
app.use('/getOfferById', getOfferById);

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur http://localhost:${port}`
  )
);
