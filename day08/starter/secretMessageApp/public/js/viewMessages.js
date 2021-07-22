console.log("gottem");
const deleteButton = document.querySelector(".delete");
const messagebox = document.querySelector(".is-info");
const messageDiv = document.querySelector("#message");
let errorNum = 0;
let boxNum = 0;
var delayInMilliseconds = 3000; //1 second


deleteButton.addEventListener("click", e => {
    messagebox.classList.add("hidden");
    messageDiv.innerHTML = "";
});

function getMessages() {
    console.log(firebase)
    const messagesRef = firebase.database().ref()
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        console.log(messages)
        validateMessages(messages)
    })

}


function validateMessages(messages){
    const passcodeAttempt = document.querySelector("#passcode").value
    let found = false;
    for (message in messages) {
        const messageData = messages[message]
        if (messageData.passcode === passcodeAttempt) {
            console.log("Correct password!")
            renderMessageAsHtml(messageData.message)
            found = true;
        }
    }
    if (!found) {
        alert("Your password is incorrect! Don't you dare try again >:(");
        errorNum++;
        if (errorNum > 2) {
            alert("You have reached the maximum number of attempts. Go away. You can't try again either.");
            document.getElementById("viewMsg").disabled = true;
            setTimeout(function() {
            document.getElementById("viewMsg").disabled = false;
            }, delayInMilliseconds);
            errorNum = 0;
        }
    }
}

function renderMessageAsHtml(messageContent) {
     // Hide Input Form
    const passcodeInput = document.querySelector('#passcodeInput');
    document.querySelector("#passcode").value = "";

    // Render message as HTML
    messageDiv.innerHTML += messageContent;
    messageDiv.innerHTML += '<hr>';
    
    messagebox.classList.remove("hidden");

    // randomed.style.top = ` ${Math.floor(Math.random() * 100)}%`
    
    // document.querySelector(".hero").innerHTML += `<article class="message randomed ${boxNum} is-info">
    //                                                     <div class="message-header">
    //                                                         <p>Message</p>
    //                                                         <button class="delete" aria-label="delete"></button>
    //                                                     </div>
    //                                                     <div class="message-body" id="message">
    //                                                         ${messageContent}
    //                                                     </div>
    //                                                 </article>`;
    // boxNum += 1
}
