const path=require("path");
const merge=require('webpack-merge');
const webpack=require('webpack')
const TARGET=process.env.npm_lifecycle_event;
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const PATHS={
	app:path.join(__dirname,'app'),
	build:path.join(__dirname,'build')
};



process.env.BABEL_ENV = TARGET;

const common={
	entry:{
		app:PATHS.app
	},
	output:{
		path:PATHS.build,
		filename:'bundle.js'
	},
	resolve: {
	 extensions: ['', '.js', '.jsx']
  },
	module: {
	 loaders: [
		 {
			 // Test expects a RegExp! Note the slashes!
			 test: /\.css$/,
			 loaders: ['style', 'css'],
			 // Include accepts either a path or an array of paths.
			 include: PATHS.app
		 },

		 {
		 test: /\.jsx?$/,
		 loaders:['babel?cacheDirectory'],
     cacheDirectory: true,
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
