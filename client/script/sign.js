function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    Swal.fire({
        title: `Loggin In ......`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();
    $.ajax({
        url: `${baseUrl}/users/loginGoogle`,
        method: 'post',
        data: {
            token: id_token
        }
    })
        .done(function (data) {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            Swal.close();
            Swal.fire("Success!", `Logged In Success`, "success");
            $('.main').slideDown("slow")
            $('.landingPage').hide()
        })
        .fail(err => {
            Swal.fire("Error!", `Logged In Fail`, "error");
        })
}

function signOut() {
    if (gapi.auth2) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
    }
    localStorage.clear()
    console.log('User signed out.');
    $('.main').hide()
    $('.landingPage').slideDown("slow")
}

function register() {
    let name = $('#nameregis').val()
    let email = $('#emailregis').val()
    let password = $('#passwordregis').val()

    Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseUrl}/users/register`,
        method: `post`,
        data: {
            name, email, password
        }
    })
        .done(({ token, id }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            $('.landingPage').hide()
            $('.main').show()
            Swal.close()
            Swal.fire('Success!', "Your Account is Created!", 'success')
        })
        .fail(err => {
            let msg = "Fail to Register";
            if (err.responseJSON) {
                msg = err.responseJSON.message
            }
            Swal.fire("Error!", msg, "error");
        })
        .always(() => {
            $('#nameregis').val('')
            $('#emailregis').val('')
            $('#passwordregis').val('')
        })


}

function login() {
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()

    Swal.fire({
        title: `Logged In ...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseUrl}/users/login`,
        method: `post`,
        data: {
            email, password
        }
    })
        .done(({ token, id }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            $('.landingPage').hide()
            $('.main').slideDown('slow')
            Swal.close()
            Swal.fire('Success!', "Your Account is Logged in!", 'success')
        })
        .fail(err => {
            let msg = "Fail to Login"
            if (err.responseJSON) {
                msg = err.responseJSON.message
            }
            Swal.fire("Error!", msg, "error");
        })
        .always(() => {
            $('#emailLogin').val('')
            $('#passwordLogin').val('')
        })
}
