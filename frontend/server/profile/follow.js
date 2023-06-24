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


function followingOnloadHandler(){
    const token = getCookieValue('token')
    fetch(`http://localhost:8000/api/social/follow/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.followings);
            
            })
        .catch(error => {
            console.error('Error:', error);
        });
}

function followerOnloadHandler(){
    const token = getCookieValue('token')
    fetch(`http://localhost:8000/api/social/follow/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.followers);
            
            })
        .catch(error => {
            console.error('Error:', error);
        });
}

