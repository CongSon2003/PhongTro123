const path = require("path-browserify");

module.exports = {
    resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          path : require.resolve("path-browserify")
        },
        crypto : false
      }
}