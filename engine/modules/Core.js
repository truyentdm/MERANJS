const CONST = require("../constants")
const CONFIG = require("../constants/config");
const path = require("path")
const LOG = require(path.resolve(CONST.ENGINE,"log"));
const {SocketIO} = require("./SocketIO")
class Core{
	constructor(){
		LOG.debug("[ENG][CORE]","Create constructor")
		this.SocketIO = null;
	}
	createSocketIO(_SocketIO){
		if(CONFIG.CONFIG_SOCKETIO){
			if(_SocketIO != undefined){
				this.SocketIO = _SocketIO;
			}else{
				this.SocketIO = new SocketIO();
			}
			
		}
	}
	///////////////////////////////////
	//				DEBUG			//
	/////////////////////////////////
	log(app,log){
		LOG.debug(app,log);
	}
	///////////////////////////////////
	//				ENGINE			//
	/////////////////////////////////
	getMapping(mapping){
		let str = null;
		if(typeof mapping === 'string'){
			str = mapping.slice(0,mapping.lastIndexOf('.'));
			str = str.replace(/>/gi, "/");
			str = str + '.js';
		}
		return str;
	}
	getAction(mapping){
		let start = null;
		let func = null;
		if(typeof mapping === 'string'){
			start = mapping.lastIndexOf('.');
		}
		if(start != null){
			func = mapping.slice(Number(start+1));
		}
		return func;
	}
}

module.exports.Core = Core;