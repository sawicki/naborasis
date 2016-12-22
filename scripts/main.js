debugger;
var contract = {
    propertyAdd: "",
    execDate: "",
    daysToClose: "",
    closeDate: "",
    dataFields: []
}
var gDaysToCloseLast = false;

var weekendAdd = [1, 0, 0, 0, 0, 0, 2];

// 
// Object containing keyed pairs of field IDs and the function that needs to be executed
//





var fldProperty = document.getElementById("property");
var fldExecuted = document.getElementById("executed-date");
var fldToClosed = document.getElementById("daystoclose");
var fldClosing = document.getElementById("close-date");
var fldClosingAlert = document.getElementById("closemsg");


// 
// Everything below is tab code
// 


document.getElementById("setuptab").addEventListener("click", tabClick);
document.getElementById("datatab").addEventListener("click", tabClick);
document.getElementById("copytab").addEventListener("click", tabClick);
document.getElementById("loadtab").addEventListener("click", tabClick);
document.getElementById("helptab").addEventListener("click", tabClick);


flatpickr(".flatpickr");


// TinyDatePicker(document.querySelector('#executed-date'));
// TinyDatePicker(document.querySelector('#close-date'));



function tabClick(e) {
    var tabObject = {
        "setuptab": "setuppage",
        "datatab": "datapage",
        "copytab": "copypage",
        "loadtab": "loadpage",
        "helptab": "helppage"
    };

    var tabs = document.getElementsByClassName("tabs");
    for (let i = 0; i < tabs.length; i++) {
        // tabs[i].style.backgroundColor = "lightgrey";
        tabs[i].classList.remove("tabselected");
    }
    this.classList.add("tabselected");
    var pagecontainers = document.getElementsByClassName("tabcontent");
    let selectedPage = document.getElementById(tabObject[this.id]);
    for (let i = 0; i < pagecontainers.length; i++) {
        pagecontainers[i].style.display = "none";
    }
    selectedPage.style.display = "block";
    // alert(this.id);
}



// this is the end of the function definitions

var pagecontainers = document.getElementsByClassName("tabcontent");
for (let i = 0; i < pagecontainers.length; i++) {
    pagecontainers[i].style.display = "none";
}
// document.getElementById("datatab").style.backgroundColor = "linen";
document.getElementById("setuppage").style.display = "block";