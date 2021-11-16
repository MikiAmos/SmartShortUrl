const {
    v1:uuidv1,
    v4:uuidv4,
} = require('uuid');
function ShortUrlUtil(){

}

ShortUrlUtil.prototype.getShortUrlWithUUID=function(){
   return uuidv1();
}

ShortUrlUtil.prototype.getShortUrlWithNUmbersOnly=function(min,max){
  this.min = min || 0;
  this.max = max || 1000000;
  var result =  Math.floor(Math.random()*(this.max- this.min)+ this.min).toString();
  return result;
}

module.exports = ShortUrlUtil;