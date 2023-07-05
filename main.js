// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.body.querySelector('#modal');

  let likeGlyph = document.body.querySelectorAll('.like-glyph');
  likeGlyph.forEach(element => element.addEventListener('click', handleLike));
})

function handleLike(event) {
  const heart = event.target;
  const postId = event.target.parentNode.parentNode.parentNode.parentNode.id;
  let likeValue;
  if (heart.className === 'like-glyph'){
    likeValue = 'true';
  } else if (heart.className === 'activated-heart'){
    likeValue = 'false';
  }
  mimicServerCall(`http://mimicServer.example.com/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      like: likeValue
    })
  })
  .then(res => {
    if(res && likeValue === 'true'){
      heart.textContent = FULL_HEART;
      heart.setAttribute('class', 'activated-heart');
    } else if(res && likeValue === 'false') {
      heart.textContent = EMPTY_HEART;
      heart.setAttribute('class', 'like-glyph');
    }
  })
  .catch((error) => {
    modal.setAttribute('class', '');
    modal.textContent = error;
    setTimeout("modal.setAttribute('class', 'hidden')", 3000);
  });
}
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
