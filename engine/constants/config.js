const path = require("path")
const CONST = require("./index")
const {config} = require(path.resolve(CONST.SERVER,"config"))

///////////////////////////////////////////
//			    CONFIG 					//
/////////////////////////////////////////
module.exports.CONFIG_ROUTE_SERVER  		= config.server;
module.exports.CONFIG_ROUTE_SERVICE 		= config.service;
module.exports.CONFIG_MIDDLE 				= config.middle;
module.exports.CONFIG_ERROR					= config.error;
module.exports.CONFIG_PORT_LOCAL			= config.option.port_local;
module.exports.CONFIG_SOCKETIO				= config.option.socketIO.enable;
module.exports.CONFIG_UNICODE				= config.option.unicode;
module.exports.SYSTEM_SERVER_MAPPING 		= config.server.map.mapping;
module.exports.SYSTEM_SERVER_PATH	 		= config.server.map.path;
module.exports.SYSTEM_SERVER_METHOD	 		= config.server.map.method;
module.exports.SYSTEM_SERVICE_LOCAL_URL		= config.service.local.url;
///////////////////////////////////////
//			HARD CODE				//
/////////////////////////////////////

module.exports.SERVER_ROUTE_DATA  				= "const routers = " + "*" + ";" + "module.exports.routes = routers;";
module.exports.SERVICE_ROUTE_DATA  				= "const routers = " + "*" + ";" + "exports default routes;";
module.exports.ROOT_ROUTE_JSON  				= path.resolve(CONST.ROOT,"routers/web.json");
module.exports.ENGINE_ROUTE_SERVER  			= path.resolve(CONST.ENGINE,"routers/server.js");
module.exports.ENGINE_ROUTE_SERVICE 			= path.resolve(CONST.ENGINE,"routers/routers.js");
module.exports.SYSTEM_SERVICE_LOCAL_URL_PATH	= path.join(CONST.SERVICE,config.service.local.url);

