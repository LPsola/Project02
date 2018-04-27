const Twitter = require('twitter');
const axios = require('axios');
const ExifImage = require('exif').ExifImage;


const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret:process.env.access_token_secret
});


function dmsToDecimalCoordinates(NSEW, dmsArray){
    var decimalCoordinates = dmsArray[0] + dmsArray[1]/60 + dmsArray[2]/3600
    switch(NSEW){
        case 'N':
        case 'E':
        return decimalCoordinates.toFixed(6)
        case 'S':
        case 'W':
        return -decimalCoordinates.toFixed(6)
    }
}
function extractExif(imagelocation){
    const exifPromise =
        new Promise((yes, no) => {
            try {
              new ExifImage(imagelocation, function (error, exifData) {
                if (error) {
                    console.log('Exif extraction error: '+error.message);
                    no(error);
                }
                else {
                    yes([
                        dmsToDecimalCoordinates(exifData.gps.GPSLatitudeRef,exifData.gps.GPSLatitude),
                        dmsToDecimalCoordinates(exifData.gps.GPSLongitudeRef,exifData.gps.GPSLongitude)
                    ]);
                }
              });
            } catch (error) {
                console.log('Exif extraction error: ' + error.message);
                no(error);
            }
        });

    return exifPromise;
}

function megaPicture(tweet, imagePath){
    const megaPromise =
        // Make post request on media endpoint. Pass file data as media parameter
        axios.get(imagePath, { responseType: 'arraybuffer' })
            .catch((err) => {
                console.log('axios error', err);
            })
            .then(({ data }) => {
                const usePicturePromise =
                    Promise.all([
                        extractExif(data),
                        tweetPicture(tweet, data)
                    ]);
                return usePicturePromise;
            });

    return megaPromise;
}

function tweetPicture(tweet, imageData) {
    const twitterPromise =
        client.post('media/upload', {media: imageData})
            .then((media) => {
                            
                // Lets tweet it
                const status = {
                    status: tweet,
                    media_ids: media.media_id_string // Pass the media id string
                }

                return client.post('statuses/update', status);
            })
            .then((tweet) => {
                 return tweet.id_str
            })
            .catch((err) => {
                console.log('twitter error', err)
            });
    return twitterPromise;
}

function deleteTweet(tweetId){
    const id = tweetId.to
    client.post(`statuses/destroy/${tweetId}.json` , function(error, tweet, response) {
        if (error) {
          console.log("Error in deleting tweet");
        }
      });
}

module.exports = {megaPicture, deleteTweet}

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
