 function addDays(indate, dayString, outPutField) {
     var newDate = new Date(indate);
     newDate.setDate(parseInt(newDate.getDate()) + parseInt(dayString));
     return newDate;
 }

 function dateDif(endDate, beginDate) {
     var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
     var diffDays = Math.round(Math.abs((endDate.getTime() - beginDate.getTime()) / (oneDay)));
     return diffDays;
 }

 function inDateFormat(dateString) {
     var dirtyDate = dateString.split("-");
     return dirtyDate[0] + "," + dirtyDate[1] + "," + dirtyDate[2];
 }