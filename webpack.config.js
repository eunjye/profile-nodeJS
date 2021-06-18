const path = require('path'); // 운영체제별로 경로 구분자가 달라 생기는 이슈를 해결하기 위해 (ex: windows:'\', POSIX:'/')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  //entry file
  entry: ['@babel/polyfill', './src/js/common.js', './src/sass/app.scss'],
  // 컴파일 + 번들링된 js 파일이 지정될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'js/bundle.js'
  },
  target: ['web', 'es5'], // es5 지정 없으면 es6 문법으로 export됨
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/style.css'}),
    // new CleanWebpackPlugin(['dist']) // 실제 사용된 파일만 추적하여 dist/ 에 남기는 plugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src/js')
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
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          // options: {
          //   attrs: [':data-src']
          // }
        }
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // file size < 10k 는 문자열(번들)로 만들어 사용하는 부분에 직접 삽입
              fallback: 'file-loader', // file size > 10k일 시, file-loader를 사용하여 파일 복사
              name: '[name].[ext]', // img 폴더의 이름.확장자 명으로 복사
              outputPath: 'img', // 복사 후 파일이 출력될 위치. 여기서는 /public/dist/ 이후의 경로이다. => /public/dist/img
              publicPath: '../img' // 복사할 파일의 위치. 즉, url을 포함하고 있는 파일을 기준 경로. url의 첫 부분이 해당 path를 포함하고있어야 복사됨.
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: '[name].[ext]',
              outputPath: 'font',
              publicPath: '../font'
            },
          },
        ],
      },
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};