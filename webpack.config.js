const path=require("path");
const merge=require('webpack-merge');
const webpack=require('webpack')
const TARGET=process.env.npm_lifecycle_event;
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanPlugin=require('clean-webpack-plugin');
const packageFile=require('./package.json');
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const PATHS={
	app:path.join(__dirname,'app'),
	build:path.join(__dirname,'build'),
	style:path.join(__dirname,'app/main.css')
};



process.env.BABEL_ENV = TARGET;

const common={
	entry:{
		app:PATHS.app,
		style:PATHS.style,
	},
	output:{
		path:PATHS.build,
		filename:'[name].js'
	},
	resolve: {
	 extensions: ['', '.js', '.jsx']
  },
	module: {
	 loaders: [
		 {
		 test: /\.jsx?$/,
		 loaders:['babel?cacheDirectory'],
     cacheDirectory: true,
		 include: PATHS.app
	 	}
	 ]
  },
  plugins:[
  	new HtmlWebpackPlugin({
  		template:'node_modules/html-webpack-template/index.ejs',
  		title:'Kanban app',
  		appMountId:'app',
  		inject:false
  	})
  ]
};

if(TARGET ==='start'||!TARGET){
	module.exports=merge(common,{
		devServer:{
			historyApiFallback:true,
			inline:true,
			progress:true,
			host: process.env.HOST,
			port: process.env.PORT
		},
		devtool:'eval-source-map',
		module:{
			loaders:[
				{
				 // Test expects a RegExp! Note the slashes!
				 test: /\.css$/,
				 loaders: ['style', 'css'],
				 // Include accepts either a path or an array of paths.
				 include: PATHS.app
		 		},
			]
		},
		plugins:[
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
        save: true // --save
      		})
		]

	});
}
if(TARGET ==='build'||TARGET==='stats'){
	module.exports=merge(common,{
		entry:{
			vendor:Object.keys(packageFile.dependencies)
						 .filter(function(v){
						 	return v!=='alt-utils';
						 })
		},
		output:{
			path:PATHS.build,
			filename:'[name].[chunkhash].js',
			chunkFilename:'[chunkhash].js'
		},
		module:{
			loaders:[
				 {
					 // Test expects a RegExp! Note the slashes!
					 test: /\.css$/,
					 loader: ExtractTextPlugin.extract('style','css'),
					 // Include accepts either a path or an array of paths.
					 include: PATHS.app
				 },

			]
		},
		plugins:[
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV':'"production"'
		// }),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendor','manifest']
		}),
		new CleanPlugin([PATHS.build]),
		new ExtractTextPlugin('[name].[chunkhash].css')
		]

	});

}
