// debugger;
var contract = {
    propertyAdd: "",
    execDate: "",
    daysToClose: "",
    closeDate: "",
    dataFields: []
}


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

function tabClick(e) {
    var tabObject = {
        "setuptab": "setuppage",
        "datatab": "datapage",
        "copytab": "copypage",
        "loadtab": "loadpage",
        "helptab": "helppage"
    };

    // remove tabselectedcontent from current pagecontainers


    var curTab = document.querySelector(".tabselected");
    var curPage = document.getElementById(tabObject[curTab.id]);


    curTab.classList.remove("tabselected");
    curPage.classList.remove("tabcontentselected");

    this.classList.add("tabselected");
    var selectedPageID = tabObject[this.id];
    var selectedPage = document.getElementById(selectedPageID);
    selectedPage.classList.add("tabcontentselected");

}