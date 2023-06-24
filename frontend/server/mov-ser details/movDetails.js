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
function movserDetailsOnloadHandler(){
    //set details
    showReviewsHandler();
}

function showReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show reviews

    const movieID= 1;
        // Get the token from the cookie
        const token = getCookieValue('token');
        fetch(`http://localhost:8000/api/cinema/movies/${movieID}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(movie => {
            console.log(movie);
            // You can also append the movie details to an HTML element
            // For example:
            // const movieElement = document.createElement('div');
            // movieElement.textContent = movie.title;
            // document.body.appendChild(movieElement);
            })
        .catch(error => {
            console.error('Error:', error);
        });



        // fetching the reviews of this movie

      fetch(`http://localhost:8000/api/social/posts/movie/${movieID}/`, {
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

function submitReview(){
  
}