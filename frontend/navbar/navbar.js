function setNavLinksHeight(){
    let NL = document.getElementsByClassName("navLink");
    for(let i=0; i<NL.length ; i++){
        NL[i].style.height = NL[i].clientHeight / 2 + "px";
    }
}

function redirectNewestReviews(){
    top.location = '../newestReviews/newestReviews.html';
}