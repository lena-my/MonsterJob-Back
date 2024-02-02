const express = require("express");
const { getPoleEmploiOfferByExperience } = require("../utils/poleEmploi");

const router = express.Router();

router.get("/:experience", async function (req, res) {
  try {
    const idOffer = req.params.id;
    const offerDetails = await getPoleEmploiOfferById(idOffer);

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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue pendant la récupération de l'offre d'emploi."
      );
  }
});

module.exports = router;
