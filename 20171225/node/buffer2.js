const b1 = new Buffer('abc');
const b2 = new Buffer('defg');

//链接b1 he b2
// console.log(b1);
// console.log(b2);

let b3 = Buffer.concat([b1,b2]);

console.log(b3);
