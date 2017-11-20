const http = require('http');

const fs = require('fs');

let server = http.createServer(function (request,response) {
  //console.log('有人请求我');
  //接收传过来的url
  let url = request.url;
  console.log(url);
  fs.readFile(`www${url}`,function (err,data) {
    if(err){
      fs.readFile('./www/44.html',(err,data) => {
        if(err){
          response.writeHeader(404);
          //response.write('Not Found');
        }else{
          response.writeHeader(404);
          response.write(data);
        }
        response.end();
      });
    }else{
      response.write(data);
      response.end();
    }

  })
});

server.listen(8585);

console.log('服务器开启');
