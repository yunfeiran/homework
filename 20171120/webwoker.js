this.onmessage = function (ev) {
  //3.处理数据
  let num = parseInt(ev.data.num1+ev.data.num2);
  //4.返回数据.如果你能找到一份热爱的职业，那么你就再也不用工作了，因为每天醒来之后
  this.postMessage(num);
}
