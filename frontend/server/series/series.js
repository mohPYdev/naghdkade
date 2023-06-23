function seriesOnloadHandler(){
    showSerieHandler();
}

//show reviews
function showSerieHandler(){
    let serie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(serie);
    
    //show series
}