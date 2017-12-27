const http = require('http');
const url = require('url');
const querystring = require('querystring');
const common = require('./libs/common');
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');

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
    //如果是form-data
    //req.headers['content-type'].split('multipart/form-data') == 0  或者 用  startwidth
    if (req.headers['content-type'].startsWith('multipart/form-data')) {

      let post = {};
      let files = {};

      //先获取boundary,就是那分隔符
      const boundary = '--'+req.headers['content-type'].split('; ')[1].split('=')[1];
      let arr = data.split(boundary);
      //扔掉头尾
      arr.shift();
      arr.pop();
      //扔掉每一个头尾的\r\n
      arr = arr.map(item=>item.slice(2,item.length - 2)); //截取字符串，第一个参数的是开始的位置，第二个参数是结束的位置
      //找 第一个 \r\n\r\n，一切两半， 前一半是信息，后一半是数据
      arr.forEach(item=>{
        let n = item.indexOf('\r\n\r\n');
        let info = item.slice(0,n);
        let data = item.slice(n+4);

        info = info.toString();

        let total = 0;
        let complete = 0;

        if (info.indexOf('\r\n') == -1) {  //只有一行 ，普通数据
          let key = common.parseInfo(info).name;
          let val = data.toString();

          post[key] = val;  //普通的文件进post
        }else{  //两行，文件数据
          //碰到一个文件就加一
          let json = common.parseInfo(info);
          let key = json.name;
          let filename = json.filename;
          let type = json['Content-Type'];
          //let val = data;
          let newpath = `upload/${uuid().replace(/\-/g,'')}${path.extname(filename)}`;

          files[key] = {filename,type,newpath};

          fs.writeFile(newpath,data,err=>{
            if (err) {
              console.log('文件写入失败');
            }else {
              console.log('文件写入成功');
              complete++;

              //console.log(post,files);
            }
          });
        }
        // console.log(info.toString());
        // console.log('-----');
        // console.log(data.toString());
      });
      //console.log(arr);
    }else {  //说明是urlcoded,直接toString
      let post = querystring.parse(data.toString());
    }
    //console.log(data.toString());
    //console.log(req.headers['content-type']);
  });
});

server.listen(8080);
