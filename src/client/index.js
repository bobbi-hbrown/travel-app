import './styles/style.scss';
import './styles/footer.scss';
import './styles/header.scss';
import './styles/countdown.scss';
import {getCountdown} from "./js/countdown";
import {
    postData,
    getData,
    generator,
    deleteButton
} from "./js/app";

import {updateUI} from "./js/updateUI";

// check to see if data has previously been fetched and saved upon refresh
let items
if (localStorage["items"] != "undefined" && localStorage["items"] != "null") {
    items = localStorage.getItem('items');
    updateUI(items)
} else {
    items = []
}

export {
    getCountdown,
    postData,
    getData,
    generator,
    deleteButton
}

