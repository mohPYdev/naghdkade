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
function personReviewsOnloadHandler(){
    showPersonReviewsHandler();
}
function profileOnloadHandler(){
    showFollowArea();
    showUserFollow();
}

//show reviews
function showPersonReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movie);
    const token = getCookieValue('token');



    // show profile

    fetch(`http://localhost:8000/auth/users/me/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            // You can also append the movie details to an HTML element
            // For example:
            // const movieElement = document.createElement('div');
            // movieElement.textContent = movie.title;
            // document.body.appendChild(movieElement);
            })
        .catch(error => {
            console.error('Error:', error);
        });



    //show reviews

    fetch(`http://localhost:8000/api/social/posts/me/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then(response => response.json())
        .then(posts => {
          posts.forEach(post => {
            console.log(post);
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

function showFollowArea(){
    /*if(){
    document.getElementsByClassName('following-follower')[0].style.display = "none";

    }*/
}

function showUserFollow(){
    /*if(){
    document.getElementsByClassName('userFollow')[0].style.display = "none";

    }*/
}

function toggleFollowButton(){
    // if(){
    //     document.getElementById('userFollowBtn').value = "دنبال نکردن";
    // }
    // else{
    //     document.getElementById('userFollowBtn').value = "دنبال کردن";
    // }
}