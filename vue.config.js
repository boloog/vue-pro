module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // https://webpack.js.org/configuration/dev-server/#devserverproxy
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 以下是清除缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
