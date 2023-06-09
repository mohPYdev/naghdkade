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
    
  document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'

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
        let movieArea = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);
        movieArea.style.display = 'block';

        movieArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = movie.poster;
        movieArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].getElementsByTagName('h3')[0].textContent = movie.title + " (" + movie.release_date + ")";
        movieArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../mov-ser details/movDetails.html?id=${movie.id}`;

        document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movieArea);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}