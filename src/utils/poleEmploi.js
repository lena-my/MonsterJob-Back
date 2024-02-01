const https = require("https");
require("dotenv").config();

// Récupérer le token d'accés à l'API de pole emploi
function getAccessToken(callback) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: `application_${CLIENT_ID} api_offresdemploiv2 o2dsoffre`,
  }).toString();

  const options = {
    hostname: "entreprise.pole-emploi.fr",
    port: 443,
    path: "/connexion/oauth2/access_token?realm=%2Fpartenaire",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", (token) => {
      callback(JSON.parse(token));
    });
  });

  req.write(body);
  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

// Récupérer les offres d'emploi de l'API pole emploi
exports.getPoleEmploiOffer = function getPoleEmploiOffer(callback) {
  getAccessToken(function (token) {
    // Générer un nombre aléatoire entre 0 et 1000 pour récupérer une offre aléatoire
    const randomizer = Math.floor(Math.random() * 1000);
    const pathOffers = `/partenaire/offresdemploi/v2/offres/search?range=${randomizer}-${randomizer}&codeROM=M1810&departement=34&sort=1`;
    const options = {
      hostname: "api.pole-emploi.io",
      port: 443,
      path: pathOffers,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token.access_token,
      },
    };

    const req = https.request(options, (res) => {
      let offersInParts = [];

      res.on("data", (data) => {
        offersInParts.push(data);
      });

      res.on("end", (endOfRequest) => {
        // Reconstruction des données à partir du buffer de la réponse
        const body = Buffer.concat(offersInParts);
        const result = JSON.parse(body);
        callback(result);
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
};
