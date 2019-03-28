// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const CONFIG = {
  mode: 'development',

  entry: {
    app: resolve('./pages/app.js')
  },

  output: {
    library: 'App'
  },
  
  devServer: {
      contentBase: './pages'
  },
    
  module: {
    rules: [
      {
        // Compile ES2015 using buble
        test: /\.js$/,
        loader: 'buble-loader',
        include: [resolve('.')],
        exclude: [/node_modules/],
        options: {
          objectAssign: 'Object.assign'
        }
      }
    ]
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [new webpack.DefinePlugin(envKeys)]
};

// This line enables bundling against src in this repo rather than installed module
module.exports = env => (CONFIG);