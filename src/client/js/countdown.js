// Set the date we're counting down to
// Inspired by demo on w3schools
function getCountdown(date) {
    var dateControl = document.querySelector('input[type="date"]').value;
    var countDownDate = new Date(dateControl).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="clockdiv"
        var clock = document.getElementById("clockdiv");
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        daysSpan.innerHTML = days;
        hoursSpan.innerHTML = ('0' + hours).slice(-2);
        minutesSpan.innerHTML = ('0' + minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + seconds).slice(-2);


        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("clockdiv").innerHTML = "EXPIRED";
        }
    }, 1000);
}

export {getCountdown}