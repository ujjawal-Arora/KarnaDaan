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
  category:{
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  wishListed:{
    type:Boolean,
    default:false
},
donated:{
  type:Boolean,
  default:false
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
export  {Post,postSchema};