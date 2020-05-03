const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full : {
    type : String,
    required : true
  },
  short :{
    type : String,
    required : true,
    default : shortId.generate          ///generates the shortened url
  },
  clicks : {
    type : Number,
    required : true,
    default : 0
  },
  date : {
    type : String,
    default : new Date().toUTCString()
  }
});

module.exports = mongoose.model("shortUrl", shortUrlSchema);
