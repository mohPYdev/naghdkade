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
    })
}

function signupClicked(){
        // Login information
        const signupInfo = {
            email : document.getElementsByClassName('sign-up-htm')[0].getElementsByClassName('group')[3].getElementsByTagName('input')[0].value,
            username: document.getElementsByClassName('sign-up-htm')[0].getElementsByClassName('group')[0].getElementsByTagName('input')[0].value,
            password: document.getElementsByClassName('sign-up-htm')[0].getElementsByClassName('group')[1].getElementsByTagName('input')[0].value
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