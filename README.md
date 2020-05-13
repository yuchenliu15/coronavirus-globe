# COVID19 (Coronavirus) Globe Visualization Live
COVID19 Globe Visualization Live is a visualizaton of COVID19 on a globe. Data points at each location can represent number of confirmed cases, deaths, or cured cases. The height of each data bar represents its proportion relative to all other locations. All data are updated every hour to maintain accuracy.

## Built with
- HTML/CSS/Javascript
- Will use Node.js
- Three-globe three.js library
- Google Cloud Geocoding API
- DXY-COVID-19-Crawler by BlankerL (COVID19 data API)

## Things I learned
- Deep understanding in asynchronous JavaScript programming (dealing with promises) in fetching and processing data
- Work with APIs with efficiency: requests limits, lag, check data's validity
- Parse and clean data

## Visuals
![](readme_src/globe.png)

## Notes
- sending data to client side js for three.js to render
    - events and sockets
    - OR templates to pass data to html 