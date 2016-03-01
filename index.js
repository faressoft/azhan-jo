'use strict';

var cheerio = require('cheerio')
  , fs      = require('fs')
  , request = require('request');

/**
 * Titles of praying periods
 * @type {Array}
 */
var titles = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

////////////////////////////////////////////////////
// Get Data ////////////////////////////////////////
////////////////////////////////////////////////////

request('http://aliftaa.jo/PrayTimes.ashx', function(error, response, body) {

  if (!error && response.statusCode == 200) {

    // Parse the xml document
    var $ = cheerio.load(body);

    console.log('--------------------------');
    console.log('--------- Prayer ---------');
    console.log('--------------------------');

    // For each period
    $('feed entry title').each(function(index, item) {
      // Print the title and the time
      console.log(titles[index] + ': ' + /: (.+)/.exec($(item).text())[1]);
    });

  }

});
