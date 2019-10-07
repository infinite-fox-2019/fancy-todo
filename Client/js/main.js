$(document).ready(function() {
    if (!localStorage.getItem('token')) {
        todoLogin()
    } else {
        $('#signUp-form').hide()
        $('#todo-page').hide()
        $('#login-form').show()
    }
})

function register() {

    $('#login-form').fadeOut()
    $('#signUp-form').fadeIn()
}

function loginButton() {
    $('#login-form').fadeIn()
    $('#signUp-form').fadeOut()
}

function todoLogin() {
    $('#signUp-form').hide()
    $('#todo-page').show()
    $('#login-form').hide()
}


function login() {
    event.preventDefault()
    const username = $('#usernameLogin').val()
    const password = $('#passwordLogin').val()

    $.ajax({
            url: 'http://localhost:3002/users/login',
            method: 'POST',
            data: { username, password }
        })
        .done(response => {

            localStorage.setItem('token', response)
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
            todoLogin()
            getTodo()
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const config = {
        host: 'http://localhost:3002'
    }
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: 'POST',
            url: `${config.host}/users/gsignin`,
            data: {
                id_token: googleToken
            }
        })
        .done(token => {
            // $('#mainPage').show()
            localStorage.setItem('token', token)
            todoLogin()
            getTodo()
        })
        .fail(err => {
            console.log(err)
        })

} //

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        localStorage.removeItem('token');
        alert('Thank You, I hope you have a nice')
        $('#login-form').fadeIn();
        $('#todo-page').fadeOut();
        $('#usernameLogin').val('')
        $('#passwordLogin').val('')

    });
}

function userRegister() {
    event.preventDefault()
    const username = $('#username').val()
    const email = $('#email').val()
    const password = $('#password').val()

    $.ajax({
            url: 'http://localhost:3002/users/',
            method: 'POST',
            data: { username, email, password }
        })
        .done(response => {
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
            alert('You Successfully Register')
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
};

function getTodo() {
    $('#todolist').empty();
    $.ajax({
            url: 'http://localhost:3002/todos',
            method: 'GET',
            headers: { token: localStorage.getItem('token') }
        })
        .done(function(todos) {

            todos.forEach(function(todo) {
                let status;
                if (todo.status == true) {
                    status = 'Compeleted'
                } else {
                    status = 'Uncompleted'
                }
                $('#todolist').append(`

                <div class="card">
                <div class="card-header">
                    <h5>${todo.title}</h5>
                </div>
                <div class="card-body">
                    
                    <h6 class="card-title">Status: ${status}</h6>
                    <hr>
                    <h6 class="card-title">Description:</h6>
                    <h6 class="card-title">${todo.description}</h6>
                    <hr>
                    <a href="#" class="btn btn-primary">Update Todo</a>
                    <a href="#" class="btn btn-warning">Update Status</a>
                    <a href="#" class="btn btn-danger">Delete</a>
                </div>
            </div>
            <hr>
            `)
            })
        })
};


function addTodo() {
    event.preventDefault()
    const title = $(`#title-todo`).val()
    const description = $(`#description-todo`).val()

    $.ajax({
            url: 'http://localhost:3002/todos',
            method: 'POST',
            data: { title, description },
            headers: { token: localStorage.token }
        })
        .done(function(response) {
            getTodo()
            todoLogin()
        })
        .fail(function() {
            alert('Something Wrong')
        })
};


function deleteTodo() {

};