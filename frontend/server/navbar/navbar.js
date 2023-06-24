function navbarOnloadHandler(){
    setNavLinksHeight();
}

function setNavLinksHeight(){
    let NL = document.getElementsByClassName("navLink");
    for(let i=0; i<NL.length ; i++){
        NL[i].style.height = NL[i].clientHeight / 2 + "px";
    }
}

function toHomepage(){
    top.location = '../homepage/homepage.html';
}

function toProfile(){
    top.location = '../profile/profile.html';
}

function toNewestReviews(){
    top.location = '../newestReviews/newestReviews.html';
}

function toMovies(){
    top.location = '../movies/movies.html';
}

function toSeries(){
    top.location = '../series/series.html';
}

// Function to delete a cookie by its name
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
  

// Function to get the value of a cookie by its name
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


function toSignin(){


    const token = getCookieValue('token');
    // Post signout information
    fetch('http://localhost:8000/auth/token/logout', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
    })
        .then(res => {
            deleteCookie('token')
            console.log(res)
        })


    top.location = '../signin-signup.html';
}
