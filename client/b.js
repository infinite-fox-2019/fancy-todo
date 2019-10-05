$('#datetimepicker1').datetimepicker();

$(document).ready(() => {
    $('#main-page').hide()
    $('#sign-up').hide()
    
    $('#sign-up').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/users/signUp',
            type: 'post',
            data: {
                email: $('#email-sign-up').val(),
                password: $('#password-sign-up').val()
            }
        })
        .done(({message}) => {
            swal('Registered', message, "success");
            $('#sign-up').hide()
            $('#email-sign-up').val('')
            $('#password-sign-up').val('')
            $('#sign-in').show()
        })
        .catch(err => {
            swal(err.responseJSON.title, err.responseJSON.message, "error");
        })
    })

    $('#sign-in').submit((e) => {
        console.log('masuk')
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/users/signIn',
            type: 'post',
            data: {
                email: $('#email-sign-in').val(),
                password: $('#password-sign-in').val()
            }
        })
        .done(({token}) => {
            localStorage.token = token
            $('#auth-page').hide()
            $('#main-page').show()
        })
        .catch(err => {
            swal(err.responseJSON.title, err.responseJSON.message, "error");
        })
    })

    onSignIn = (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        $.ajax({
            method:'post',
            url: 'http://localhost:3000/users/googleSignIn',
            data : {
            token
            }
        })
        .done(function({token}){
            localStorage.token = token
            $("#auth-page").hide()
            $("#main-page").show()
        })
        .fail(err => {
            console.log(err)
        })
    }

    signOut = () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            localStorage.removeItem('token')
            $('#main-page').hide()
            $('#auth-page').show()
        });
    }

    toSignUp = () => {
        $('#sign-in').hide()
        $('#email-sign-in').val('')
        $('#password-sign-in').val('')
        $('#sign-up').show()
    }

    toSignIn = () => {
        $('#sign-up').hide()
        $('#email-sign-up').val('')
        $('#password-sign-up').val('')
        $('#sign-in').show()
    }
})