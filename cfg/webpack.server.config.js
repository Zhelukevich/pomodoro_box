const path = require('path');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global.scss$/;

module.exports = {
	target: 'node',

	mode: NODE_ENV ? NODE_ENV : 'development',

	entry: path.resolve(__dirname, '../src/server/server.js'),

	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: 'server.js',
	},

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},

	externals: [nodeExternals()],

	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
							onlyLocals: true,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
				exclude: GLOBAL_CSS_REGEXP,
			},
			{
				test: GLOBAL_CSS_REGEXP,
				use: ['css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},

	optimization: {
		minimize: false,
	},
};
