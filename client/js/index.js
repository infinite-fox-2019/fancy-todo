
//==============================================================================================================
//GOOGLE OAuth 2
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'post',
        url : 'http://localhost:3000/users/signinG',
        data : {
            id_token : id_token
        }
    })
        .done(function(token){
            localStorage.setItem('token',token);
        })
        .fail(console.log);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        console.log('User signed out.');
    });
}
//==============================================================================================================