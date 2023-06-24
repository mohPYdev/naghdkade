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
function moviesOnloadHandler(){
  token = getCookieValue('token');
  if(token == null || token == undefined || token == "undefined"){
    top.location = '../signin-signup.html';
  }
  showMovieHandler();
}

//show reviews
function showMovieHandler(){
    
    let movie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show movies
      // Get the token from the cookie
      fetch('http://localhost:8000/api/cinema/movies/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then(response => response.json())
        .then(movies => {
          movies.forEach(movie => {
            console.log(movie);
            // You can also append the movie details to an HTML element
            // For example:
            // const movieElement = document.createElement('div');
            // movieElement.textContent = movie.title;

              // Add click event listener to each movie element   TODO: event listener like this
            // movieElement.addEventListener('click', () => {
            //   // Construct the URL for the movie detail page
            //   const movieDetailURL = `../mov-ser details/movDetail.html?id=${movie.id}`;
            //   // Redirect the user to the movie detail page
            //   window.location.href = movieDetailURL;
            // });

            // document.body.appendChild(movieElement);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
}