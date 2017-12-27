const http = require('http');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req,res)=>{
  let {pathname,query} = url.parse(req.url,true);
  //接收get
//  console.log("接收到了get的数据",pathname,query);
  //接收POST   大，分多次接收
  let aBuffer = [];
  req.on('data',data=>{
    //console.log(data.toString());
    aBuffer.push(data);
  });
  req.on('end',()=>{
    let data = Buffer.concat(aBuffer);

    //如果前台是urlencoded   把它转成字符串
    const post = querystring.parse(data.toString());
    console.log("post数据是：",post);

    //如果是form-data

  });
});

server.listen(8080);
