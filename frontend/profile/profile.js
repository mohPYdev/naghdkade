function personReviewsOnloadHandler(){
    showPersonReviewsHandler();
}
function profileOnloadHandler(){
    showFollowArea();
    showUserFollow();
}

//show reviews
function showPersonReviewsHandler(){
    let movie = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);

    document.getElementsByClassName('tm-section-mb')[0].getElementsByClassName('col-lg-12')[0].appendChild(movie);

    //show reviews
}

function showFollowArea(){
    /*if(){
    document.getElementsByClassName('following-follower')[0].style.display = "none";

    }*/
}

function showUserFollow(){
    /*if(){
    document.getElementsByClassName('userFollow')[0].style.display = "none";

    }*/
}

function toggleFollowButton(){
    // if(){
    //     document.getElementById('userFollowBtn').value = "دنبال نکردن";
    // }
    // else{
    //     document.getElementById('userFollowBtn').value = "دنبال کردن";
    // }
}