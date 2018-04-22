class SocketIO{
	constructor(){
		console.log("SocketIO Contructor")
		this.io = null;
	}
	initSocketIO(e){
		this.io = e.io;
	}
	createSocketIO(server){
		this.io = require("socket.io").listen(server);
	}
	namespace(namespace,callback = null){
		if(typeof callback == "function"){
			callback(this.io.of(namespace));
		}else{
			return this.io.of(namespace);
		}
	}
	signal(message,io,data,callback){
		io.emit(message,data);
		if(typeof callback == "function"){
			callback(message,data);
		}
	}
}
module.exports.SocketIO = SocketIO;