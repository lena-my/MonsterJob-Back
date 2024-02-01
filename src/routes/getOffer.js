const express = require("express");
const { getPoleEmploiOffer } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", function (req, res) {
  getPoleEmploiOffer(function (offers) {
    if (offers.resultats) {
      const offer = {
        id: offers.resultats[0].id,
        name: offers.resultats[0].intitule,
        level: offers.resultats[0].experienceExige,
        date: offers.resultats[0].dateCreation,
      };
      res.send(offer);
    } else {
      res.send("no offers found");
    }
  });
});

module.exports = router;
