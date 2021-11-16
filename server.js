const express = require('express');
const app = express();

var Util = require('./utils/shortUrlUtils');
var ShortUrlDB = require('./models/shortUrlCrud');
var ShortUrl = require('./models/shortUrl');
require('./models/urlOverTime');
var db = new ShortUrlDB('./dbFiles/shortUrls.json');
var shortUrlUtil = new Util();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false}))
app.use(express.json());

// get all the shortUrl we saved.
app.get('/' , (req , res)=>{

   const shortUrls= db.getAll();
   const data = JSON.stringify(shortUrls);
   res.send(data);
})
// use uuid
app.post('/u', async (req, res)=>{
   console.log(JSON.stringify(req.body));
  const shortUrl = new ShortUrl(req.body,shortUrlUtil.getShortUrlWithUUID(),0);
  const short = db.save(shortUrl);
  res.send(short);
})
//use numbers only.
app.post('/a1', async (req, res)=>{
   console.log(JSON.stringify(req.body));
   const shortUrl = new ShortUrl(req.body,shortUrlUtil.getShortUrlWithNUmbersOnly(),0);
   const short = db.save(shortUrl);
  res.send(short);
 })
//do the redirect operation and add click.
app.get('/:shortUrl', (req,res)=>{
   var shortUrlInfo = db.findOne(req.params.shortUrl);
   if(shortUrlInfo == null){
      return res.sendStatus(404);
   }
   var date = new Date();
   var current_hour = date.getHours();
   var releventFullUrl =  shortUrlInfo.full.find(x=>(x.fromTime<= current_hour) && (current_hour<=x.toTime));
   if(releventFullUrl==null)
     return res.sendStatus(404);
     shortUrlInfo.clicks +=1;
     db.update();
   res.redirect(releventFullUrl.fullUrl);
})

app.listen(process.env.PORT || 5000);
