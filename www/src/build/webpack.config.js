const path = require('path');
const webpack = require('webpack');

module.exports = function (env = {}) {
	if (env.production)
		process.env.NODE_ENV = 'production';

	return {
		entry: './src/main.js',
		output: {
			path: path.resolve(__dirname, '../../dist'),
			filename: env.production ? 'js/main.min.js' : 'js/main.js'
		},
		plugins: env.production ? [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
		] : [],
		devtool: env.production ? false
			: '#cheap-module-eval-source-map'
	};
};