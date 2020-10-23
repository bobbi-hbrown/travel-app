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

export {
    postData,
    getData,
    updateUI
}
