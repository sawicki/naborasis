document.getElementById("datatab").addEventListener("click", dataPageInit);



var rows = document.querySelectorAll("#datapage div.flexbox");
for (let i = 0; i < (rows.length - 1); i++) {
    var curRow = rows[i];
    curRow.children[1].onchange = dpInputEvents;
    curRow.children[1].value = "";
}

function dataPageInit() {
    if (contract.execDate == "" | contract.closeDate == '') {
        document.getElementById('datapagetitle').innerHTML = "Please Select Both Contract Execution and Close Dates First";
        document.getElementById('datapagetitle').classList.add('red-back');
    } else {
        document.getElementById('datapagetitle').innerHTML = "";
        document.getElementById('datapagetitle').classList.remove('red-back');
        document.getElementById('datapagetitle').innerHTML = "Execution Date/Close Date = " + fldExecuted.value+'/'+ fldClosing.value ;

    }

}

function dpInputEvents(e) {
    var parentId
    var outPutElement = this.parentElement.children[2];

    // calcOutAdd(this, outPutElement);
    // outPutElement.innerHTML = "Processed Output";

    //  pass id of parent to routine 
    var row = this.parentElement.dataset.row;
    if (row < 7) {
        calcOutAdd(this.parentElement.id, row);
    } else {
        calcOutEstoppel(this.parentElement.id, row)
    }

    return;
}

function calcOutAdd(parentId, row) {
    var parentElement = document.getElementById(parentId);
    var inPutElement = parentElement.children[1];
    var outPutElement = parentElement.children[2];
    var msgElement = parentElement.children[3];
    var inPutNumb = inPutElement.value;
    if (isNaN(inPutNumb)) {

        inPutElement.value = '';
        return;
    }

    //  contract.parentId = inPutNumb;
    if (contract.execDate == '') {

        outPutElement.innerHTML = 'Execution Not Set';
        return;
    }
    outPutElement.innerHTML = 'Output';
    msgElement.innerHTML = inPutNumb;

    var outDate = addDays(contract.execDate, inPutNumb);
    var outDateString = outDate.toDateString();
    var dayNumb = outDate.getDay();

    if (dayNumb == 0 || dayNumb == 6) {

        var adjustedDate = addDays(outDate, weekendAdd[dayNumb]).toDateString();
        outPutElement.innerHTML = adjustedDate;
        msgElement.innerHTML = 'Moved from ' + outDateString;
        contract.dataFields[row] = inPutNumb + '|' + adjustedDate + '|' + outDateString;

    } else {
        msgElement.innerHTML = '';
        outPutElement.innerHTML = outDateString;
        contract.dataFields[row] = inPutNumb + '|' + outDateString;

    }




    //   contract.daysToClose = this.value;
    // contract.closeDate = addDays(contract.execDate, contract.daysToClose);


    // var dayNumb = (contract.closeDate).getDay();



    //     document.getElementById("closemsg").innerHTML = "Originally " + resultDate + ".  Moved to Monday";
    // } else {

    //     fldClosing.classList.add("blue-back");
    //     document.getElementById("closemsg").innerHTML = ""
    // }
    // fldClosing.value = contract.closeDate.toDateString();
    // fldClosing.classList.remove("blue-back");
    // fldClosing.classList.remove("red-back");
    // fldToClosed.classList.add("blue-back");
}