const axios = require('axios');

const geocodeAPI = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode"
})

const civicAPI = axios.create({
    baseURL: "https://www.googleapis.com/civicinfo/v2"
})

function getObjOfficials(address){
    const officials = civicAPI.get(
        "/representatives?"+
        `key= ${process.env.google_civic}` +
        `&address=${address}`
    )
    .then(officials => {
        // console.log('data from officials', officials.data)
        return [officials.data.offices, officials.data.officials]
    })
    .catch(err => {
        next(err)
    })
    return officials
}

function getStreetAddress(lat,long){
    const promise = geocodeAPI.get(
        `/json?latlng=${lat},${long}&result_type=street_address`+
        `&key=${process.env.google_geocode}&`
    )
    .then(data => {
        return data.data.results[0].formatted_address
    })
    .catch(err => {
        console.log("Geocode error", err)
    })
    return promise
}

function scrapeNameAndTwitter(arr){
    var officialsArr = []

    function twitterChecker(channelsArr){
        for(let j = 0; j < channelsArr.length; j++){
            if(channelsArr[j].type === "Twitter"){
                return channelsArr[j].id
            }
        }
        return false
    }

    for(let i = 0; i < arr[0].length; i++){
        if(twitterChecker(arr[1][i].channels)){
            var twitter = twitterChecker(arr[1][i].channels)
        } else{
            var twitter= "No twitter"
        }
        let official = [arr[1][i].name + ", " + arr[0][i].name, twitter]
        console.log(official)
        officialsArr.push(official)
    }
    console.log(officialsArr)
}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
module.exports = {getStreetAddress, getObjOfficials, scrapeNameAndTwitter}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
