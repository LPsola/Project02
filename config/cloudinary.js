const express = require('express');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'pictures-from-user-posts',
  allowedFormats: ['jpg', 'png', 'jpeg'],
});



const upload = multer({storage})
module.exports = upload