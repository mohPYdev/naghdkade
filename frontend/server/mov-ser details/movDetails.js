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
    showMovieDetails();
    showReviewsHandler();
}

function showMovieDetails(){
  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get('id');

  fetch(`http://localhost:8000/api/cinema/movies/${movieID}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(movie => {
        console.log(movie);
        document.getElementsByClassName('rounded-circle')[0].src = movie.poster;
        document.getElementsByClassName('tm-font-400')[0].textContent = movie.title + " (" + movie.release_date + ")"
        //insert genres
        let genres = "";
        for (let i=0 ; i<movie.genres.length ; i++){
          genres += movie.genres[i].name + " "
        }
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[1].textContent = movie.duration + " : مدت زمان";
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[2].textContent = movie.summary + " : خلاصه داستان";
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = movie.link;
        })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showReviewsHandler(){

    document.getElementsByClassName('tm-timeline-item')[1].style.display = 'none';

    // get the id of the movie
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');

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
            let review = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);
            review.style.display = 'block';

            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = post.user.image;
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('h3')[0].textContent = post.movie.title + " (" + post.movie.release_date + ")";
            //insert genres
            let genres = "";
            for (let i=0 ; i<post.movie.genres.length ; i++){
              genres += post.movie.genres[i].name + " "
            }
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../reviewDetails/reviewDetails.html?id=${post.id}`;
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[1].href = `../profile/otherProfile.html?id=${post.user.id}` ;
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[1].getElementsByTagName('p')[0].textContent = post.user.username + " : پست شده توسط";
            
            document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(review);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });

}

function submitReview(){

    const content = document.getElementById('comment').value
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');

    reviewInfo = {
      content: content,
      movie: movieID,
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
            console.log(data);
            location.reload();
    })

}