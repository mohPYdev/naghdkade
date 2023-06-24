import { getCookieValue, deleteCookie } from "../token";


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

