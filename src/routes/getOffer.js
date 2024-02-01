const express = require("express");
const { getPoleEmploiOffer } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", function (req, res) {
  getPoleEmploiOffer(function (offers) {
    if (offers.resultats) {
      res.send(offers.resultats);
    } else {
      res.send("no offers found");
    }
  });
});

module.exports = router;
