//defining html elements
const container = document.getElementById("container");
const sendBtn = document.getElementById("sendButton");
const textField = document.getElementById("messageInput");
const bugParagraphEL = document.getElementById("title-p");
//fetching title from index page
fetch(`http://localhost:8080/messages/2`,{ //only 2 because im sending a test msg to the db on id=1
    method: "GET"
}).then((response) => {
    return response.json();
}).then((data) => {
    console.log(data.message);
    bugParagraphEL.innerHTML = data.message;
})


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
            //"id": id,
            "message": message,
            "author": author,
            "type": type
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
}

sendBtn.addEventListener("click", function () {
    const userInput = textField.value;
    textField.value = ""; // to clear text field again
    createMessage(userInput,"user","default");

})
