const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// HTML Webpack Plugin generates an HTML file (here index.html) and sticks it inside of the same directory where our bundle is put, and automatically includes a <script> tag which references the newly generated bundle.

//  Configuring Webpack
// To configure webpack, we creata a webpack.config.js file that exports an object where all the configuration settings for webpack will

module.exports = {
  entry: './app/index.js', // Entry point is the module that kicks everything off. Typically, it’s an index.js file.
  output: {
    // Webpack puts the final bundle at dist/index_bundle.js. Names the final bundle index_bundle.js and put it in a folder called dist.
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/', //    '/' indicates index page
  },

  // All of the information for your loaders will go into an array of objects under module.rules.
  // test will be a regex to match the file path and use will be the name of the loader we want to use.
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  //  We can set the mode property to development or production depending on which environment we’re in.
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],

  devServer: {
    historyApiFallback: true, //  this tells webpack dev server to not try to handle a new request that comes into the server, instead just fallback to whatever the public path is, which is in this case just our main index page.
  },
};

// In order to use HtmlWebpackPlugin, we create a new instance of it inside of our plugins array.
// The primary purpose of a loader is to give webpack the ability to process more than just JavaScript and JSON files.

/*
  "build": "NODE_ENV = 'production' webpack",    
  This is the clue to react to strip out PropTypes and all of the warnings to make sure that the react part of the things is as lean as possible.
*/
