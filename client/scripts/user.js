function onSignIn(googleUser) {
    $('#signInButton').hide()
    $('#loginButton').hide()
    $('#registerButton').hide()
    $('#signOutButton').show()
    $('#loginModal').modal('hide')
    const id_token = googleUser.getAuthResponse().id_token
    const data = { id_token }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/user/googleSignIn`,
        data,
        dataType: 'json'
    })
    .done(data => {
        const { msg } = data
        const { name, email } = data.user
        if (msg) {
            const profile = { username: name, email }
            // ask for password
            $('#container2').show()
            $('#enterPasswordModal').modal('show')
            $('#passwordForm').on('submit', e => {
                e.preventDefault()
                const password = $('#password').val()
                profile.password = password
                $('#enterPasswordModal').modal('hide')
                $('#container2').hide()
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/user/register',
                    data: profile,
                    dataType: 'json'
                })
                .then(user => {
                    localStorage.setItem('token', user.token)
                    $('.container').prepend(`<div class="alert alert-success" role="alert" id="success">
                    <strong>Success!</strong> User created successfully!</div>`)
                    $('#success').hide(5000)
                    $('#mainPage').show()
                })
            })
        } else {
            const token = data.user.token
            localStorage.setItem('token', token)
            $('#mainPage').show()
            $('.container').prepend(`<div class="alert alert-success" role="alert" id="success">
                <strong>Success!</strong> User Logged In Successfully!</div>`)
            $('#success').hide(5000)
        }

    })
    .fail(console.log)
}

function signOut() {
    $('#signOutButton').hide()
    $('#loginButton').show()
    $('#registerButton').show()
    $('#mainPage').hide()
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
    .then(() => {
        $('.container').prepend(`<div class="alert alert-success" role="alert" id="success">
            <strong>Success!</strong> User Logged Out successfully!</div>`)
        $('#success').hide(5000)
        localStorage.removeItem('token')
    })
}

function login() {
    $('#container3').show()
    $('#signInButton').show()
    $('#loginModal').modal('show')
    $('#loginForm').on('submit', e => {
        e.preventDefault()
        const data = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()

        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/login',
            data
        })
        .done(({ user }) => {
            $('#loginModal').modal('hide')
            $('#container3').hide()
            localStorage.setItem('token', user.token)
            $('#registerButton').hide()
            $('#loginButton').hide()
            $('#signOutButton').show()
            $('#mainPage').show()
        })
        .fail(error => {
            const message = JSON.parse(error.responseText).msg
            $('.modal-body').prepend(`<div class="alert alert-danger" role="alert" id="danger">
            ${message}</div>`)
        })
    })
}

function register() {
    $('#container4').show()
    $('#registerModal').modal('show')
    $('#registerForm').on('submit', e => {
        e.preventDefault()
        const data = {
            username: $('#registerUsername').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()

        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/register',
            data
        })
        .done(({ user }) => {
            $('#registerModal').modal('hide')
            $('#container4').hide()
            localStorage.setItem('token', user.token)
            $('#registerButton').hide()
            $('#loginButton').hide()
            $('#signOutButton').show()
            $('#mainPage').show()
        })
        .fail(error => {
            const message = JSON.parse(error.responseText).msg
            $('.modal-body').prepend(`<div class="alert alert-danger" role="alert" id="danger">
            ${message}</div>`)
        })
    })
}