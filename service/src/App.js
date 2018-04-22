import React,{Component} from "react"
import ReactDOM from "react-dom"
import io from 'socket.io-client';

const socket = io("http://localhost:8080/my-namespace");

class App extends Component{
	constructor() {
    	super()
	}
	sendSocket = ()=>{
		socket.emit("client-send-server","8080")
		console.log("Click")
	}
	componentDidMount(){
		console.log("Create Component Did Mount")
		socket.on("hi",this.funcHi)
		socket.on("all-client",this.funcAll)
	}
	funcHi = (data)=>{
		console.log(data)
	}
	funcAll = (data)=>{
		console.log(data)
	}
	render(){
		return(<div>
			Welcome Framework MERN
				<button onClick={this.sendSocket}>Send</button>
		</div>);
	}
}
ReactDOM.render(<App/>,document.getElementById("root"));