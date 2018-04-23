const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret
  });

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'pictures-from-user-posts',
//  Validate formats in form submission page
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(null, 'pictures-from-user-posts');
//   }
});

const uploadCloud = multer({ storage: storage }).single('file');
module.exports = uploadCloud;


//For index.js=========================================
// const uploadCloud = require('../config/cloudinary.js');

// router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
//     const { title, description } = req.body;
//     const imgPath = req.file.url;
//     const imgName = req.file.originalname;
//     const newMovie = new Movie({title, description, imgPath, imgName})
//     newMovie.save()
//     .then(movie => {
//       res.redirect('/')
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   });
  