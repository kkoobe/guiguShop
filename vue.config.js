module.exports = {
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
        port: '8080', // 设置端口号
        https: false,  //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy:	{
            '^/api': {
              target: 'http://localhost:4000/', 	// 请求的接口的域名
              // secure: false,  				// 如果是https接口，需要配置这个参数
              changeOrigin: true, 			// 如果接口跨域，需要进行这个参数配置
              pathRewrite: {
                '^/api': ''
              }
            }
          }
    },
    chainWebpack: config => {
      if (process.env.use_analyzer) {     // 分析
          config
              .plugin('webpack-bundle-analyzer')
              .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
  },
  chainWebpack: config => {
      if (process.env.use_analyzer) {     // 分析
          config
              .plugin('webpack-bundle-analyzer')
              .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
  }
}
