const express = require("express");
const bodyParser = require("body-parser");
const shortUrl = require("./models/urlShortener");    //shortUrl is the model
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-hardik:hardikmongo@hardikurlshort-t04rh.mongodb.net/urlshortener",{useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set("view engine","ejs");              ////sets the templating or view engine to ejs
app.use(bodyParser.urlencoded({extended:true})); ///middleware for parsing bodies from url
app.use(express.static(__dirname+"/public"));   ///defines where the static files are stored

const baseurl = "https://intense-savannah-12271.herokuapp.com/";

app.get("/", async function(req,res){
    res.render("index");
});

app.get("/archives", async function(req,res){             /////archives page
  // const shortUrls = await shortUrl.find();
  const shortUrls = await shortUrl.find().sort({date:-1});
  res.render("archives",{baseurl:baseurl,shortUrls:shortUrls});
});

app.get("/about", function(req,res){               /////about page
  res.render("about");
});

app.get("/shorten", function(req,res){
  res.redirect("/");
});

app.post("/shorten", async function(req,res){
  let longUrl = req.body.longUrl;
  await shortUrl.create({full : longUrl});
        ///waits till shortUrl.create completes execution
  let shortar = await shortUrl.find({full: longUrl});
  let short = shortar[shortar.length-1];
  res.render("shorten",{shortenedUrl:baseurl + short.short, longUrl:longUrl});
});

app.get("/:short", async (req,res)=>{
    const short = await shortUrl.findOne({short: req.params.short});
    if(short == null) return res.render("error");

    short.clicks++ ;
    short.save() ;
    res.redirect(short.full) ;
});


app.listen(process.env.PORT || 3000, ()=>{
  console.log("server running")
});
