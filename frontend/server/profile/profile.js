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

function otherProfileOnloadHandler(){
  showOtherProfile();
  checkCookie();
}

function selfProfileOnloadHandler(){
  showSelfProfile();
  checkCookie();
}

function otherReviewsOnloadHandler(){
  checkCookie();
  showOtherReviewsHandler();
}

function selfReviewsOnloadHandler(){
  checkCookie();
  showSelfReviewsHandler();
}

let token;
function checkCookie(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
}

function showOtherProfile(){
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');

  fetch(`http://localhost:8000/auth/users/${userID}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        document.getElementsByClassName('profile-image')[0].src = user.image;
        document.getElementsByClassName('font-weight-bold')[0].textContent = user.username;
        document.getElementById('userBio').textContent = user.bio;
        })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showSelfProfile(){
  fetch(`http://localhost:8000/auth/users/me/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        document.getElementsByClassName('profile-image')[0].src = user.image;
        document.getElementsByClassName('font-weight-bold')[0].textContent = user.username;
        document.getElementById('userBio').textContent = user.bio;
        document.getElementsByClassName('following-follower')[0].getElementsByTagName('div')[0].getElementsByTagName('a').href = `following.html?id=${user.id}`
        document.getElementsByClassName('following-follower')[0].getElementsByTagName('div')[1].getElementsByTagName('a').href = `follower.html?id=${user.id}`
        })
    .catch(error => {
        console.error('Error:', error);
    });
}

//show reviews
function showOtherReviewsHandler(){
  
  document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'

  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');
  // show profile

  fetch(`http://localhost:8000/api/social/posts/${userID}/`, {
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
                review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر:";
            }
            else{
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByClassName('tm-font-400')[0].textContent = post.tv_series.title;
              //genres
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر:";
            }
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../reviewDetails/reviewDetails.html?id=${post.id}`;
            
            document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);
          });
          })
      .catch(error => {
          console.error('Error:', error);
      });

}

//show reviews
function showSelfReviewsHandler(){

  document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'

  // show profile

  fetch(`http://localhost:8000/api/social/posts/me/`, {
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
                review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر:";
            }
            else{
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByClassName('tm-font-400')[0].textContent = post.tv_series.title;
              //genres
              review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = "ژانر:";
            }
            review.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../reviewDetails/reviewDetails.html?id=${post.id}`;
            
            document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);
          });
          })
      .catch(error => {
          console.error('Error:', error);
      });

}

function toggleFollowButton(){
    // if(){
    //     document.getElementById('userFollowBtn').value = "دنبال نکردن";
    // }
    // else{
    //     document.getElementById('userFollowBtn').value = "دنبال کردن";
    // }
}