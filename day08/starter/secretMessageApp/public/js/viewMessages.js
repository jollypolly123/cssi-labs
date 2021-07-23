console.log("gottem");
// const deleteButton = document.querySelector(".delete");
const messageDiv = document.querySelector("#message");
let errorNum = 0;
let boxNum = 0;
var delayInMilliseconds = 3000; //1 second
let colors = ["is-dark", "is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger" ]

function hashing(pwd) {
  var hash = 0, i, chr;
  if (pwd.length === 0) return hash;
  for (i = 0; i < pwd.length; i++) {
    chr   = pwd.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function deleteButton(button_id){
    console.log(button_id)
    const messagebox = document.getElementById(button_id);
    // console.log(messagebox.classList)
    messagebox.classList.add("hidden");
    // messageDiv.innerHTML = "";
}

function getMessages() {
    const messagesRef = firebase.database().ref()
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        validateMessages(messages);
    })

}


function validateMessages(messages){
    const passcodeAttempt = document.querySelector("#passcode").value
    let found = false;
    for (message in messages) {
        const messageData = messages[message]
        if (messageData.passcode == hashing(passcodeAttempt)) {
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

    let random_top = ` ${Math.floor(Math.random() * 80) + 7}%`
    let random_left = ` ${Math.floor(Math.random() * 80)}%`

    let random_id = `id_${Math.floor(Math.random() * 1000)}`
    let random_color = colors[`${Math.floor(Math.random() * 7)}`]

    document.querySelector(".hero").innerHTML += `<article class="message ${random_color}" id="${random_id}" style="position: fixed; width: 20% !important; text-align: center; top: ${random_top}; left: ${random_left};">
                                                        <div class="message-header">
                                                            <p>Message</p>
                                                            <button class="delete" id="${random_id}" aria-label="delete" onClick="deleteButton(this.id)"></button>
                                                        </div>
                                                        <div class="message-body" id="message">
                                                            ${messageContent}
                                                        </div>
                                                    </article>`;
}
