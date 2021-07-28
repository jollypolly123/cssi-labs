let googleUser;

// let firebase = firebase;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteLabel = document.querySelector('#noteLabels');
  const noteText = document.querySelector('#noteText');
  const noteImage = document.querySelector('#noteImage');
  const created = new Date();
  
  let noteLabels = noteLabel.value.split(",");
  const noteLabelLen = noteLabels.length;
  for (let i=0; i<noteLabelLen; i++) {
    noteLabels[i] = noteLabels[i].trim();
  }
  
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    created: created.toISOString(),
    labels: noteLabels,
    image: noteImage.value
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    noteLabel.value = "";
    noteImage.value = "";
  });
}

function logout() {
    firebase.auth().signOut().then(function() {
    }, function(error) {
        console.log("error");
    });
}
