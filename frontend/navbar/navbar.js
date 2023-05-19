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
    top.location = '../sign in - sign up/signin-signup.html';
}