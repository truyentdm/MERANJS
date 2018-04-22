const CONST = require("../constants")
const { Core } = require("./Core")
const path = require("path")
const LOG = require(path.resolve(CONST.ENGINE,"log"));
class Controller extends Core {
	constructor(){
		super();
		LOG.debug("[ENG][Controller]","Controller create");
		this.req = null;
		this.res = null;
	}
	initVariant(e){
		this.req = e.req;
		this.res = e.res;
	}
	send(variant){
		this.res.send(variant);
	}
	sendFile(pathFile){
		this.res.sendFile(path.join(CONST.SERVICE,pathFile));
	}
}
module.exports.Controller = Controller;