const path = require("path")
const CONST = require("../constants")
const config = {
	server: {
		map: {
			path: "alias",
			mapping: "mapping",
			method: "method"
		},
		route: {
			"alias" : "string",
			"mapping" : "string",
			"method" : "get"
		}
	},
	service: {
		local: {
			"url" 	: "views/index.html",
			"error" : ""
		},
		route: {
			"alias" : "string",
			"mapping" : { "main":"string"},
			"exact" : false
		}
	},
	middle: (appEngine,expressModel)=>{
		appEngine.set("view engine","html");
		appEngine.engine("html",function(path,option,callback){
			fs.readFile(path,"UTF-8",callback)
		})
		appEngine.use(expressModel.static(path.join(CONST.SERVICE,"public")))
	},
	error: (req,res,next)=>{
		
		res.end("error")
	},
	option: {
		port_local: 8080,
		unicode: "utf-8",
		socketIO: {enable: true}
	}
}
module.exports.config = config;