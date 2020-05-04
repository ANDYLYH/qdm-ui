const path = require('path');
module.exports = {
  pages:{
    index:{
      entry:'src/main.js',
      template:'psublic/index.html',
      filename:'index.html'
    }
  },
  chainWebpack:config => {
    config.module
    .rule('js')
    .include.add(path.resolve(__dirname,'packages')).end()
    .use('babel')
    .loader('babel-loader')
    .tap(options=>{
      return options;
    })
  }
}
