const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

let getOffer = require("./src/routes/getOffer");
let getOffers = require("./src/routes/getOffers");
let getOfferById = require("./src/routes/getOfferById");
let getOffersByExperience = require("./src/routes/getOffersByExperience");

app.use("/getOffer", getOffer);
app.use("/getOffers", getOffers);
app.use("/getOfferById", getOfferById);
app.use("/getOffersByExperience", getOffersByExperience);

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
