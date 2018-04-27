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
        return officials.data
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



function singlePolitician(array, n) {
    var officeName = array.offices[n].name;
    var officialIndices = array.offices[n].officialIndices[0];
  
    var politicianName = array.officials[officialIndices].name;
    var politicianChannels = array.officials[officialIndices].channels;
    var twitterHandle = "Official is not on Twitter";
  
    if (array.officials[officialIndices].channels) {
      let officialChannel = array.officials[officialIndices].channels;
      for (let j = 0; j < officialChannel.length; j++) {
        if (array.officials[officialIndices].channels[j].type === "Twitter") {
          twitterHandle = array.officials[officialIndices].channels[j].id;
          break;
        } else {
          twitterHandle = "Official is not on Twitter";
        }
      }
    }
  
    return [
      { officeName: `${politicianName}, ${officeName}` },
      { twitterhandle: twitterHandle }
    ];
  }
  
  function scrapeNameAndTwitter(civicResults) {
    var results = [];
    for (let i = 0; i < civicResults.offices.length; i++) {
      results.push(singlePolitician(civicResults, i));
    }
    // console.log("res ", results);
    return results;
  }


// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
module.exports = {getStreetAddress, getObjOfficials, scrapeNameAndTwitter}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
