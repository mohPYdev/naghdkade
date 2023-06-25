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
            let followingArea = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);
            followingArea.style.display = 'block';

            let followings = data.followings;
            for(let i=0 ; i<followings.length ; i++){
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = followings[i].image;
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark tm-timeline-description')[0].getElementsByTagName('a')[0].getElementsByTagName('h3')[0].textContent = followings[i].username;
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark tm-timeline-description')[0].getElementsByTagName('a')[0].href = `../profile/otherProfile.html?id=${followings[i].id}`;
                
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
            let followerArea = document.getElementsByClassName('tm-timeline-item')[0].cloneNode(true);
            followerArea.style.display = 'block';

            let followers = data.followers;
            for(let i=0 ; i<followings.length ; i++){
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('rounded-circle')[0].src = followers[i].image;
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark tm-timeline-description')[0].getElementsByTagName('a')[0].getElementsByTagName('h3')[0].textContent = followers[i].username;
                followingArea.getElementsByClassName('tm-timeline-item-inner')[0].getElementsByClassName('tm-timeline-description-wrap')[0].getElementsByClassName('tm-bg-dark tm-timeline-description')[0].getElementsByTagName('a')[0].href = `../profile/otherProfile.html?id=${followers[i].id}`;
                
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

