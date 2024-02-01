const express = require("express");
const { getPoleEmploiOfferById } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/:id", function (req, res) {
    const idOffer = req.params.id;
    getPoleEmploiOfferById(idOffer, function (offerDetails) {
      if (offerDetails) {
        const offer = {
          name: offerDetails.intitule,
          level: offerDetails.experienceExige,
          date: offerDetails.dateCreation,
        };
        res.send(offer);
      } else {
        res.send("Aucun détail trouvé pour cette offre.");
      }
    });
});

module.exports = router;
