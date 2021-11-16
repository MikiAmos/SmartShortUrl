const fs = require('fs');
let shortUrls = [];

function ShortUrlCRUD(filePath){
  this.filePath = filePath;
}

ShortUrlCRUD.prototype.getAll = function(){
 var stringData = fs.readFileSync(this.filePath).toString();
 shortUrls = [];
if(stringData!=null && stringData!= ''){
 let arrayData = JSON.parse(stringData);
 for(let i  in arrayData)
     shortUrls.push(arrayData[i]);
}
 return shortUrls;
}
ShortUrlCRUD.prototype.save= function(shortUrl){
 shortUrls.push(shortUrl);
 this.update();
 return shortUrl.short;
}

ShortUrlCRUD.prototype.findOne= function(shortUrl){
    if(shortUrl == undefined || shortUrls.length == 0){
        this.getAll();
    }
    return shortUrls.find(x=>x.short === shortUrl);
}

ShortUrlCRUD.prototype.update=function(){
    var data = JSON.stringify(shortUrls);
    fs.writeFileSync(this.filePath,data,(err)=>{
        if(err)
          throw err;
    })
}

ShortUrlCRUD.prototype.delete=function(){

}



module.exports= ShortUrlCRUD;

