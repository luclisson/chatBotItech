//defining html elements
const container = document.getElementById("container");
const sendBtn = document.getElementById("sendButton");
const textField = document.getElementById("messageInput");
const bugParagraphEL = document.getElementById("title-p");
//fetching title from index page
fetch(`http://localhost:8080/messages/1`,{
    method: "GET"
}).then((response) => {
    return response.json();
}).then((data) => {
    bugParagraphEL.innerHTML = data.message;
})


function createMessage(id, message,author, type) {
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

    fetch(`http://localhost:8080/createMessage/${id}`,{
        method: "POST",
        body: JSON.stringify({
            "id": id,
            "message": message,
            "author": author,
            "type": type
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
}
let id = 2; // id 1 is already in use because of title, in the future json reader +1
sendBtn.addEventListener("click", function () {
    const userInput = textField.value;
    textField.value = ""; // to clear text field again
    createMessage(id, userInput,"user","default");
    id++;
})
