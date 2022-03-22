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
        webpackConfig.output.publicPath = '//assets.zjzsxhy.com/sacte/'
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
    },
  },
}
