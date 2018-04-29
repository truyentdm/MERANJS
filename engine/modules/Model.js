const CONST = require("../constants")
const CONFIG = require("../constants/config");
const { DriverDB } = require("./database/DriverDB")

class Model extends DriverDB{
    constructor(){
        super();
    }
}
module.exports.Model = Model;