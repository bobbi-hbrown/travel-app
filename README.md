The udacity travel app! Simply enter a city name and future date for help planning your dream trip.

For the additional feature I chose to use the local storage option.

To run this project in development, run:

`node src/server/server.js
`
To start the development server. Then in another tab run:

`npm run build-dev
`

To run this project in production mode, simply run
`npm run build-prod`, to create the dist folder, followed by `npm start`.

This project requires a .env file containing Meaning Cloud API keys to successfully authenticate each request. The yaml file must be in the format of
`APIkey=XXXXXXXXXXXXXXXX`


