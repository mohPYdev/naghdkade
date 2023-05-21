function moviesOnloadHandler(){
    showMovieHandler();
}

//show reviews
function showMovieHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movie);
}