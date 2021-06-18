const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  // req : 오청 담당. 즉, 서버로 보내는 요청에 대한 정보.
  // res : request에 대한 처리 후 결과를 객체로 반환.
  const path = url.parse(req.url, true).pathname; // url에서 path 추출
  if (req.method === 'GET') { // GET 요청이면
    if (path === '/') { // 주소가 /about이면
      res.writeHead(200, {'Contetn-Type': 'text/html'}); // header 설정
      fs.readFile(__dirname + '/index.html', (err, data) => { // 파일 읽는 메소드
        if (err) {
          return console.error(err); // 에러 발생 시
        }
        res.end(data, 'utf-8'); // 브라우저로 전송
      });
    } else { // 매칭되는 주소가 없으면
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('주소가 없습니다.');
    }
  }
}).listen(8080); // 일반 주소는 80. 기본이기 때문에 따로 입력하지 않아도 됨. 단, 로컬에서는 다른 프로그램에서 이미 사용할 때가 많아 충돌이 자주 발생하므로, 서버에 올릴 때만 80포트를 사용하자.