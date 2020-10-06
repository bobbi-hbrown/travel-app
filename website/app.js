// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Update the 'most recent' section with our user's data
function updateUI(data) {

    data = JSON.parse(data);
    // Select relevant elements to be updated
    const date = document.getElementById("date");
    const temp = document.getElementById("temp");
    const content = document.getElementById("content");
    const mood = document.getElementById("mood")

    // Set the inner text to equal our parsed response from the user & the API
    date.innerText = newDate;
    temp.innerText = data["temp"];
    content.innerText = data["weather"][0]["description"];
    mood.innerText = data["feelings"];
}

// Make a get request
async function getData(url) {
    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        console.log("Error fetching API data!", error);
    }
}

// Make a post request
async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        credentials: 'include', // default - allows requests from same URL only
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


// Add event listener to 'generate' button
const generator = document.getElementById('generate');

generator.addEventListener("click", async function fetchWeatherData() {

    // Retrieve the user data entered
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const userData = {
        zipcode,
        feelings,
    }
    // Send user data to the post route
    const weatherData = await postData('/', userData).then(async (res) => {
        console.log(res);
        await getData('/data').then(async (response) => { // After this has been processed on the back end, get the new data
            res = await response.text();
            return updateUI(res); // Programatically update the 'recent entry' section
        })
    })

});

