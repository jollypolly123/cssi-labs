let googleUser;
let category = "";

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      document.querySelector(".is-1").innerHTML = "What's on your mind, " + user.displayName + "?"
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function logout() {
    firebase.auth().signOut().then(function() {
    }, function(error) {
        console.log("error");
    });
}

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const categoryInputs = document.querySelectorAll('select option');
  const created = new Date();
  let categories = [];

  const categoryInputsLength = categoryInputs.length;

  for (var i=0; i< categoryInputsLength; i++) {
      if (categoryInputs.item(i).selected) categories.push(categoryInputs.item(i).value);
  }

  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    created: created.toISOString(), // or to unix time
    category: categories,
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    for (var i=0; i< categoryInputsLength; i++) {
        categoryInputs.item(i).selected = false;
    }
  });
};

function goToNotes() {
    window.location = "notes.html";
}
