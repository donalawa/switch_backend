const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    resetPasswordToken: {
      type: String,
      required: false,
      default: null
    },
    resetPasswordExpire: {
      type: Date,
      required: false
    },
    imageUrl: {
      type: String,
      default: null
    },
    confirmationCode: { 
      type: String, 
      unique: true 
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  });

module.exports = mongoose.model("User",User);