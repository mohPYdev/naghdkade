function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

let token;
function reviewDetailsOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
    showCommentsHandler();
}

function showCommentsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    // show review detail

    const postID= 1;
    // Get the token from the cookie
    const token = getCookieValue('token');
    fetch(`http://localhost:8000/api/social/posts/${postID}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(post => {
        console.log(post);
        // You can also append the movie details to an HTML element
        // For example:
        // const movieElement = document.createElement('div');
        // movieElement.textContent = movie.title;
        // document.body.appendChild(movieElement);
        })
    .catch(error => {
        console.error('Error:', error);
    });



    // show comments

    fetch(`http://localhost:8000/api/social/comments/${postID}/`, {
        headers: {
        'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        console.log(comment);
        // You can also append the movie details to an HTML element
        // For example:
        // const movieElement = document.createElement('div');
        // movieElement.textContent = movie.title;
        // document.body.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });    

}

function submitComment(){
    // content
    const commentInfo = {
        content: document.getElementById('comment')
    };
    
    // Post login information
    fetch('http://localhost:8000/auth/token/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
        body: JSON.stringify(commentInfo)
    })
        .then(response => response.json())
        .then(data => {      
            console.log(data)

            // reload the page
    })
}

function submitRate(){
  
}