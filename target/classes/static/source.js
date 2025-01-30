// html elements
const submidBtn = document.getElementById("supply-button");
const textField  = document.getElementById("text-field");
//functions
function fetchCreateMessage(message,author,type){
    fetch(`http://localhost:8080/createMessage/`,{
        method: "POST",
        body: JSON.stringify({
            "message": message,
            "author": author,
            "type": type,

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
}
function checkDevice(number){
    let ending = ""
    for(let i = number.length-2; i < number.length; i++){
        ending += number[i];

    }
    switch (ending){
        case "01":
            fetchCreateMessage("Cleanbug", "system", "required")
            break;
        case "02":
            fetchCreateMessage("WindowFly", "system", "required")
            break;
        case "03":
            fetchCreateMessage("GardenBeetle", "system", "required")
            break;
        case "04":
            fetchCreateMessage("AirMite", "system", "required")
            break;
        case "05":
            fetchCreateMessage("BugGuard", "system", "required")
            break;
        case "06":
            fetchCreateMessage("FridgeAnt", "system", "required")
            break;
        default:
            console.log("invalid device");
            return -1;
    }
    return ending;
}
function checkLetters(number){
    let containsLowerCase = false;
    let containsUpperCase = false;
    for (let i =0 ; i < number.length ; i++){
        //add ascii ranges
        if(number.charCodeAt(i)>= 97 && number.charCodeAt(i) <= 122){
            containsLowerCase = true;
        }
        if(number.charCodeAt(i)>= 65 && number.charCodeAt(i) <= 90){
            containsUpperCase = true;
        }
        if(containsUpperCase && containsLowerCase){
            return true;
        }
    }
    return false;
}
//check if serial number is valid
function checkValidSerialNumber(number){
    return checkDevice(number) !== -1 && checkLetters(number);
}
function redirectToMessenger(){
    fetch(`http://localhost:8080/redirectToMessenger`, {
        redirect: 'follow'
    })
        .then(response => {
            if (response.ok) {
                // Redirect the browser to the final URL
                window.location.href = response.url;
            } else {
                console.error("Request failed with status:", response.status);
            }
        })
        .catch(error => {
            console.error("Error during fetch:", error);
        });
}
function sendMessage(){
    //post request message
    if (textField.value != "") {
        fetchCreateMessage(textField.value, "user","title")
    }

}
submidBtn.addEventListener("click", function () {
    if (checkValidSerialNumber(textField.value)) {
        sendMessage();
        redirectToMessenger();
    }else{
        textField.value = "";
        textField.placeholder = "please enter a valid serial number";
    }
})