function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'post',
        url:  `http://localhost:4000/user/google-login`,
        headers: {
            gtoken : id_token
        }
    })
    .done( ({token, user}) => {
        localStorage.setItem('token', token)
        console.log(token)
        $(`#password-login`).val('')
        $(`#email-login`).val('')
        console.log('hide element etc')
        hideElement(`#signup-form-container`)
        hideElement(`#login-form-container`)
        showElement('#signout-btn')
        getUser()
        console.log('google sblm get todo')
        getTodo()
        showElement(`#todo`)
        showElement(`#form-todo`)
    })
    .fail(err => {
        loginnotif(err.responseJSON.err)
    })
    .always(_ => {
        $('#signup-btn').removeClass('loading')
    })   
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        console.log('User signed out.');
        localStorage.removeItem('token')
        hideElement('#signout-btn')
        $('#user-profile').empty()
        showElement('#login-form-container')
        hideElement(`#todo`)
        hideElement(`#form-todo`)
    });
}
