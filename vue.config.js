module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    devServer: {
      port: 8080, 
      host: '0.0.0.0',
      public: '0.0.0.0:8080'
    }
  }