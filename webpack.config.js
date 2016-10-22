var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require("./config.json");

module.exports = [{
  context: __dirname,
  entry: {
    starter: getEntrySources([
      './index.js'
    ]),
  },
  output: {
    path: 'dist',
    filename: "story.js"
  },
  module: {
    loaders: [{
        test: /.js/,
        loaders: ['babel?cacheDirectory']
      }, {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.html$/, loader: 'html-loader'},
      { test: /\.hbs/, loader: 'handlebars-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      description: config.description,
      author: config.author,
      copyright: config.copyright,
      keywords: config.keywords,
      pagination: config.pagination,
      template: 'template.hbs'
  })
  ]
}];

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }

    return sources;
}
