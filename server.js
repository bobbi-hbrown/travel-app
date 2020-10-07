// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const result = require('dotenv').config()

const fetch = require('node-fetch');
const APIkey = process.env.APIkey; // Store API key in environment variables for security

// Install dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Port number for our server to use
const port = 3000;

// Get request to the Weather Map API with the user's zip code
async function weatherData(data) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${data.data.zipcode}&appid=${APIkey}&units=imperial`;

    return await fetch(url).then(
        function (response) {
            return new Promise(resolve => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    console.log('success!');
                    return resolve(data)
                });
            })

        }).catch(function (err) {
        console.log('Fetch Error!', err);
    });
}

// Setup Server
app.get('/data', (req, res) => {
    res.send(projectData);
})

// After recieving user's post data, update the projectData object
app.post('/', async (req, res) => {
    try {
        const data = await weatherData(req.body);
        projectData["feelings"] = req.body["data"]["feelings"];
        projectData["weather"] = data["weather"];
        projectData["temp"] = data["main"]["temp"];
        res.send(data);
    } catch (err) {
        res.send(`Error making POST request: ${err}`);
    }
})

// Run app on port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})