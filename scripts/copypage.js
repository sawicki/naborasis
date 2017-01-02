document.getElementById("copytab").addEventListener("click", copyPageInit);

function copyPageInit() {

    var outText = contract.propertyAdd + '</br>';
    var propPrefix = contract.propertyAdd.substr(0, 20)
    outText += prefix(contract.execDate.toDateString());
    outText += prefix(contract.closeDate.toDateString());
    outText += prefix(contract.dataFields[1]);
    outText += prefix(contract.dataFields[2]);
    outText += prefix(contract.dataFields[3]);
    outText += prefix(contract.dataFields[4]);
    outText += prefix(contract.dataFields[5]);
    outText += prefix(contract.dataFields[6]);
    outText += prefix(contract.dataFields[7]);

    document.getElementById('copypagetext').innerHTML = outText;

    function prefix(nextString) {

        return propPrefix + ' ' + nextString + '</br>';

    }

}