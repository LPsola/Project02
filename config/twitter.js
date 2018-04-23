const Twitter = require('twitter');
const fs = require('fs');

const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret:process.env.access_token_secret
});

function chunkPictureForTwitter(imagePath){
    
    initUpload() // Declare that you wish to upload some media
    .then(appendUpload) // Send the data for the media
    .then(finalizeUpload) // Declare that you are done uploading chunks
    .then(mediaId => {
        // You now have an uploaded movie/animated gif
        // that you can reference in Tweets, e.g. `update/statuses`
        // will take a `mediaIds` param.
    });
    
    
    
    
    
    
    
    
}
module.exports = client;

//For index.js============================================
// const Twitter = require('twitter');
// const fs = require('fs');
//const client = require('../config/twitter');
// client.post('statuses/update', 
// {
//   status: tweet,
//   lat:50 + 49/60 + 8.592/3600,
//   long:  0-8/60-12.45/3600,
//   display_coordinates: true,
// },
// (error, tweet, response)=>{
//   // if(error){
//   //     throw error;
//   // }
//   console.log("Error: ", error)
//   console.log("Tweet: ", tweet);  // Tweet body. 
//   // console.log("Response: ", response);  // Raw response object. 
// })