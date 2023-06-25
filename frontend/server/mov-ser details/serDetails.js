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
function movserDetailsOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
    showReviewsHandler();
}

function showReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show reviews

      // get the id of the series
      const urlParams = new URLSearchParams(window.location.search);
      const seriesID = urlParams.get('id');


        // Get the token from the cookie
        fetch(`http://localhost:8000/api/cinema/series/${seriesID}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(series => {
            console.log(series);
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

      fetch(`http://localhost:8000/api/social/posts/series/${seriesID}/`, {
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
  const content = document.getElementById('comment').value
  const urlParams = new URLSearchParams(window.location.search);
  const seriesID = urlParams.get('id');

  reviewInfo = {
    content: content,
    tv_series: seriesID,
  }

  token = getCookieValue('token');

  fetch(`http://localhost:8000/api/social/posts/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
      },
      body: JSON.stringify(reviewInfo)
  })
      .then(response => response.json())
      .then(data => {      
          console.log(data)
  })
}