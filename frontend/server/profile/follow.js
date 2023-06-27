function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
}

let token;
function followingOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }

    
        document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'
        
        fetch(`http://localhost:8000/api/social/follow/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {

            let followings = data.followings;

            for(let i=0 ; i<followings.length ; i++){
                let followingArea = document.createElement('div');
                followingArea.classList.add('tm-timeline-item');
                followingArea.innerHTML = `
                            <div class="tm-timeline-item-inner">
                                <img src="${followings[i].image}" alt="Image" class="rounded-circle tm-img-timeline">
                                <div class="tm-timeline-connector">
                                    <p class="mb-0">&nbsp;</p>
                                </div>
                                <div class="tm-timeline-description-wrap" style="text-align: left;">
                                    <div class="tm-bg-dark tm-timeline-description">
                                        <a href="../profile/otherProfile.html?id=${followings[i].id}"><h3 class="tm-text-green tm-font-400" style=" font-size: 2rem;">${followings[i].username}</h3></a>
                                    </div>
                                </div>
                            </div>

                            <div class="tm-timeline-connector-vertical"></div>`;

                document.getElementsByClassName('col-lg-12')[1].appendChild(followingArea);
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function followerOnloadHandler(){
    token = getCookieValue('token');
    if(token == null || token == undefined || token == "undefined"){
      top.location = '../signin-signup.html';
    }
    
        document.getElementsByClassName('tm-timeline-item')[0].style.display = 'none'
        
        fetch(`http://localhost:8000/api/social/follow/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {

            let followers = data.followers;

            for(let i=0 ; i<followers.length ; i++){
                let followingArea = document.createElement('div');
                followingArea.classList.add('tm-timeline-item');
                followingArea.innerHTML = `
                            <div class="tm-timeline-item-inner">
                                <img src="${followers[i].image}" alt="Image" class="rounded-circle tm-img-timeline">
                                <div class="tm-timeline-connector">
                                    <p class="mb-0">&nbsp;</p>
                                </div>
                                <div class="tm-timeline-description-wrap" style="text-align: left;">
                                    <div class="tm-bg-dark tm-timeline-description">
                                        <a href="../profile/otherProfile.html?id=${followers[i].id}"><h3 class="tm-text-green tm-font-400" style=" font-size: 2rem;">${followers[i].username}</h3></a>
                                    </div>
                                </div>
                            </div>

                            <div class="tm-timeline-connector-vertical"></div>`;

                document.getElementsByClassName('col-lg-12')[1].appendChild(followingArea);
                
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

