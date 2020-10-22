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
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin', // default - allows requests from same URL only
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}), // body data type must match "Content-Type" header
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch( error => {
        return("Error posting data to the server!", error);
    })
}


// Update the 'most recent' section with our user's data
function updateUI(data) {

    // store our API output to local storage
    localStorage.setItem('items', data);

    // Retrieve previous results from local storage
    data = JSON.parse(localStorage.getItem('items'));
    // Select relevant elements to be updated
    const longitude = document.getElementById("longitude");
    const latitude = document.getElementById("latitude");
    const image = document.getElementById("image");
    const city = document.getElementById("city-name");
    const weather = document.getElementById("weather");
    city.innerHTML = `<p>My trip to:</p> ${data["city"]}`;
    longitude.innerHTML = `<p>Longitude:</p> ${data["longitude"]}`;
    latitude.innerHTML = `<p>Latitude:</p> ${data["latitude"]}`;
    weather.innerHTML = `<p>The weather is going to be:</p> ${data["weather"]}`;
    image.src = data["image"];

    // Make 2nd section, countdown clock and save button visible
    const hiddenElements = document.getElementsByClassName("hidden");
    [...hiddenElements].forEach(element => {
        element.classList.remove("hidden");
    })
}

export {
    postData,
    getData,
    updateUI
}
