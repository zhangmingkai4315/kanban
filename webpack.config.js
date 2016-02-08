const path=require("path");
const merge=require('webpack-merge');
const webpack=require('webpack')
const TARGET=process.env.npm_lifecycle_event;
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const PATHS={
	app:path.join(__dirname,'app'),
	build:path.join(__dirname,'build')
};




const common={
	entry:{
		app:PATHS.app
	},
	output:{
		path:PATHS.build,
		filename:'bundle.js'
	},
	module: {
	 loaders: [
		 {
			 // Test expects a RegExp! Note the slashes!
			 test: /\.css$/,
			 loaders: ['style', 'css'],
			 // Include accepts either a path or an array of paths.
			 include: PATHS.app
		 }
	 ]
 }
};

if(TARGET ==='start'||!TARGET){
	module.exports=merge(common,{
		devServer:{
			contentBase:PATHS.build,
			historyApiFallback:true,
			inline:true,
			progress:true,
			stats:'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		devtool:'eval-source-map',
		plugins:[
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
        save: true // --save
      })
		]

	});
}
if(TARGET ==='build'){
	module.exports=merge(common,{});
}
