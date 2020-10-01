// Setup empty JS object to act as endpoint for all routes
var projectData = {};

const result = require('dotenv').config()
// const result = dotenv.config()

const fetch = require('node-fetch');
const APIkey = process.env.APIkey;

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

async function weatherData(data) {
    console.log('zip', data.data.zipcode);
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${data.data.zipcode}&appid=${APIkey}`;

    await fetch(url).then(
        function (response) {
            return new Promise(resolve => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    console.log('succesful!', data);
                    return resolve(data)
                });
            })

        }).catch(function (err) {
        console.log('Fetch Error!', err);
    });
}

// Setup Server
app.get('/', (req, res) => {
    res.send(projectData);
})

app.post('/', async (req, res) => {
    try {
        const data = await weatherData(req.body);
        console.log('post data', data);
        projectData["APIdata"] = data;
        res.send(data);
        return data;
        // console.log(`project data console:', ${projectData} data: ${data}`);
    } catch (err) {
        res.send(`Error making POST request: ${err}`);
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})