module.exports = {
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  },
  css: {
    loaderOptions: {
      // Add styles
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`
      }
    }
  }
};
