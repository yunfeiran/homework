const http = require('http');

let server = http.createServer(function (request,response) {
  //console.log('有人请求我！');
  //request  请求，输入进来的信息，地址。方法等
  //response 响应  ，服务器输出的信息
  // console.log(`请求的地址是:${request.url}`);
  // console.log(`请求的方法是:${request.method}`);

  response.write('dsfhdfdd');
  response.end();
});

server.listen(8989);
//console.log('监听成功！');
