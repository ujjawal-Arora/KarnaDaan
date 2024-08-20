import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrls: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); //validation if the phone number is not of 10 digit 
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
}, {
  timestamps: true,
});

export default postSchema;
