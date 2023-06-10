function reviewDetailsOnloadHandler(){
    //fetch review details
    showCommentsHandler();
}

function showCommentsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[1].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[1].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show comments
}

function submitComment(){
    //add new comment
}