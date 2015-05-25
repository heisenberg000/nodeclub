var colors = require("colors");
var fs     = require('fs');
var config = require('../config');

exports.log = function() {
  writeLog('', 'info', arguments);
}

exports.info = function() {
  writeLog('  ', 'info', arguments);
}

exports.debug = function() {
  writeLog("  ", 'debug', arguments);
}

exports.warn = function() {
  writeLog("  ", 'warn', arguments);
}

exports.error = function() {
  writeLog("  ", 'error', arguments);
}

var writeLog = function(prefix, logType, args) {
  var infos = Array.prototype.slice.call(args);
  var logStr = infos.join(" ");

  switch (logType) {
  case "debug":
      logStr = logStr.gray;
      break;    
  case 'warn':
    logStr = logStr.yellow;
    break;
  case 'error':
    logStr = logStr.red;
    break;
  }
  
  var line = prefix + logStr;
  var env = process.env.NODE_ENV || "development";
  
  if (logStr !== 'debug') {
    fs.appendFile('./log/'+ env +'.log', line + "\n");
  }
  if (env !== 'test' && config.debug) {
    console.log(line);
  }
}


