'use strict';

var cheerio = require('cheerio')
  , request = require('request')
  , fs      = require('fs');

/**
 * The uri of the praying times
 * @type {String}
 */
const URI = 'http://aliftaa.jo/PrayTimes.ashx';

/**
 * Titles of praying periods
 * @type {Array}
 */
var titles = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

////////////////////////////////////////////////////
// Get Data ////////////////////////////////////////
////////////////////////////////////////////////////

request(URI, function(error, response, body) {

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
