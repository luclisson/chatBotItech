// html elements
const submidBtn = document.getElementById("supply-button");
const textField  = document.getElementById("text-field");
const checkBox = document.getElementById("check-box");
//default values
let micActive = false;
let counter =2; //first id is used for title in index page
                            // later this needs to be read from json to start at already existing messages
let type = "default";
submidBtn.addEventListener("click", function () {
    if (textField.value != "") {
        //handle exception of white spaces later
        console.log(textField.value);
        if (counter === 1){
            type = "title"
        }else{
            type = "default";
        }
        fetch(`http://localhost:8080/createMessage/${counter}`,{
            method: "POST",
            body: JSON.stringify({
                "message": textField.value,
                "author": "me",
                "type": type,
                "id": counter
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        })
        counter++;
        textField.value = ""; //empty the text field
    }
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
})

checkBox.addEventListener("change", function () {
    micActive = !micActive;
    console.log(`micActive changed to ${micActive}`);
    //send api call to get mic input
})