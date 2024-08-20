import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
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
        return /\d{10}/.test(v); // Assumes phone number is 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
}, {
  timestamps: true, 
});
export default requestSchema;
