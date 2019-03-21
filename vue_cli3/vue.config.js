const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: '../server/static',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          BASE_API: '"/api"'
        }
      })
    ]
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.output.filename('[hash].js').end()
  },
  devServer: {
    hot: true,
    compress: true,
    overlay: true,
    proxy: {
      '/mock': {
        target: 'http://localhost:5050'
      },
      '/api': {
        target: 'http://localhost:5050'
      }
    },
    quiet: true,
    watchOptions: {
      poll: false
    }
  }
}