const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json('Hello world ! 👋')
})

//ici nous placerons nos futurs points de terminaison.
/*require('./src/routes/findAllPokemons')(app)
*/

//On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée! Vous pouvez essayer uen autre URL';
    res.status(404).json({message});
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
