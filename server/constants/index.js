"use strict";
const path = require('path');
module.exports.ROOT = path.join(__dirname,'../../');
module.exports.ENGINE = path.join(path.join(__dirname,'../../engine'));
module.exports.SERVER = path.join(path.join(__dirname,'../'));
module.exports.SERVICE = path.join(path.join(__dirname,'../../service'));