/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function getData(url) {
    const response = await fetch(url);
    console.log('resp object', response);
    return response;

    // try {
    //     const newData = await response.json();
    //     console.log('new data: ', newData);
    //     return newData
    // } catch (error) {
    //     console.log("error", error);
    //     // appropriately handle the error
    // }
}

/* Function to POST data */
async function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include', // default - allows requests from same URL only
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}), // body data type must match "Content-Type" header
    });
    console.log(response);

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


// add event listener to post data
const generator = document.getElementById('generate');

generator.addEventListener("click", async function fetchWeatherData() {
    // retrieve the data entered
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const userData = {
        zipcode,
        feelings,
    }

    const weatherData = await postData('/', userData).then(async() => {
        await getData('/');
    })


});

