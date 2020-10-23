// Create a new date instance dynamically with JS
import {updateUI} from "./updateUI";
import {
    postData,
    getData
} from "./helpers";
import {getCountdown} from "../index";

// Add event listener to 'generate' button
const generator = document.getElementById('generate');

generator.addEventListener("click", async function fetchWeatherData() {
    // Retrieve the user data entered
    const city = document.getElementById('city').value;

    // Start countdown clock from user's chosen date
    getCountdown();

    // Send object containing city
    const userData = {
        city
    }

    const geoData = await postData('http://localhost:8000', userData).then(async (res) => {

        await getData('http://localhost:8000/data')

            .then(async (response) => { // After this has been processed on the back end, get the new data

                const res = await response.text();
                return updateUI(res); // Programmatically update the 'recent entry' section

            })
    })

});


// Give user option to remove saved local storage data
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener('click', function () {
    localStorage.clear()
})

export {
    postData,
    getData,
    generator,
    deleteButton
}