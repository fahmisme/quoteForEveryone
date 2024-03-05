// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: '/public/module.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
