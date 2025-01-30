const submitBtn =  document.getElementById("submitBtn");
const phoneTextField = document.getElementById("phone");
const customerNameField = document.getElementById("customerName");
function startTimer() {
    let timer;
    let seconds = 0;
    const phoneNumber = document.getElementById("phone").value;
    if (phoneNumber.trim() === "") {
        alert("Please enter a phone number.");
        return;
    }
    document.getElementById("submitBtn").disabled = true;
    timer = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText = `Time Elapsed: ${seconds} sec`;
    }, 1000);
}



submitBtn.addEventListener("click", async function () {
    //send phone number to db
    let userContent = "User Phone Number: " + phoneTextField.value + " Customer Name: " + customerNameField.value
    fetch(`http://localhost:8080/createMessage/`,{
        method: "POST",
        body: JSON.stringify({
            "message": userContent,
            "author": "user",
            "type": "userInformation"
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
    startTimer()
    let summary = await fetch(`http://localhost:8080/getSummary`, {
        method: "GET"
    }).then(response => {
        return response.text();
    })
})