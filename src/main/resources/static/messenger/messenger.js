const container = document.getElementById("container");
const sendBtn = document.getElementById("sendButton");
const humanSupportBtn = document.getElementById("employeeButton");
const textField = document.getElementById("messageInput");
const numberParagraphEL = document.getElementById("serialNumber-p");
const botParagraphEL = document.getElementById("bot-p");
//fetching title from index page
fetch(`http://localhost:8080/messages/3`,{ //only 2 because im sending a test msg to the db on id=1
    method: "GET"
}).then((response) => {
    return response.json();
}).then((data) => {
    numberParagraphEL.innerHTML = "detected serial number: " + data.message;
})
fetch(`http://localhost:8080/messages/2`,{ //only 2 because im sending a test msg to the db on id=1
    method: "GET"
}).then((response) => {
    return response.json();
}).then((data) => {
    botParagraphEL.innerHTML = "detected bot from serial number: " + data.message;
})
//functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function displayLoading(times, htmlElement) {
    let paragraph = document.createElement("p");
    htmlElement.appendChild(paragraph);
    for (let i = 0; i < times; i++) {
        for(let i = 0; i < 4; i++) {
            paragraph.innerHTML = paragraph.innerHTML + ". ";
            await sleep(100)
        }
        paragraph.innerHTML = "";
    }
}


function createMessage(message,author, type) {
    const newMessageContainer = document.createElement("div");
    container.appendChild(newMessageContainer);
    newMessageContainer.classList.add("message-container");
    const newMessageDiv = document.createElement("div");
    newMessageContainer.appendChild(newMessageDiv);
    if(author === "user"){
        newMessageDiv.classList.add("user-message");
    }else if(author === "chatBot"){
        newMessageDiv.classList.add("bot-message");
    }else{
        console.log("author is defined wrong")
    }
    newMessageDiv.innerText = message;

    fetch(`http://localhost:8080/createMessage/`,{
        method: "POST",
        body: JSON.stringify({
            "message": message,
            "author": author,
            "type": type
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })

    //create response, display it and add it to the db
}
function generateChatbotResponse(prompt) {
    prompt = prompt.replaceAll(" ", "-");
    return fetch(`http://localhost:8080/genResponse/${prompt}`,{
        method: "GET"
    }).then(response => {
        return response.text();
    })

}

sendBtn.addEventListener("click", async function () {
    const userInput = textField.value;
    textField.value = ""; // to clear text field again
    createMessage(userInput, "user", "default");
    //add wait to ensure real response from ki is found
    let div = document.createElement("div");
    container.appendChild(div);
    await displayLoading(5, div);
    //get chatBot response
    let chatBotResponse  = await generateChatbotResponse(userInput);
    createMessage(chatBotResponse, "chatBot", "default");
})
humanSupportBtn.addEventListener("click", async function () {
    //redirect to end page and waiting time countdown
    fetch(`http://localhost:8080/redirectToWaitingRoom`, {
        redirect: 'follow',
    }).then(response => {
        if (response.ok) {
            window.location.href = response.url;
        }else{
            console.error("Request failed with status:", response.status);
        }
    }).catch(error =>{
        console.error("Error during fetch:", error);
    });
})
