const path = require('path')
const CONST = require('../constants')
module.exports.Controller = require(path.join(CONST.ENGINE,'modules/Controller')).Controller
module.exports.debug = require(path.join(CONST.ENGINE,'log/index')).debug