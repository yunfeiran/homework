const http = require('http');

//let allow_host = ['www.baidu.com','www.qq.com','www.alibaba.com']

let httpServer = http.createServer(function (request,response) {
  //console.log('请求成功');
  //如果浏览器传过来的origin == 我自己的域名
  // if (allow_host.indexOf(request.header['origin']) != -1) {
  //   response.setHeader('Access-Control-Allow-Origin','*');
  // }
  response.setHeader('Access-Control-Allow-Origin','*');

  console.log(request.headers);

  response.write('abc');
  response.end();
});

httpServer.listen(7777);
