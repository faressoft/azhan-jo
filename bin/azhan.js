#!/usr/bin/env node
 
var azhan = require(__dirname + '/../lib/index.js');

azhan.getPrayerTimes().then(function(result) {

  // For each prayer
  for(var title in result) {
    console.log(title + ': ' + result[title]);
  }

}).catch(function(error) {
  
  console.log('Failed');  
  
});
