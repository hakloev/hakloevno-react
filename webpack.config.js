const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
	devtool: 'eval',

	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
		'webpack/hot/only-dev-server',
		'./src/index',
	],

	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist',
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				include: path.join(__dirname, 'src'),
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				loader: extractSass.extract({
					// use style-loader in development
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader' },
						{ loader: 'sass-loader', options: { includePaths: [path.resolve(__dirname, './styles')] } }
					],
				})
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			}
		}),
		new ExtractTextPlugin('styles.css'),
	]
};
