const fs = require('fs');

fs.readFile('a.png',(err,data)=>{
  //文本文件2进制转回去没事，图片文件二进制转回去不可以哦
  if (err) {
    console.log('错了');
  }else {
    let str = data.toString();
    //console.log(data);
    fs.writeFile('c.png',str,err=>{
      if (err) {
        console.log('写入失败');
      }else {
        console.log('完事儿a');
      }
    });
  }
});
