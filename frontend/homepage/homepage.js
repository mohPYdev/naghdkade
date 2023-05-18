document.addEventListener('DOMContentLoaded', function() {
    let navBarSelector = document.getElementsByClassName('homepageNavbar')[0].getElementsByTagName('ul')[0].
                            getElementsByTagName('li')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0];
    navBarSelector.style.color = '#ffffff';

});

function onloadHandler(){
    showReviewHandler();
}

function showReviewHandler(){
    let review = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(review);
}