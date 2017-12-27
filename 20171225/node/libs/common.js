Buffer.prototype.split = Buffer.prototype.split || function (spliter) {

  let b1 = this;
  let res = [];
  let n;
  while ((n = b1.indexOf(spliter)) != -1) {
    let res1 = b1.slice(0,n);
    let res2 = b1.slice(n+spliter.length);
    res.push(res1);
    b1 = res2;
  }
  res.push(b1);
  return res;
};


exports.parseInfo=function(str) {
  let arr = str.split('; ');
  let arr2 = [];
  let json = {};

  arr.forEach(item=>{
    let a = item.split('\r\n');
    arr2 = arr2.concat(a);
  });


  arr2.forEach(s=>{
    let [key,value] = s.split('=');
    if (!value) {
      json[key] = value;
    }else {
      json[key] = value.substring(1,value.length - 1);
    }

  });
  return json;
}
