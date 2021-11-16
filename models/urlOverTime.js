function UrlOverTime(fromTime,toTime,fullUrl){
  this.fromTime = fromTime
  this.toTime = toTime
  this.fullUrl = fullUrl
}

UrlOverTime.prototype.IsBetweenHours =function (currentHour){
    return (this.from>currentHour< this.to);
}

module.exports = UrlOverTime;

