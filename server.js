const express = require('express');
const path = require('path');
const app = express();

let htmlPath = (fileName) => {
  return path.join(__dirname, `src/html/${fileName}.html`)
}

// app.use : 미들웨어를 쓰는 부분.
// express.static : 정적 파일들이 있는 위치 지정. 정적 파일 : ejs나 pug같은 템플릿이 아닌 파일들. (ex:html, css, js, file, font 등)
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(htmlPath('index'));
});

app.listen(process.env.PORT, () => {
  console.log('Express App on port 8080!');
})