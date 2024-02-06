const express = require("express");
const { getPoleEmploiOffer } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const offerDetails = await getPoleEmploiOffer();
    const nbOffers = offerDetails.resultats.length;

    // Générer un nombre aléatoire entre 0 et nbMax offres
    const randomizer = Math.floor(Math.random() * nbOffers);

    if (offerDetails.resultats[randomizer]) {
      const offer = {
        id: offerDetails.resultats[randomizer].id,
        name: offerDetails.resultats[randomizer].intitule,
        level: offerDetails.resultats[randomizer].experienceExige,
        date: offerDetails.resultats[randomizer].dateCreation,
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
