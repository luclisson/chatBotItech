// html elements
const submidBtn = document.getElementById("supply-button");
const textField  = document.getElementById("text-field");
const checkBox = document.getElementById("check-box");
//default values
let micActive = false;
let counter =1; //counts the amount of messages created at the frontend (not really necessary anymore, but adds title type to the first message)
                            // later this needs to be read from json to start at already existing messages
let type = "default";
//functions
function checkDevice(number){
    let ending = ""
    for(let i = number.length-2; i < number.length; i++){
        ending += number[i];

    }
    switch (ending){
        //in a bigger application you could validate further, for this basic case i think a console.log is enough
        case "01":
            console.log("valid device found");
            break;
        case "02":
            console.log("valid device found");
            break;
        case "03":
            console.log("valid device found");
            break;
        case "04":
            console.log("valid device found");
            break;
        case "05":
            console.log("valid device found");
            break;
        case "06":
            console.log("valid device found");
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
        //handle exception of white spaces later
        console.log(textField.value);
        if (counter === 1){
            type = "title"
        }else{
            type = "default";
        }
        fetch(`http://localhost:8080/createMessage/`,{
            method: "POST",
            body: JSON.stringify({
                "message": textField.value,
                "author": "user",
                "type": type,

            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        })
        counter++;
        //textField.value = ""; //empty the text field
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

checkBox.addEventListener("change", function () {
    micActive = !micActive;
    console.log(`micActive changed to ${micActive}`);
    //send api call to get mic input
})