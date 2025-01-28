import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: "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"
});

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
            //"id": id,
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
async function generateChatbotResponse(prompt) {
    let content = "you are a helpful chatbot of the company bugland. the company offers cleaning bots";
    try{
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "assistant", content: content },
                { role: "user", content: prompt },
            ],
            store: true,
        });
        console.log("-----");
        console.log(completion.choices[0].message.content);
    }
    catch(err){
        console.log(err);
    }
}

sendBtn.addEventListener("click", async function () {
    const userInput = textField.value;
    textField.value = ""; // to clear text field again
    createMessage(userInput, "user", "default");
    //add wait to ensure real response from ki is found
    let div = document.createElement("div");
    container.appendChild(div);
    await displayLoading(5, div)
    //get chatBot response
    await generateChatbotResponse(userInput)
    createMessage("this is a static response", "chatBot", "default");

})
