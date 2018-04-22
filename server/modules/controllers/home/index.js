const CONST = require("../../../constants")
const App = require("../../../exports")

class Home extends App.Controller{
	constructor(){
		super()
		this.log('[SER][home]','load constructor')
	}
	indexHome(){
		this.log('[SER][home]',"call home");
			this.SocketIO.io.on("connection",(socket)=>{
				console.log("login global")
				this.SocketIO.io.sockets.emit("user-login","IO");
			})
			this.SocketIO.namespace("/my-namespace",(nsp)=>{
				nsp.on('connection', (socket)=>{
					console.log('someone connected');
					socket.on("client-send-server",(data)=>{
						console.log("data >>",data)
						nsp.emit("all-client","ALL DATA")

					})
					// socket.emit('hi', 'everyone!');
					this.SocketIO.signal('hi',socket,'DATATATA');
				})
			});
			
		this.sendFile("views/index.html")
	}
}

module.exports.Home = Home;