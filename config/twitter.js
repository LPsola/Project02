const Twitter = require('twitter');
const axios = require('axios');
const ExifImage = require('exif').ExifImage;


const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret:process.env.access_token_secret
});

function extractExif(imagelocation){
    try {
      new ExifImage(imagelocation, function (error, exifData) {
        if (error)
        console.log('Exif extraction error: '+error.message);
        else
        var coordinates = [exifData.gps.GPSLongitude, exifData.gps.GPSLatitude]
        return coordinates
      });
    } catch (error) {
      console.log('Exif extraction error: ' + error.message);
    }
    finally{
      return
    }
  }

function tweetPicture(tweet, imagePath){
    var coordinates;
    // Make post request on media endpoint. Pass file data as media parameter
    axios.get(imagePath, { responseType: 'arraybuffer' })
        .then(({ data }) => {
            coordinates = extractExif(data)
            return client.post('media/upload', {media: data});
        })
        .then((media) => {
            // If successful, a media object will be returned.
            // console.log(media);
                        
            // Lets tweet it
            const status = {
                status: tweet,
                media_ids: media.media_id_string // Pass the media id string
            }

            return client.post('statuses/update', status, 
            function(error, tweets, response) {
                if (!error) {
                  console.log("========================================================")
                  console.log(tweets.id);
                  console.log("========================================================")

                }
              });
        })
        .then((tweet) => {
            return coordinates
        })
        .catch((err) => {
            console.log('twitter error', err)
        });
        return coordinates
}



module.exports = {tweetPicture}

/*
===================================================
For tweeting texts only. 
Keep just in case, don't want to go looking for it
===================================================
*/

// function tweet(text, latitude, longitude){
//     client.post('statuses/update', 
//     {
//         status: text,
//         truncated: true,
//         lat: 37.7821120598956,
//         long:  -122.400612831116,
//         display_coordinates: true,
//     },
//     (error, tweet, response)=>{
//         if(error){
//             throw error;
//         }
//         console.log("Error: ", error)
//         // console.log("Tweet: ", tweet);  // Tweet body. 
//         // console.log("Response: ", response);  // Raw response object. 
//     })
    
// }
