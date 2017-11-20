const fs = require('fs');

// fs.readFile('1.txt',function(err,data){
//   if(err){
//     console.log('读取失败');
//   }else{
//     console.log('读取成功');
//     //console.log(data);
//     console.log(data.toString());
//   }

  fs.writeFile('2.txt','如果速度恢复计划的收到回复',function (err) {
    if(err){
      console.log('写入失败');
    }else{
      console.log('写入成功');
    }
  })
//});
