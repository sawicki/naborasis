document.getElementById("datatab").addEventListener("click", dataPageInit);



var rows = document.querySelectorAll("#datapage div.flexbox");
for (let i = 0; i < (rows.length - 1); i++) {
    var curRow = rows[i];
    curRow.children[1].addEventListener("keyup", dpInputEvents);
}



// ******************  End of Setup Initialization

function dataPageInit() {
    if (contract.execDate == "" | contract.closeDate == '') {
        document.getElementById('datapagetitle').innerHTML = "Please Select Both Contract Execution and Close Dates First";
        document.getElementById('datapagetitle').classList.add('red-back');
    } else {
        document.getElementById('datapagetitle').innerHTML = "";
        document.getElementById('datapagetitle').classList.remove('red-back');
        document.getElementById('datapagetitle').innerHTML = "Execution Date/Close Date = " + fldExecuted.value + '/' + fldClosing.value;

    }

    // function dateShift(date, daysshifted, rowid)
    dateShift(contract.closeDate, '-15', "estoppel");
    dateShift(contract.execDate, '10', "assoc");


}

// Processes first 5 rows of datapage

function dpInputEvents(e) {
    if (e.keyCode == 9) return
    var parentId
    var outPutElement = this.parentElement.children[2];

    //  pass id of parent to routine 
    var row = this.parentElement.dataset.row;
    if (row < 6) {
        calcOutAdd(this.parentElement.id, row);
    }

    return;
}

function dateShift(date, shiftDays, rowId) {
    var addDate = addDays(date, shiftDays);
    var dayNumb = addDate.getDay();
    var movedDate = ''
    var movedFromMsg = '';
    if (dayNumb == 0) {
        movedDate = addDate;
        addDate = addDays(addDate, '1');
    }
    if (dayNumb == 6) {
        movedDate = addDate;
        addDate = addDays(addDate, '2');
    }

    var parentElement = document.getElementById(rowId);
    var writeElement = parentElement.children[1];
    writeElement.innerHTML = addDate.toDateString();

    if (movedDate != '') {
        writeElement = parentElement.children[2];
        writeElement.innerHTML = movedDate.toDateString();

    }


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
        contract.dataFields[row] = parentElement.id + '|' + inPutNumb + '|' + adjustedDate + '|' + 'Moved from ' + outDateString;

    } else {
        msgElement.innerHTML = '';
        outPutElement.innerHTML = outDateString;
        contract.dataFields[row] = parentElement.id + '|' + inPutNumb + '|' + outDateString;

    }

}