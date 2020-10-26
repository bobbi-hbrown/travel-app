// Update the 'most recent' section with our user's data
function updateUI(data) {

    // store our API output to local storage
    localStorage.setItem('items', data);

    // Retrieve previous results from local storage
    data = localStorage.getItem('items');
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

export {updateUI}