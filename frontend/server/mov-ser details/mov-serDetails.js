function movserDetailsOnloadHandler(){
    //set details
    showReviewsHandler();
}

function showReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show reviews
}