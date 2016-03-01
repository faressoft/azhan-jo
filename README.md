# Azhan Jo

Display azhan times in Amman

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

azhan.getPrayerTimes().then(function(result) {

  console.log(result);

}).catch(function(error) {
  
  console.log(error);  
  
});
```

# License

This project is under the MIT license, so feel free to use it.