const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String,
  },
  noteUrl: {
    filename: String,
    url: String,
  },
  branch: {
    type: String,
    default: "",
  },
  sem: {
    type: String,
    default: "",
  },
  
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Mongoose middleware
// listingSchema.post("findOneAndDelete", async(listing)=>{
//     if(listing){
//         await Review.deleteMany({_id:{$in:listing.reviews}})
//     }
// })

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
