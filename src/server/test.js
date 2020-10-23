function handleSubmit(event) {
    event.preventDefault()

// check what text was put into the form field


    localStorage.setItem('items', JSON.stringify(itemsArray))

    Client.checkForName(formText)
    const url = "http://api.mathjs.org/v4/?expr=2%2B3*sqrt(4)";

    console.log("::: Form Submitted :::")

    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            document.getElementById('results').innerHTML = data.message
        })
}

export {handleSubmit}
