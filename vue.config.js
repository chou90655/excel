const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.9ku.com/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
  },
  transpileDependencies: true,
  // 配置elementui
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
        Buffer: ['buffer', 'Buffer']
      }),
      new NodePolyfillPlugin(),
      require('unplugin-element-plus/webpack')({
        // options
      })
    ]
  }
})
