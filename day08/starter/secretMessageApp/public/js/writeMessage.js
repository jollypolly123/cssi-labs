console.log("running send");
// import "hashes"; // single module
// require('@libs/your-lib.js');

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

const message_sec = document.querySelector("#message");
const message_pass = document.querySelector("#passcode");

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function hasUppercase(password) {
    for (let i = 0 ; i < password.length ; i++){
        if (password[i] === password[i].toUpperCase()){
            return true;
        }
    }
    console.log("uppercase not fulfilled");
    return false
}

function hasTwoExclamationPoints(str) {
    let count = 0;
    for (let i = 0 ; i < str.length ; i++){
        if (str[i] === '!'){
            count++;
        }
    }
    let result = count >= 2 ? true : false;
    return result;
}

const submitMessage = () => {
    let passcode = message_pass.value;
    let secret_message = message_sec.value;
    
    if (secret_message.length > 10) {
        alert("Your message is too long. Please try again :T");
    } else if (!hasUppercase(passcode) || !hasTwoExclamationPoints(passcode)) {
        alert("Your passcode must contain a capital letter, nonalphanumeric character, and at least two exclamation points")
    }
    else {
        console.log(hashing(passcode));
        const messagesRef = firebase.database().ref();
        const messageRef = messagesRef.child(makeid(8));
        messageRef.update({
            'message': secret_message,
            'passcode': hashing(passcode)
        });
    }
    message_pass.value = "";
    message_sec.value = "";
}