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
function newestReviewsOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
    showReviewHandler();
}

//show reviews
function showReviewHandler(){
    
    document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'
    
    //show newest reviews
    // Get the token from the cookie
    fetch('http://localhost:8000/api/social/posts/', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => response.json())
      .then(posts => {
      posts.forEach(post => {
        let review = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);
        review.style.display = 'block';

        console.log(post);
        review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = post.user.image;
        if (post.movie != null){
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByClassName('tm-font-400')[0].textContent = post.movie.title;
            //genres
            let genres = "";
              for (let i=0 ; i<post.movie.genres.length ; i++){
                genres += post.movie.genres[i].name + " "
              }
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        }
        else{
          review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByClassName('tm-font-400')[0].textContent = post.tv_series.title;
          //genres
          let genres = "";
              for (let i=0 ; i<post.tv_series.genres.length ; i++){
                genres += post.tv_series.genres[i].name + " "
              }
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        }
        review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../reviewDetails/reviewDetails.html?id=${post.id}`;
        review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[1].textContent = post.user.username + " : پست شده توسط" ;
        review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[1].href = `../profile/otherProfile.html?id=${post.user.id}`;

        document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

}