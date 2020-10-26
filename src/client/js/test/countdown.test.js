import {getCountdown} from "./countdown";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<section class="top-section">
    <form>
        <label for="city">I'm going to:</label>
        <input type="text" id="city" name="city" placeholder="city"><br><br>
        <label for="departing">Departing:</label>
        <input type="date" id="departing" name="departing"><br><br>
    </form>
    <button id="generate">Plan my next trip</button>
    <button id="delete" class="hidden">Delete Trip</button>

</section>
<div id="clockdiv" class="hidden">
    <div>
        <span class="days"></span>
        <div class="smalltext">Days</div>
    </div>
    <div>
        <span class="hours"></span>
        <div class="smalltext">Hours</div>
    </div>
    <div>
        <span class="minutes"></span>
        <div class="smalltext">Minutes</div>
    </div>
    <div>
        <span class="seconds"></span>
        <div class="smalltext">Seconds</div>
    </div>
</div>
`);

var datePicker = dom.window.document.querySelector('input[type="date"]').value;
datePicker.innerHTML = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000;

describe('Countdown clock', () => {
    it('should generate a div containing countdown values 14 days from now', () => {
        getCountdown().then(() => {
            var clock = dom.window.document.getElementById("clockdiv");
            var daysSpan = clock.querySelector(".days");
            var hoursSpan = clock.querySelector(".hours");

            expect(daysSpan.innerHTML).toEqual(14);
            expect(hoursSpan.innerHTML).toEqual(23);

        })

    })
})
