const CONST = require("./constants");
const CONFIG = require("./constants/config");
const path = require("path");
const fs = require("fs");
const LOG = require(path.resolve(CONST.ENGINE,"log"));
const { Router } = require(path.resolve(CONST.ENGINE,"routers"));
const { System } = require(path.resolve(CONST.ENGINE,"modules/System"));

class Engine{
	constructor(){
		LOG.debug("[ENG][engine]","Constructor Engine")
		this.router = new Router();
		this.system = new System();
		
	}
	initApplication(){
		this.router.initStartRouter()
		.then(res=>{
			if(res === true){
				//initAction
				this.router.getDataRouterServer(data=>{
					if(data === ""){
						LOG.debug("[ENG][engine]","Error Data Router")
					}else{
						this.system.initSystem(data);
						LOG.debug("[ENG][engine]",data)
					}
				})
			}else{
				LOG.debug("[ENG][engine]","exists initStartRouter")
			}
		})
		.catch(err=>LOG.debug("[ENG][engine]",err.toString()))
	}
	listen(port){
		if(CONFIG.CONFIG_SOCKETIO == true){
			this.system.server.listen(port)
		}else{
			this.system.app.listen(port)
		}
	}
}

module.exports.Engine = Engine;                       