document.getElementById("loadtab").addEventListener("click", savePageInit);
document.getElementById("clear").addEventListener("click", clearStore);
document.getElementById("loadjson").addEventListener("click", loadJson);


function savePageInit(){
    if (typeof(Storage) !== "undefined") {
        var strContract = JSON.stringify(contract)
    localStorage.setItem('naborasis',strContract);
    document.getElementById('jsonarea').value = strContract;
    cl('contract',contract);
    

} else {
    // Sorry! No Web Storage support..
}

}

function    clearStore(){
localStorage.clear();
}

function    loadJson(){
    if (typeof(Storage) !== "undefined") {
        var jsonString = document.getElementById('jsonarea').value
       localStorage.setItem('naborasis',jsonString);
       setUpPageInit();


    }
}