const fs = require("fs");
const path = require("path");
const CONST = require("../constants");
const CONFIG = require("../constants/config");
const LOG = require(path.resolve(CONST.ENGINE,"log"));
const FUNCT = require(path.resolve(CONST.ENGINE,"helper/variant"));
const {config} = require(path.resolve(CONST.SERVER,"config"));

class Router {
	constructor(){
		LOG.debug("[ENG][ROUTERS]","Constructor Router")
		this.unicode 		= CONFIG.CONFIG_UNICODE;
		this.pathJson 		= CONFIG.ROOT_ROUTE_JSON;
		this.pathServer 	= CONFIG.ENGINE_ROUTE_SERVER;
		this.pathService 	= CONFIG.ENGINE_ROUTE_SERVICE;
		this.configService 	= CONFIG.CONFIG_ROUTE_SERVICE;
		this.configServer 	= CONFIG.CONFIG_ROUTE_SERVER;
	}
	/*@set - get*/
	setPathJson(_data){
		this.pathJson = _data;
	}
	setPathServer(_data){
		this.pathServer = _data;
	}
	setPathService(_data){
		this.pathService = _data;
	}
	setConfigService(_data){
		this.configService = _data;
	}
	setUniCode(_data){
		this.unicode = _data;
	}
	
	/*@public*/
	initStartRouter(){
		LOG.debug("[ENG][ROUTERS]","initStartRouter")
		return new Promise((resolve,reject)=>{
			this.readJSON(this.pathJson)
			.then(data=>{
				this.fillterData("SERVICE",data)
				.then(res=>{
					this.writeRouterService(res);
				})
				.catch(err=>{
					reject(err);
				})
				return this.fillterData("SERVER",data);
			})
			.then(res=>{
				resolve(this.writeRouterServer(res));
			})
			.catch(err=>{
				reject(err);
			})
		})
	}
	/*@private*/
	fillterData(strFillter,res){
		return new Promise((resolve,reject)=>{
			let objRes = JSON.parse(res);
			if(FUNCT.existsKeyInArray(objRes,'route')){
				const dataLength = Object.keys(objRes['route']).length;
				let data = null;
				if(strFillter == 'SERVICE'){
					data = [];
					//write router server
					const mapObject = Object.keys(this.configService.route);
					for(let i = 0;i<dataLength;i++){
						if(FUNCT.convertStringToObject(this.configService.route,objRes['route'][i])== ""){
							continue
						}else{
							data[i] = JSON.parse(FUNCT.convertStringToObject(this.configService.route,objRes['route'][i]));
						}
					}
					LOG.debug("[ENG][ROUTERS]","data router service, done !")
				}else if(strFillter == 'SERVER'){
					data = {"server":[]};
					for(let i = 0;i<dataLength;i++){
						if(FUNCT.convertStringToObject(this.configServer.route,objRes['route'][i])== ""){
							continue
						}else{
							data["server"][i] = JSON.parse(FUNCT.convertStringToObject(this.configServer.route,objRes['route'][i]));
						}
					}
					LOG.debug("[ENG][ROUTERS]","data router server, done !")
				}else{
					reject(new Error("Exists string fillter"));
				}
				resolve(data);
			}else{
				reject(new Error("Exists web.json"));
			}
		})
		
	}
	writeRouterServer(res){
		const data = CONFIG.SERVER_ROUTE_DATA.replace("*",JSON.stringify(res));
		return new Promise((resolve,reject)=>{
			fs.writeFile(this.pathServer,data,(err,res)=>{
				if(err) { 
					resolve(false)
				}else{
					resolve(true)
				}
			});
		})
	}
	writeRouterService(res){
		const data = CONFIG.SERVICE_ROUTE_DATA.replace("*",JSON.stringify(res))
		fs.writeFile(this.pathService,data,(err,res)=>{
			if(err) { 
				LOG.debug("[ENG][ROUTERS]",err.toString());
			}
		});
	}
	readJSON(path){
		return new Promise((resolve,reject)=>{
			fs.readFile(path,this.unicode,(err,data)=>{
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			});
		});
	}
	getDataRouterServer(callback){
		const data = require(this.pathServer);
		if(typeof data.routes.server === "object"){
			callback(data.routes.server);
		}else{
			callback("");
		}
	}
	
}
module.exports.Router = Router;