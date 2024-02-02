const express = require("express");
const { getPoleEmploiOffers } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const offersDetails = await getPoleEmploiOffers();

    if (offersDetails.resultats) {
      const offers = offersDetails.resultats.map((elem) => ({
        id: elem.id,
        name: elem.intitule,
        level: elem.experienceExige,
        date: elem.dateCreation,
      }));
      res.send(offers);
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
