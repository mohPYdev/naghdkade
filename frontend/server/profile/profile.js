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

async function isFollow(userID){
  const token = getCookieValue('token');
  if(token == null || token == undefined || token == "undefined") {
    top.location = '../signin-signup.html';
  }

    return fetch(`http://localhost:8000/api/social/follow/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {      
        let isFollowing = false;
        data.followings.forEach(user => {
          if (user.id == userID){
            isFollowing = true;
          }
        });
        return isFollowing;
      })

    
}

async function checkFollowStatus(userID) {
  const isFollowing = await isFollow(userID);
  if (isFollowing){
    document.getElementById('userFollowBtn').style.backgroundColor = 'rgb(214 35 35 / 92%)';
    document.getElementById('userFollowBtn').value = "دنبال نکردن"
  }
  else{
    document.getElementById('userFollowBtn').style.backgroundColor = 'rgba(0, 128, 0, 0.486)';
    document.getElementById('userFollowBtn').value = "دنبال کردن"
  }
}

async function toggleFollowButton(){
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');
  const token = getCookieValue('token');
  let bol = await isFollow(userID)

  if(!bol){
    const followInfo = {
      following: userID
    }
    
    // Post login information
    fetch(`http://localhost:8000/api/social/follow/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
        body: JSON.stringify(followInfo)
    })
        .then(response => response.json())
        .then(data => {      
            console.log(data);
            location.reload();
    })
  }
  else{    
    fetch(`http://localhost:8000/api/social/unfollow/${userID}/`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
    })
        .then(response => response.json())
        .then(data => {      
            console.log(data)
    })

  }

  location.reload();

}

//////////////////////////////////////////////////////////////////////////////////////////////////////self profile

function selfProfileOnloadHandler(){
  checkCookie();
  showSelfProfile();
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

//////////////////////////////////////////////////////////////////////////////////////////////////////other profile

function otherProfileOnloadHandler(){
  checkCookie();
  showOtherProfile();
  otherReviewsOnloadHandler();
}


function showOtherProfile(){
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');

  checkFollowStatus(userID)

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

//////////////////////////////////////////////////////////////////////////////////////////////////////self reviews

function selfReviewsOnloadHandler(){
  checkCookie();
  showSelfReviewsHandler();
}


//show reviews
function showSelfReviewsHandler(){

  document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'

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

//////////////////////////////////////////////////////////////////////////////////////////////////////other reviews

function otherReviewsOnloadHandler(){
  showOtherReviewsHandler();
}


//show reviews
function showOtherReviewsHandler(){
  
  document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'

  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');
  // show profile

  fetch(`http://localhost:8000/api/social/posts/user/${userID}/`, {
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
            
            document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);
          });
          })
      .catch(error => {
          console.error('Error:', error);
      });

}



let token;
function checkCookie(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
}




