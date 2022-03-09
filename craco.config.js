module.exports = {
  babel: {
    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-proposal-numeric-separator',
    ],
  },
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        // remove console in production
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          (i) => i.constructor.name === 'TerserPlugin'
        )
        if (TerserPlugin) {
          TerserPlugin.options.terserOptions.compress.drop_console = true
        }
        // public path
        // webpackConfig.output.publicPath = '//assets.zjzsxhy.com/ld/'
      }

      return webpackConfig
    },
  },
  devServer: {
    proxy: {
      '/snapshots/*': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/users/*': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/users.json': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/tickets.json': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/tickets/*': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/info.json': {
        target: 'https://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
      },
      '/cable': {
        target: 'wss://stoneblock.internal.nervina.cn/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/static_proxy': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/static_proxy': '' },
      },
    },
  },
}
