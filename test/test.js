var expect =require('chai').expect;
var ShortUrlDB = require('../models/shortUrlCrud');
var db = new ShortUrlDB('./dbFiles/shortUrls.json');
var Util = require('../utils/shortUrlUtils');
var shortUrlUtil = new Util();
const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

describe('short url croud tests',function(){
 describe('#getAll',function(){
     it('should return items from the json file',function(){
       var shortUrls = db.getAll();
     expect(shortUrls).to.be.an('array');
     });
 });

 describe('#save',function(){
     it('should return the short url',function(){
         var shortUrl = db.save({
            full:{
                fromTime:0,
                toTime:8,
                fullUrl:"http://google.com"
            },
            short:'12345',
            clicks:0
         });
         expect(shortUrl).to.equal('12345');
     })
 });

 describe('#findOne',function(){
     it('shold return one element from the array',function(){
         var element = db.findOne('12345');
         expect(element).not.be.equal(null);
     });
 });
 describe('#update',function(){
    it('shold update single element in the array',function(){
        var element = db.findOne('12345');
        const currentClicks = element.clicks;
        element.clicks+=1;
        db.update();
        element = db.findOne('12345');
        expect(element.clicks).to.be.equal(currentClicks +1);
    });
});

})

describe('short url utils tests',function(){
    describe('#getShortUrlWithUUID',function(){
        it('should return uuid',function(){
         const uuid = shortUrlUtil.getShortUrlWithUUID();
         expect(regexExp.test(uuid)).to.be.true;
        });
    });
    describe('#getShortUrlWithNumbers',function(){
        it('should return numbers only',function(){
         const num = shortUrlUtil.getShortUrlWithNUmbersOnly();
         let isnum = /^\d+$/.test(num);
         expect(isnum).to.be.true;
        });
    });
});