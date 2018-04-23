const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required: true},
  email: {type:String, required: true, unique: true},
  encryptedPassword: {type:String, required: true},
  twitter: {type:String},
  userLocation: {type:String},
  role: {
    type: String,
    enum: ["normal", "admin"],
    default: "normal",
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',//Will count as "Member Since" field
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
