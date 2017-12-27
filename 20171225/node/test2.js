const querystring = require('querystring');

let str = 'ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=%E9%A6%99%E6%B8%AF&rsv_pq=939c3a57000630ce&rsv_t=daa4Gi%2FIHwatcVjkAbNJgbb%2Bvx%2FmaXCmhHnkdjn2gZ1YkdzmEZj0wDWFePQ&rqlang=cn&rsv_enter=1&rsv_sug3=2&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=2145&rsv_sug4=4442&rsv_sug=1';

let obj = querystring.parse(str);

console.log(obj);
