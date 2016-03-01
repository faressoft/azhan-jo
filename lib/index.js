'use strict';

var cheerio = require('cheerio')
  , request = require('request');

/**
 * The uri of the prayer times
 * @type {String}
 */
const URI = 'http://aliftaa.jo/PrayTimes.ashx';

/**
 * Titles of prayers
 * @type {Array}
 */
var titles = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

/**
 * Fetch the data from the uri
 * @return {Promise}
 */
var fetchData = function() {
  
  return new Promise(function(resolve, reject) {
    
    request(URI, function(error, response, body) {

      if (!error && response.statusCode == 200) {
        return resolve(body);
      }

      reject(error);

    });

  });

};

/**
 * Parse prayer data
 * @param  {String} data XML document
 * @return {Object|Null} return null if failed
 */
var parseData = function(data) {
  
  try {

    var times = {};

    // Parse the xml document
    var $ = cheerio.load(data);

    // For each prayer
    $('feed entry title').each(function(index, item) {
      times[titles[index]] = /: (.+)/.exec($(item).text())[1];
    });

    return times;

  } catch(e) {

    return null;

  }

};

/**
 * Get prayer times
 * @return {Promise}
 */
var getPrayerTimes = function() {

  return new Promise(function(resolve, reject) {
    
    fetchData().then(function(data) {

      // Parse prayer times
      var times = parseData(data);

      // Parsed
      if (times) {
        return resolve(times);
      }

      reject(new Error('Parsing is failed'));
    
    }).catch(function(error) {

      reject(error);
      
    });

  });

};

/**
 * Get a time for a specefic prayer by its title
 * @param  {String} title on of (fajr, sunrise, dhuhr, asr, maghrib, isha)
 * @return {Promise} will reject if the title is not valid
 */
var getPrayerTime = function(title) {

  return new Promise(function(resolve, reject) {

    // Check if the passed title is valid
    if (titles.indexOf(title) == -1) {
      return reject(new Error('Title is not valid'));
    }

    getPrayerTimes().then(function(times) {
    
      resolve(times[title]);
    
    }).catch(function(error) {
    
        reject(error);
      
    });

  });

};

/**
 * Return prayer titles
 * @return {Array}
 */
var getTitles = function() {
  
  return titles;

};

////////////////////////////////////////////////////
// Export Module ///////////////////////////////////
////////////////////////////////////////////////////

module.exports = {
  getTitles: getTitles,
  getPrayerTimes: getPrayerTimes,
  getPrayerTime: getPrayerTime
};
