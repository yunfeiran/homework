const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer();

httpServer.listen(5555);

//创建ws服务
let wsServer = io.listen(httpServer);

wsServer.on('connection',function(sock){
  //sock.emit();
  // sock.on('aaa',function (a,b) {
  //   console.log(a,b);
  // })
  setInterval(function () {
    sock.emit('aaa',333);
  },1000);

});
