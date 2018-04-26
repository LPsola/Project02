const axios = require('axios');

const civicAPI = axios.create({
    baseURL: "https://www.googleapis.com/civicinfo/v2"
})

const geocodeAPI = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/"
})

function getObjOfficials(){
    civicAPI.get(
        "/representatives?"+
        `key= ${process.env.google_civic}` +
        "&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS"
    )
    .then(data => {
        console.log('data',data)
    })
    .catch(err => {
        next(err)
    })
}
function getStreetAddress(lat,long){
    civicAPI.get(
        `/json?latlng=${lat},${long}`+
        `&key= ${process.env.google_geocode}`
    )
    .then(data => {
        console.log('data',data)
    })
    .catch(err => {
        next(err)
    })
}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
module.exports = getObjOfficials;
