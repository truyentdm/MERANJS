const CONST = require("../../constants/")
const CONFIG = require("../../constants/config");
var MongoClient = require('mongodb').MongoClient;
const key_namespace = CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS != "" || CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS != undefined ? CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS : "model"
const namespaceDB = {
    [key_namespace] : null
}
class DriverDB{
    constructor(){
        this.db = null;
    }
    async connect(){
        if(typeof CONFIG.SYSTEM_CONFIG_DATABASE_USE == "function"){

        }else if(CONFIG.SYSTEM_CONFIG_DATABASE_USE.toLowerCase() == "mongodb"){
            console.log("Use Mongodb");
            await this.mongoDBConnect()
            .then(client=>{
                this.db = client;
                namespaceDB[key_namespace] = client.db(CONFIG.SYSTEM_CONFIG_DATABASE_CONFIG.database);
            })
            .catch(err => console.log(err.toString()));
            console.log("End Connect Mongodb")
        }else if(CONFIG.SYSTEM_CONFIG_DATABASE_USE.toLowerCase() == "mysql"){
            console.log("Use MySQL")
        }else{
            console.log("Use function Connect DB or Mongodb,MySql")
        }
    }
    mongoDBConnect(){
        return new Promise((resolve,reject)=>{
			MongoClient.connect(CONFIG.SYSTEM_CONFIG_DATABASE_CONFIG.url,(err,client)=>{
				if(err){
					return reject(new Error('Not connect'))
				}else{
                    console.log("Connect success MongoDB")
					return resolve(client);
				}
			})
		}) 
    }
    mySQLConnect(){}
}
Object.setPrototypeOf(DriverDB.prototype,namespaceDB)
module.exports.DriverDB = DriverDB