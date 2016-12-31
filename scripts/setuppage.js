// fldProperty.addEventListener('keydown', fieldChange);
fldProperty.addEventListener('keyup', propertyChanged, false);
fldProperty.addEventListener('blur', propertyChanged, false);
fldExecuted.addEventListener('change', executedChanged, false);
fldToClosed.addEventListener('keyup', daystoChanged, false);
fldToClosed.addEventListener('blur', daystoChanged, false);
fldClosing.addEventListener("change", closingChanged, false);

setUpPageInit();

function setUpPageInit() {
    // get local store if avail

    if (typeof (Storage) === "undefined") {
        return;
    }

    var localStore = localStorage.getItem('naborasis');
    if (localStore === null) {
        return;
    }

    contract = JSON.parse(localStore);
    contract.execDate = new Date(contract.execDate);
    contract.closeDate = new Date(contract.closeDate);
    fldProperty.value = contract.propertyAdd;
    fldExecuted.value = contract.execDate.toDateString();
    fldToClosed.value = contract.daysToClose;
    fldClosing.value = contract.closeDate.toDateString();
    var datafields = contract.dataFields;
    for (var i = 0; i < datafields.length; i++) {
        var curField = datafields[i];

        if (curField != null) {
            curField = curField.split('|')
            var childEl = document.getElementById(curField[0]).children;

            childEl[1].value = parseInt(curField[1]);
           console.log('Field = ' + parseInt(curField[1]) );
            childEl[2].innerHTML = curField[2];
            if (curField[3] != undefined) childEl[3].innerHTML = curField[3]; 
        }
        

    }





}
// Initial Dates for Executed and Closed

function executedChanged() {

    // var inExecStr = this.value;
    contract.execDate = new Date(this.value + " 00:00:00");


    fldExecuted.value = contract.execDate.toDateString();
    fldExecuted.classList.add("blue-back");
    contract.closeDate = "";
    fldClosing.value = "";
    contract.daysToClose = "";
    fldToClosed.value = "";
    fldToClosed.classList.remove("blue-back");
    fldClosing.classList.remove("blue-back");
    document.getElementById("closemsg").innerHTML = "";
    document.getElementById("todaysmsg").innerHTML = "";
    document.getElementById('datapagetitle').innerHTML = "Execution Date/Close Date = " + contract.execDate.toDateString() + '/';


    // if (contract.daysToClose === ""){return}
    // addDays(contract.execDate, contract.daysToClose, fldClosing);

    // fldToClosed.value = "";
    // fldClosing.value = "";
    // contract.closeDate = "";
    // contract.daysToClose ="";
    // 
    return;

}

// function fieldChange(e) {
//     if (e.type !== "blur") {
//         var key = event.which || event.keyCode;
//         if (key !== 13) {
//             return
//         }
//     }




//     document.getElementById("test").innerHTML = "   The field Changed was  " + this.id + '  event type =  ' + e.type + 'value = ' +  this.value;

//     switch (this.id) {
//         case "daystoclose":
//             daystoChanged(this.value);
//             break;
//         case "property":
//             propertyChanged(this.value);
//             break;
//         case "close-date":
//             closingChanged(this.value);
//             break;
//         default:
//             return;


//     }
// }

function propertyChanged(e) {
    // if (e.type !== "blur") {
    //     var key = event.which || event.keyCode;
    //     if (key !== 13) {
    //         return
    //     }
    //     if (this.value !== "") {
    //         contract.propertyAdd = this.value;
    //         fldProperty.classList.add("blue-back");
    //     } else {
    //         contract.propertyAdd = this.value;
    //         fldProperty.classList.remove("blue-back");
    //     }
    // }

    if (this.value.length >= 45) {
        this.value = this.value.slice(0, 45);
        return;
    }
    contract.propertyAdd = this.value;
    fldProperty.classList.add("blue-back");
    return
}

function closingChanged(e) {
    //  alert(this.value);
    // var newDateString = inDateFormat(this.value+"T00:00:00Z");
    contract.closeDate = new Date(this.value + " 00:00:00");
    var dayNumb = contract.closeDate.getDay();
    if (contract.execDate != "") {
        // alert("Contract Executed Date Not Set");
        contract.daysToClose = dateDif(contract.closeDate, contract.execDate);
        fldToClosed.value = contract.daysToClose;
        fldToClosed.classList.remove("blue-back");
    } else {
        document.getElementById("closemsg").innerHTML = "Please set contract execution date first";
        fldClosing.value = "";
        return;
    }

    if (dayNumb == 0 || dayNumb == 6) {
        // contract.closeDate = addDays(contract.closeDate, weekendAdd[dayNumb]);
        fldClosing.classList.remove("blue-back");

        fldClosing.classList.add("red-back");
        document.getElementById("closemsg").innerHTML = "Please note you picked a weekend day";
    } else {
        fldClosing.classList.remove("red-back");
        fldClosing.classList.add("blue-back");

    }


    document.getElementById("closemsg").innerHTML = "";

    fldClosing.value = contract.closeDate.toDateString();


    gDaysToCloseLast = false;
}

//--------------------------------------------------------

function daystoChanged(e) {
    // if (e.type !== "blur") {
    //     var key = event.which || event.keyCode;
    //     if (key !== 13) {
    //         return;
    //     }
    // }
    if (isNaN(this.value)) {

        this.value = '';
        fldToClosed.classList.remove("blue-back");
        contract.closeDate = '';
        fldClosing.value = '';
        return;
    }
    if (contract.execDate === "") {
        // alert("Please set contract execution date");
        document.getElementById("todaysmsg").innerHTML = "Please set contract execution date first";
        fldToClosed.value = "";
        fldToClosed.classList.remove("blue-back");

        return;
    }
    contract.daysToClose = this.value;
    contract.closeDate = addDays(contract.execDate, contract.daysToClose);


    var dayNumb = (contract.closeDate).getDay();

    if (dayNumb == 0 || dayNumb == 6) {
        // var resultDate = dateFormat(contract.closeDate);
        var resultDate = contract.closeDate.toDateString();
        contract.closeDate = addDays(contract.closeDate, weekendAdd[dayNumb]);
        // fldClosing.value = dateFormat(contract.closeDate);

        document.getElementById("closemsg").innerHTML = "Originally " + resultDate + ".  Moved to Monday";
    } else {

        fldClosing.classList.add("blue-back");
        document.getElementById("closemsg").innerHTML = ""
    }
    fldClosing.value = contract.closeDate.toDateString();

    fldClosing.classList.remove("blue-back");
    fldClosing.classList.remove("red-back");
    fldToClosed.classList.add("blue-back");
}