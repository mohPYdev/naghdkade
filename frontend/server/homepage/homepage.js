import { getCookieValue } from "../token";

function homepageOnloadHandler(){
    showReviewHandler();
}


//show reviews
function showReviewHandler(){
    let review = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);

    //show followin reviews


      // Get the token from the cookie
    const token = getCookieValue('token');
    console.log(token)
    fetch('http://localhost:8000/api/social/posts/following/', {
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




  

  