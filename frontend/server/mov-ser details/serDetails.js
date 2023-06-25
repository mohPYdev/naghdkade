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
    showSerieDetails();
    showReviewsHandler();
}

function showSerieDetails(){
  const urlParams = new URLSearchParams(window.location.search);
  const serieID = urlParams.get('id');

  fetch(`http://localhost:8000/api/cinema/series/${serieID}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(serie => {
        console.log(serie);
        document.getElementsByClassName('rounded-circle')[0].src = serie.poster;
        document.getElementsByClassName('tm-font-400')[0].textContent = serie.title + " (" + serie.start_date + ")"
        //insert genres
        let genres = "";
        for (let i=0 ; i<serie.genres.length ; i++){
          genres += serie.genres[i].name + " "
        }
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[1].textContent = serie.summary + " : خلاصه داستان";
        document.getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = serie.link;
        })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showReviewsHandler(){

    document.getElementsByClassName('tm-timeline-item')[1].style.display = 'none';

    // get the id of the serie
    const urlParams = new URLSearchParams(window.location.search);
    const serieID = urlParams.get('id');

        // fetching the reviews of this movie

      fetch(`http://localhost:8000/api/social/posts/series/${serieID}/`, {
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
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('h3').textContent = post.movie.title + " (" + post.start_date + ")";
            //insert genres
            let genres = "";
            for (let i=0 ; i<post.tv_series.genres.length ; i++){
              genres += post.tv_series.genres[i].name + " "
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