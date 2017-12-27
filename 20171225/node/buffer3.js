Buffer.prototype.split = Buffer.prototype.split || function (spliter) {

  let b1 = this;
  let res = [];
  let n;
  n = b1.indexOf('==');
  let res2 = b1.slice(n+2);

  while ((n = b1.indexOf('==')) != -1) {
    let res1 = b1.slice(0,n);
    let res2 = b1.slice(n+2);
    res.push(res1);
    b1 = res2;
  }
  res.push(b1);
  return res;
};

let b1 = new Buffer('abcefghij==dfhhsddf==dfdf44=dfgdfg565==44dfgf');

let result = b1.split('==');
console.log(result.map(re=>re.toString()));
