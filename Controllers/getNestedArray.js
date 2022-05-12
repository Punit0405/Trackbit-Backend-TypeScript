console.log("hello")
let dateone = new Date();
console.log(dateone.toTimeString())
let datetwo = new Date();
datetwo.setHours(23);
datetwo.setMinutes(59);
datetwo.setSeconds(59);
let dff = datetwo - dateone
console.log(datetwo)
console.log(dff)

var msec = dff;
var hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000);
msec -= ss * 1000;

console.log(hh +":"+ mm+ ":"+ ss)