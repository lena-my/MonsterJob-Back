const https = require("https");
require("dotenv").config();

let accessToken = null;

// Récupérer le token d'accés à l'API de pole emploi
function getAccessToken() {
  return new Promise((resolve, reject) => {
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
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          // Résous la promesse avec le token
          resolve(JSON.parse(data).access_token);
        } catch (error) {
          // Rejete la promesse avec l'erreur
          reject(error);
        }
      });
    });

    req.on("error", reject);

    req.write(body);
    req.end();
  });
}

// Récupérer les offres d'emploi de l'API pole emploi
exports.getPoleEmploiOffer = async function getPoleEmploiOffer() {
  try {
    if (accessToken === null) {
      accessToken = await getAccessToken();
    }

    const pathOffers = `/partenaire/offresdemploi/v2/offres/search?codeROME=M1810&departement=34&sort=1`;
    const options = {
      hostname: "api.pole-emploi.io",
      port: 443,
      path: pathOffers,
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    return await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let offersInParts = [];

        res.on("data", (data) => {
          offersInParts.push(data);
        });

        res.on("end", () => {
          // Reconstruction des données à partir du buffer de la réponse
          const body = Buffer.concat(offersInParts);
          const result = JSON.parse(body);
          resolve(result);
        });
      });

      req.on("error", reject);
      req.end();
    });
  } catch (error) {
    throw error;
  }
};

// Récupérer une offre d'emploi de l'API pole emploi à partir d'un id
exports.getPoleEmploiOfferById = async function getPoleEmploiOfferById(id) {
  try {
    if (accessToken === null) {
      accessToken = await getAccessToken();
    }

    const pathOffers = `/partenaire/offresdemploi/v2/offres/${id}`;
    const options = {
      hostname: "api.pole-emploi.io",
      port: 443,
      path: pathOffers,
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let offersInParts = [];

        res.on("data", (data) => {
          offersInParts.push(data);
        });

        res.on("end", () => {
          // Reconstruction des données à partir du buffer de la réponse
          const body = Buffer.concat(offersInParts);
          const result = JSON.parse(body);
          resolve(result);
        });
      });

      req.on("error", reject);
      req.end();
    });
  } catch (error) {
    throw error;
  }
};

// Récupérer les offres d'emploi de l'API
exports.getPoleEmploiOffers = async function getPoleEmploiOffers() {
  try {
    if (accessToken === null) {
      accessToken = await getAccessToken();
    }

    const pathOffers = `/partenaire/offresdemploi/v2/offres/search?codeROME=M1810&departement=34&sort=1`;
    const options = {
      hostname: "api.pole-emploi.io",
      port: 443,
      path: pathOffers,
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let offersInParts = [];

        res.on("data", (data) => {
          offersInParts.push(data);
        });

        res.on("end", () => {
          // Reconstruction des données à partir du buffer de la réponse
          const body = Buffer.concat(offersInParts);
          const result = JSON.parse(body);
          resolve(result);
        });
      });

      req.on("error", reject);
      req.end();
    });
  } catch (error) {
    throw error;
  }
};

// Filtrer des offres d'emploi par experience
exports.getPoleEmploiOffersByExperience =
  async function getPoleEmploiOffersByExperience(experience) {
    try {
      if (accessToken === null) {
        accessToken = await getAccessToken();
      }

      const pathOffers = `/partenaire/offresdemploi/v2/offres/search?codeROME=M1810&departement=34&sort=1&experienceExigence=${experience}`;
      const options = {
        hostname: "api.pole-emploi.io",
        port: 443,
        path: pathOffers,
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let offersInParts = [];

          res.on("data", (data) => {
            offersInParts.push(data);
          });

          res.on("end", () => {
            // Reconstruction des données à partir du buffer de la réponse
            const body = Buffer.concat(offersInParts);
            const result = JSON.parse(body);
            resolve(result);
          });
        });

        req.on("error", reject);
        req.end();
      });
    } catch (error) {
      throw error;
    }
  };
