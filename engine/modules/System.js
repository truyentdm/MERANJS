const CONST = require("../constants")
const CONFIG = require("../constants/config");
const path = require("path")
const VARFUNC = require(path.resolve(CONST.ENGINE,"helper/variant"))
const FSFUNC = require(path.resolve(CONST.ENGINE,"helper/fs"))
const {Core} = require("./Core")
class System extends Core{
	constructor(){
		super();
		this.express = require("express")
		this.app = this.express();
		this.http = require("http");
		this.server = null;
		this.initCoreApplication();
		this.createServerListenIO();
		this.log("[ENG][SYS]","System create")
	}
	initSystem(data){
		this.log("[ENG][SYS]","initSystem")
		CONFIG.CONFIG_MIDDLE(this.app,this.express);
		data.forEach(item=>{
			this.createRouter(item,(req,res)=>{
				if(CONFIG.CONFIG_SOCKETIO == true){
					this.loadAction(item[CONFIG.SYSTEM_SERVER_MAPPING],{req,res,io: this.SocketIO.io})
				}else{
					this.loadAction(item[CONFIG.SYSTEM_SERVER_MAPPING],{req,res})
				}
			})
		})
		this.app.use((req,res,next)=>{
			CONFIG.CONFIG_ERROR(req,res,next);
		});
	}
	createRouter(data,callback){
		const path = VARFUNC.existsKeyInArray(data,CONFIG.SYSTEM_SERVER_PATH) ? data[CONFIG.SYSTEM_SERVER_PATH] : "";
		const method = VARFUNC.existsKeyInArray(data,CONFIG.SYSTEM_SERVER_METHOD) ? data[CONFIG.SYSTEM_SERVER_METHOD] : (CONFIG.SYSTEM_SERVER_METHOD != "string" ? CONFIG.SYSTEM_SERVER_METHOD : "GET" );
		if(path !== ''){
			if(method.toUpperCase() === 'GET'){
				this.log("[ENG][SYS]","METHOD GET")
				this.app.get(path,callback);
			}
			if(method.toUpperCase() === 'POST'){
				this.app.post(path,callback);
			}
		}
	}
	loadAction(mapping,handler){
		if(mapping != 'SERVICE'){
			const pathFile = this.getMapping(mapping);
			FSFUNC.existsFile(path.join(CONST.ROOT,pathFile),(res,pathRes)=>{
				if(!res){
					handler.res.sendFile("Not Found File. SERVER");
				}else{
					const loadClass = require(pathRes)
					const nameClass = Object.keys(loadClass)[0];
					const createClass = new loadClass[nameClass]();
					createClass.initVariant(handler)
					if(CONFIG.CONFIG_SOCKETIO == true){
						createClass.SocketIO.initSocketIO(handler)
					}
					const action = this.getAction(mapping);
					createClass[action]()
				}
			});
		}else if( mapping == 'SERVICE'){
			if(typeof CONFIG.SYSTEM_SERVICE_LOCAL_URL != undefined){
				FSFUNC.existsFile(CONFIG.SYSTEM_SERVICE_LOCAL_URL_PATH,(res,pathRes)=>{
					if(!res){
						handler.res.sendFile("Not Found File. SERVICE");
					}else{
						handler.res.sendFile(pathRes);
					}
				})
			}
		}else{
			handler.res.sendFile("Exits Mapping JSON");
		}
	}
	createServerListenIO(){
		if(CONFIG.CONFIG_SOCKETIO == true){
			this.log("[ENG][SYS]","Create createServer")
			this.server = this.http.createServer(this.app);
			this.SocketIO.createSocketIO(this.server);
		}
		
	}
}
module.exports.System = System;