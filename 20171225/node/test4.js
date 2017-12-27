function parseInfo(str) {
  let arr = str.split('; ');
  let json = {};
  arr.forEach(s=>{
    let [key,value] = s.split('=');
    json[key] = value;
  })；
  return json;
}
