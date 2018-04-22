const path = require("path")
module.exports = {
	entry: {
		bundle: "./service/src/App.js"
	},
	output: {
		path: path.join(__dirname,'service/public/js'),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: '/node_modules/'
			},
			{
				loader: 'file-loader',
				test: /\.jpe?g$ | \.gif$ | \.png$ | \.svg | \.woff$ | \.woff2 | \.eot$ | \.ttf$ | \.wav$ | \.mp3$ | \.mp4$ | \.ico$/ 
			}
		]
	}
}