let str = 'multipart/form-data; boundary=----WebKitFormBoundary6s96cjBQocPloI2m';

let arr = str.split('; ');

let boundaryAll = arr[1];

let boundaryCon = boundaryAll.split('=')[1];

//缺俩--，补两个--

let boundaryCondent = '--'+boundaryCon;
