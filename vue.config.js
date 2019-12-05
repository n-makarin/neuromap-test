module.exports = {
  css: {
    loaderOptions: {
      // Add styles
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`
      },
    }
  }
}