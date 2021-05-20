const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //entry file
  entry: ['@babel/polyfill', './src/js/ej.base.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 지정될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'js/bundle.js'
  },
  target: ['web', 'es5'], // es5 지정 없으면 es6 문법으로 export됨
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/style.css'})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  // 이게 없으면 번들링된 js 파일에 스타일이 합쳐져서 export됨
          'css-loader', // translates CSS intro CommonJS (CommonJS : js를 웹 외의 전역에서도 사용하자는 단체)
          'sass-loader' // compiles SASS to CSS, using Node SASS by default
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};