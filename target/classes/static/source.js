// html elements
const submidBtn = document.getElementById("supply-button");
const textField  = document.getElementById("text-field");
const checkBox = document.getElementById("check-box");
//default values
let micActive = false;
submidBtn.addEventListener("click", function () {
    if (textField.value != "") {
        //handle exception of white spaces later
        console.log(textField.value);
        // send post request to backend
    }
})

checkBox.addEventListener("change", function () {
    micActive = !micActive;
    console.log(`micActive changed to ${micActive}`);
    //send api call to get mic input
})