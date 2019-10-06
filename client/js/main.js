const config = {
    host: 'http://localhost:3000'
}

$(document).ready(function() {
    checkToken()
    displayTask()
});

function displayTask() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'GET',
        url: `${config.host}/todos`,
        headers: { token }
    })
    .done(todos_data => {
        console.log(todos_data)
        $('#todos_list').empty()
        for(let i = 0; i < todos_data.length; i++) {
            $('#todos_list').append(`  
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title"></h5>
                    <center>
                        <p id="task_name" class="card-text">${todos_data[i].name}</p><br>
                        <a href="#" onclick="displayUpdate('${todos_data[i]._id}', '${todos_data[i].name}')" class="btn btn-primary">Edit</a>
                        <a href="#" onclick="deleteTask('${todos_data[i]._id}')" class="btn btn-danger">Delete</a>
                    </center>
                    </div>
                </div> <br>
            `)
        }
    })
    .fail(err => {
        console.log(err)
    })
}

function checkToken() {
    const token = localStorage.getItem('token')
    if(token) {
        $('#edit_form').hide()
        $('#home-picture').hide()
        $('#login-button').hide()
        $('#signout').show()
        $('#gsignin').hide()
        $('.sign-in').hide()
        $('.signup').hide()
        $('.form-group-task').show()
        $('#todos_list').show()
        $('#todos_details').show()
        $('#home').hide()
        $('#register').hide()
    } else {
        $('#signout').hide()
        $('.signup').hide()
        $('.sign-in').hide()
        $('.form-group-task').hide()
        $('#todos_list').hide()
        $('#todos_details').hide()
        $('#edit_form').hide()
        $('#home').hide()
        $('#register').show()
    }
}

function homeButton() {
    $('#signout').hide()
    $('.signup').hide()
    $('.sign-in').hide()
    $('#home-picture').show()
    $('#login-button').show()
}

function displayLogin() {
    $('.sign-in').show()
    $('#gsignin').show()
    $('#login-button').hide()
}

function displayRegister() {
    $('#login-button').hide()
    $('.signup').show()
    $('.sign-in').hide()
}

function register(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: `${config.host}/register`,
        data: {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#pass').val()
        }
    })
    .done(registeredUser => {
        $('#signout').hide()
        $('.signup').hide()
        $('.sign-in').hide()
        $('#home-picture').show()
        $('#login-button').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function standardSignIn (e) {
    e.preventDefault()
    $.ajax ({
        method: 'POST',
        url: `${config.host}/login`,
        data: {
            name: $('#your_name').val(),
            password: $('#your_pass').val()
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.data.name)
        checkToken()
        displayTask()
        
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token;
    $.ajax ({
        method: 'POST',
        url: `${config.host}/gsignin`,
        data: {
            id_token: googleToken
        }
    })
    .done(token => {
        $('#signout').show()
        $('#gsignin').hide()
        $('.sign-in').hide()
        $('.signup').hide()
        $('.form-group-task').show()
        $('#todos_list').show()
        $('#todos_details').show()
        displayTask()
        localStorage.setItem('token', token)
    })
    .fail(err => {
        console.log(err)
    })
  }
  

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('#signout').hide()
        $('#login-button').show()
        $('.form-group-task').hide()
        $('#todos_list').hide()
        $('#todos_details').hide()
        $('#register').show()
        localStorage.removeItem('token')
        localStorage.removeItem('name')
      console.log('User signed out.');
    });
}

function addTask() {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')

    $.ajax({
        method: 'POST',
        url: `${config.host}/todos`,
        data: {
            name: $('#task').val(),
            author: name
        },
        headers: { token }
    })
    .done(createdTodo => {
        $('#signout').hide()
        $('.signup').hide()
        $('.sign-in').hide()
        displayTask()
    })
    .fail(err => {
        console.log(err)
    })
}

function displayUpdate(id, name) {
    $('#edit_form').show()
    $('#taskId').val(id)
    $('#new_name').val(name)
}

function updateTask() {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const id = $('#taskId').val()

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/todos/${id}`,
        data: {
            name: $('#new_name').val(),
            author: name
        },
        headers: { token }
    })
    .done(updated_data => {
        displayTask()
        $('#edit_form').hide()
        console.log('done update')
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTask(id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'DELETE',
        url: `${config.host}/todos/${id}`,
        headers: { token }
    })
    .done(deleted_data => {
        $('#edit_form').hide()
        displayTask()
    })
    .fail(err => {
        console.log(err)
    })
}


