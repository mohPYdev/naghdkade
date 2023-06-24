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
        
        // Post login information
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
}

function emailSenderHandler(){
    document.getElementById("emailSent").style.display = "block";
}

function newPassword(){

}