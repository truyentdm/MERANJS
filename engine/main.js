const { Engine } = require("./engine");
const path = require("path")
const CONST = require("./constants")
const CONFIG = require(path.resolve(CONST.ENGINE,"constants/config"))

const engine = new Engine();
engine.initApplication();
engine.listen(process.env.PORT || CONFIG.CONFIG_PORT_LOCAL);