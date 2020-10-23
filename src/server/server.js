// Setup empty JS object to act as endpoint for all routes
let projectData = {};

require('dotenv').config()
const path = require('path');

const fetch = require('node-fetch');

// Store API key in environment variables for security
const userName = process.env.userName;
const weatherbitKey = process.env.weatherbitKey;
const pixabayKey = process.env.pixabayKey;

// Install dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
app.use(express.static('dist'));
app.use(cors())

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize the main project folder

// Port number for our server to use
const port = 8000;

// Get request to the Weather Map API with the user's zip code
async function fetchData(url) {
    return await fetch(url).then(
        function (response) {
            return new Promise(resolve => {
                console.log(response.status)
                if (response.status !== 200) {
                    return ('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    return resolve(data)
                });
            })

        }).catch(function (err) {
        console.log('Fetch Error!', err);
    });
}

// Send index page when user requests root
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
})

// Send api data to be parsed in front end
app.get('/data', (req, res) => {
    res.send(projectData);
})

// After receiving user's post data, update the projectData object
app.post('/', async (req, res) => {
    try {
        const city = req.body.data.city;
        const geoUrl = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&username=${userName}`;
        const geoData = await fetchData(geoUrl);
        const firstResult = geoData["postalCodes"][0]
        projectData["city"] = city;
        projectData["longitude"] = firstResult["lng"];
        projectData["latitude"] = firstResult["lat"];

        const weatherUrl = `http://api.weatherbit.io/v2.0/current?key=${weatherbitKey}&city=${city}`
        const weatherData = await fetchData(weatherUrl);
        projectData["weather"] = weatherData["data"][0]["weather"]["description"];

        const imageUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${city}&safesearch=true&editors_choice=true&orientation=horizontal`;
        const imageData = await fetchData(imageUrl);
        projectData["image"] = imageData["hits"][0]["webformatURL"];
        res.send(imageData);

    } catch (err) {
        res.send(`Error making POST request: ${err}`);
    }
})

// Run app on port 8000
app.listen(port, () => {
    console.log(`Travel app listening at http://localhost:${port}`)
})