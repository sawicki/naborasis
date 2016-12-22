 function addDays(indate, dayString, outPutField) {
     var newDate = new Date(indate);
     newDate.setDate(parseInt(newDate.getDate()) + parseInt(dayString));
     return newDate;
    //  return (new Date(newDate)).toDateString();
    //  outPutField.value = nd;
     // satSun(nd, outPutField);
    //  return;
 }

 function dateDif(endDate, beginDate) {

     var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
     // var firstDate = new Date(2008,01,12);
     // var secondDate = new Date(2008,01,22);

     var diffDays = Math.round(Math.abs((endDate.getTime() - beginDate.getTime()) / (oneDay)));
     return diffDays;
     // alert(diffDays);
 }
function inDateFormat(dateString){
    
  
   var  dirtyDate= dateString.split("-");
  return dirtyDate[0]+ "," + dirtyDate[1]+ "," + dirtyDate[2];
   }