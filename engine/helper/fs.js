const fs = require("fs")
const path = require("path")
const existsFile = (path,callback)=>{
	fs.exists(path,(exists)=>{
		callback(exists,path);
	});
}
module.exports.existsFile = existsFile
