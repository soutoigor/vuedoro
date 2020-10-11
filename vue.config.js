const path = require('path')

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/styles/variables.styl'),
          path.resolve(__dirname, 'src/styles/mixins.styl'),
        ],
      },
    },
  },
}
