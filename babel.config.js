// https://www.antdv.com/docs/vue/introduce-cn/
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@vue/babel-preset-jsx"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ] // `style: true` 会加载 less 文件
  ]
};
