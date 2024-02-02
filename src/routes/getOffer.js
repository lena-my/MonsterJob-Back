const express = require("express");
const { getPoleEmploiOffer } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const offerDetails = await getPoleEmploiOffer();

    if (offerDetails.resultats[0]) {
      const offer = {
        id: offerDetails.resultats[0].id,
        name: offerDetails.resultats[0].intitule,
        level: offerDetails.resultats[0].experienceExige,
        date: offerDetails.resultats[0].dateCreation,
      };

      res.send(offer);
    } else {
      res.send("Aucun détail trouvé pour cette offre.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue pendant la récupération des offres d'emplois."
      );
  }
});

module.exports = router;
