const path = require('path')

module.exports = {
  mode: 'development',
  entry: './project/index.js',
  output: {
    path: path.resolve(__dirname, 'project_dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx|js/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ["transform-react-jsx", {"pragma": "MReact.createElement"}]
          ]
        }
      }
    ]
  }
}