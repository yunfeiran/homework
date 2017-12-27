const common = require('./libs/common');
let str = 'id=34534; name=sdjfgsdf; hh=sdfhsdf; phone=4545445';


let json = common.parseInfo(str);

console.log(json);
