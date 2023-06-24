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
function signinupOnloadHandler(){
    token = getCookieValue('token');
    if(token != null && token != undefined && token != "undefined"){
      top.location = '/homepage/homepage.html';
    }
}

function signinClicked(){

    // Login information
    const loginInfo = {
        username: document.getElementsByClassName('sign-in-htm')[0].getElementsByClassName('group')[0].getElementsByTagName('input')[0].value,
        password: document.getElementsByClassName('sign-in-htm')[0].getElementsByClassName('group')[1].getElementsByTagName('input')[0].value
    };
    
    // Post login information
    fetch('http://localhost:8000/auth/token/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
        .then(response => response.json())
        .then(data => {
        // Store the token in a browser cookie
        document.cookie = `token=${data.auth_token}`;
        
        console.log(data.auth_token)

        if (data.auth_token != undefined){
            top.location = 'homepage/homepage.html';
        }
        else{
            alert("نام کاربری یا رمزعبور اشتباه است");
        }
    })
}

function signupClicked(){
        const parentDiv = document.getElementsByClassName('sign-up-htm')[0];
        if(parentDiv.getElementsByClassName('group')[1].getElementsByTagName('input')[0].value != parentDiv.getElementsByClassName('group')[2].getElementsByTagName('input')[0].value){
            alert("تکرار رمزعبور اشتباه است");
            return;
        }
        if(parentDiv.getElementsByClassName('group')[0].getElementsByTagName('input')[0].value == "" || parentDiv.getElementsByClassName('group')[1].getElementsByTagName('input')[0].value == "" || parentDiv.getElementsByClassName('group')[3].getElementsByTagName('input')[0].value == ""){
            alert("برخی فیلدها خالی می باشند");
            return;
        }

        // Login information
        const signupInfo = {
            email : parentDiv.getElementsByClassName('group')[3].getElementsByTagName('input')[0].value,
            username: parentDiv.getElementsByClassName('group')[0].getElementsByTagName('input')[0].value,
            password: parentDiv.getElementsByClassName('group')[1].getElementsByTagName('input')[0].value
        };
        
        // Post signup information
        fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        })
            .then(response => response.json())
            .then(data => {
            
            console.log(data.details)
        })

        convertTheToken(parentDiv.getElementsByClassName('group')[0].getElementsByTagName('input')[0].value, parentDiv.getElementsByClassName('group')[1].getElementsByTagName('input')[0].value)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function convertTheToken(user, pass) {
    await sleep(2000);

    const loginInfo = {
        username: user,
        password: pass
    };
    // Post login information
    fetch('http://localhost:8000/auth/token/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
        .then(response => response.json())
        .then(data => {
        // Store the token in a browser cookie
        document.cookie = `token=${data.auth_token}`;
        
        console.log(data.auth_token)

        if (data.auth_token != undefined && data.auth_token != "undefined" && data.auth_token != null){
            top.location = 'homepage/homepage.html';
        }
        else{
            alert("رمزعبور باید شامل حداقل 10 کاراکتر و ترکیبی از عدد و حروف باشد. همچنین از وارد کردن نام کاربری و ایمیل تکراری خودداری نمائید");
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function emailSenderHandler(){
    document.getElementById("emailSent").style.display = "block";
}

function newPassword(){

}