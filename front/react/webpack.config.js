const path = require("path");

module.exports = {
  entry: path.resolve("src/index.js"),
  output: {
    path:path.resolve("public"),
    // path: path.resolve("../../src/main/webapp/assets/js"), 
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.js$/i,
      exclude: /node_modules/,
      loader: 'babel-loader'
  },{
      test: /\.css$/i,
      loader: [{
          loader: 'style-loader'
      }, {
          loader: 'css-loader',
          options: {
              modules: true
          }
      }]
  }, {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  }]
  },
  devServer: {
    contentBase: path.resolve("public"),
    host: "0.0.0.0",
    port: 8090,
    inline: true,
    liveReload: true,
    hot: false, // hot을 하던지 liveReload 하던지
    compress: true,
    historyApiFallback: true,
  },
};