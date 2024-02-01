const express = require("express");
const { getPoleEmploiOffers } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", function (req, res) {
  getPoleEmploiOffers(function (offers) {
    if (offers.resultats) {
      const results = offers.resultats.map(elem => ({ 
        id: elem.id,
        name: elem.intitule,
        level: elem.experienceExige,
        date: elem.dateCreation,
      }))
      res.send(results);
    } else {
      res.send("no offers found");
    }
  });
});

module.exports = router;
