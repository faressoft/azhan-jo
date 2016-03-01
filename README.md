# Azhan Jo

Get azhan times in Amman

# Install Globally

To be able to get azhan's times in your cli you have to install the package globally

`npm install azhan-jo -g`

To fetch and print prayer times you can use one of the commands

`azhan` or `adan` or `adhan`

# Usage

Install the package to your project

`npm install azhan-jo`

Sample Code

```js
var azhan = require('azhan-jo');

azhan.getPrayerTimes().then(function(results) {
  console.log(results);
}).catch(function(error) {
  console.log(error);  
});
```
# Methods

### getTitles()
Return an array of prayer titles
['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

```js
console.log(azhan.getTitles());
```

### getPrayerTimes()
Fetch, parse, and return an object of prayer times through `Promise` object.

```js
azhan.getPrayerTimes().then(function(results) {
  console.log(results);
}).catch(function(error) {
  console.log(error);  
});
```

### getPrayerTime(title)
Fetch, parse, and return an the time for a specefic prayer by its title through `Promise` object.

```js
azhan.getPrayerTime('fajr').then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.log(error);  
});
```

# License

This project is under the MIT license, so feel free to use it.