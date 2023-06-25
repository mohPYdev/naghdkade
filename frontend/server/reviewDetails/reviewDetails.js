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
function reviewDetailsOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
    showCommentsHandler();
}

function showCommentsHandler(){

    // show review detail

    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');
    // Get the token from the cookie
    fetch(`http://localhost:8000/api/social/posts/${postID}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
    })
    .then(response => response.json())
    .then(post => {
        console.log(post);
        let movieDetail = document.getElementsByClassName('tm-timeline-description')[0];
        let postTitle;
        if (post.movie != null){
          postTitle = post.movie.title + "(" + post.movie.release_date + ")";
          //insert genres
          let genres = "";
              for (let i=0 ; i<post.movie.genres.length ; i++){
                genres += post.movie.genres[i].name + " "
              }
              movieDetail.getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        }
        else{
          postTitle = post.tv_series.title + "(" + post.tv_series.start_date + ")";
          //insert genres
          let genres = "";
              for (let i=0 ; i<post.tv_series.genres.length ; i++){
                genres += post.tv_series.genres[i].name + " "
              }
              movieDetail.getElementsByTagName('p')[0].textContent = "ژانر : " + genres;
        }
        
        movieDetail.getElementsByTagName('h3')[0].textContent = postTitle;
        movieDetail.getElementsByTagName('p')[1].textContent = post.created_at + " : تاریخ نقد";
        movieDetail.getElementsByTagName('p')[2].textContent = post.content;
        movieDetail.getElementsByTagName('p')[3].textContent = post.mean_rating + " : امتیاز این نقد";
        movieDetail.getElementsByTagName('a')[0].getElementsByTagName('p')[0].textContent = post.user.username + " : پست شده توسط" ;
        movieDetail.getElementsByTagName('a')[0].href = `../profile/otherProfile.html?id=${post.user.id}`;
        })
    .catch(error => {
        console.error('Error:', error);
    });

    // let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);
    document.getElementsByClassName('tm-timeline-item')[1].style.display = 'none'
    // document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    fetch(`http://localhost:8000/api/social/comments/${postID}/`, {
        headers: {
        'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        console.log(comment);
        let mov = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);
        mov.style.display = 'block';

        mov.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = comment.user.image;
        mov.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].getElementsByTagName('h3')[0].textContent = comment.user.username;
        mov.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('a')[0].href = `../profile/otherProfile.html?id=${comment.user.id}`;
        mov.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark')[0].getElementsByTagName('p')[0].textContent = comment.content;

        document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(mov);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });    

}

function submitComment(){
    // content
    const commentInfo = {
        content: document.getElementById('comment')
    };

    token = getCookieValue('token');


    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');
    
    // Post login information
    fetch(`http://localhost:8000/api/social/comments/${postID}/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
        body: JSON.stringify(commentInfo)
    })
        .then(response => response.json())
        .then(data => {      
            console.log(data);
            location.reload();
    })
}

function submitRate(){
  const selectedOption = document.querySelector('input[name="rateReview"]:checked');
  if (selectedOption) {
    const selectedValue = parseInt(selectedOption.value, 10);
    console.log("Selected option value (integer):", selectedValue);

    const rateInfo = {
      value: selectedValue
    };

    token = getCookieValue('token');


    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');
    
    // Post login information
    fetch(`http://localhost:8000/api/social/rating/${postID}/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
        body: JSON.stringify(rateInfo)
    })
        .then(response => response.json())
        .then(data => {      
            console.log(data);
            location.reload();
    })

  } else {
    console.log("No option selected");
  }
}