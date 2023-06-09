function personReviewsOnloadHandler(){
    showPersonReviewsHandler();
    showFollowArea();
}

//show reviews
function showPersonReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movie);
}

function showFollowArea(){
    /*if(){
    document.getElementsByClassName('following-follower')[0].style.display = "none";

    }*/
}