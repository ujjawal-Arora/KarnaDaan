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
  category:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  accepted:{
    type: Boolean,
    default:false,
  },
  wishListed:{
    type: Boolean,
    default:false,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},

}, {
  timestamps: true, 
});
const Request=mongoose.model('Request',requestSchema);
export  {requestSchema,Request};
