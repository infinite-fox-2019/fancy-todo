const host = 'http://localhost:3000'


$(document).ready(function() {
    console.log('ready');
    // landingPage()

    if(localStorage.getItem('token')) {mainPage()}

    // loggedOut()
    $('.btn').click(function(event) {
        event.preventDefault()
    })
    $('#loginButton').click(function(event) {
        event.preventDefault()

        normalLogin()
    })

    $('#registerButton').click(function(event) {
        event.preventDefault()

        registerPage()
    })

    $('#logOut').click(function(event) {
        event.preventDefault()

        signOut()
    })

})

function normalLogin() {
    let email = $('#inputEmail').val()
    let password = $('#inputPassword').val()

    $.ajax({
            url: `${host}/users/login`,
            method: 'POST',
            data: {
                email,
                password
            }

        })
        .done(token => {
            localStorage.setItem('token', token)
            loggedIn()
        })
        .fail(console.log)
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem('name', profile.getName())
    localStorage.setItem('email', profile.getEmail())

    let id_token = googleUser.getAuthResponse().id_token

    $.ajax({
            url: `${host}/users/gLogin`,
            method: 'POST',
            data: {
                id_token
            }
        })
        .done(data => {
            localStorage.setItem('token', data)
            loggedIn()
        })
        .fail(err => {
            console.log(err);
        })

}

function register() {
    let email = $('#inputEmail').val()
    let password = $('#inputPassword').val()
    let name = $('#inputName').val()

    $.ajax({
            url: `${host}/users/register`,
            method: 'POST',
            data: {
                email,
                password,
                name
            }
        })
        .done(token => {
            localStorage.setItem('token', token)
            console.log('registered');

            loggedIn()
        })
        .fail(console.log)
}

function registerPage() {

    let page = `<div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center">Register</h5>
                <form class="form-signin">
                    <div class="form-label-group">
                        <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
                    <div class="form-label-group">
                        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password">
                        <label for="inputPassword">Password</label>
                    </div>

                    <div class="form-label-group">
                        <input type="text" name="name" id="inputName" class="form-control" placeholder="Your Name">
                        <label for="inputName">Name</label>
                    </div>
                    <hr class="my-4">
                    <button id="registerButton" class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                    <hr class="my-4">
                    <a id=loginButton style="color:blue; cursor: pointer;">Have an account? Login instead</a>
                </form>
            </div>
        </div>
    </div>
</div>`

    $('.page').html('')
    $('.page').append(page)

    $('#registerButton').click(function(event) {
        event.preventDefault()
        register()
    })
    $('.g-signin2').click(function(event) {
        event.preventDefault()
        onSignIn()
    })
    $('#loginButton').click(function(event) {
        event.preventDefault()
        landingPage()
    })
}

function landingPage() {
    let page = ` 
    <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body" style="background-color: #d3c9bd; border-radius: 15px;">
                <h5 class="card-title text-center">Sign In</h5>
                <form class="form-signin">
                    <div class="form-label-group">
                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
                    <div class="form-label-group">
                        <input type="password" id="inputPassword" class="form-control" placeholder="Password">
                        <label for="inputPassword">Password</label>
                    </div>
                    <button  class="btn btn-lg btn-primary btn-block text-uppercase" id="loginButton" type="submit">Sign in</button>
                    <hr class="my-4">
                    <a id=registerButton style="color:blue; cursor: pointer;">Don't have account? Register here</a>
                </form>
            </div>
        </div>
    </div>`
    $('.page').html('')
    $('.page').append(page)
    $('.g-signin2').click(function(event) {
        event.preventDefault()
        onSignIn()
    })
    $('#loginButton').click(function(event) {
        event.preventDefault()
        normalLogin()
    })
    $('#registerButton').click(function(event) {
        event.preventDefault()
        registerPage()
    })
}

function getTodos() {
    $.ajax({
        url: `${host}/todos`,
        method: 'GET',
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(todos => {
            // console.log(todos);
            todos.forEach(todo => {
                $('.todos').prepend(`
                <div class="card"  style="width: 400px; margin: 5px; " >
                    <div class="card-body">
                        <h5 class="card-title" id="${todo._id}todo" >${todo.name}</h5>
                    </div>               
                    <ul class="list-group list-group-flush" id="${todo._id}">
                        <li class="list-group-item">
                            <div class="searchBox d-flex-inline">
                                <form class="form-inline"> 
                                    <input  style="border:none; border-bottom: 1px solid black;" class="form-control mr-md-2" type="text" id="${todo._id}new" placeholder="new item" >
                                    <button type="button" onclick="addContent('${todo._id}')" class="btn btn-primary mx-2">Add</button>
                                </form>
                            </div>
                         </li>
                    </ul>
                    <div class="card-body">
                        <button type="button" onclick="deleteToDo('${todo._id}')" class="deleteToDo btn btn-danger">delete this to do</button>
                    </div>
              </div>
                `)
                todo.list.forEach(content => {
                    let buttonColor = 'secondary';
                    let statusText = 'unfinish';
                    let done = false
                    if (!content.status) {
                        buttonColor = 'info';
                        statusText = 'finish', done = true
                    }
                    $(`#${todo._id}`).prepend(`
                        <li class="list-group-item">
                            <div class="searchBox d-flex-inline">
                                <form class="form-inline"> 
                                <input  style="border:none; " class="form-control mr-md-2" type="text" id="${content._id}content" value="${content.name}" >
                                <button type="button" style="margin: 5px;" onclick="updateContent('${content._id}', '${done}')" class="updateContent btn btn-${buttonColor}">${statusText}</button>
                                <button type="button" style="margin: 5px;" onclick="deleteContent('${content._id}')" name="${content._id}" class="btn btn-danger deleteContent">delete</button>

                                </form>
                            </div>
                        </li>
                    `)
                })
            })
        })
        .fail(console.log)

}

function deleteToDo(todoId) {
    $.ajax({
            url: `${host}/todos`,
            method: 'DELETE',
            data: { id: todoId },
            headers: {
                token : localStorage.getItem('token')
            }
        })
        .done(response => {
            console.log(response);
            mainPage()
        })
        .fail(console.log)
}
function deleteContent(contentId) {
    $.ajax({
            url: `${host}/todos/content`,
            method: 'DELETE',
            data: {
                id: contentId
            },
            headers: {
                token : localStorage.getItem('token')
            }
        })
        .done(response => {
            console.log(response);
            mainPage()
        })
        .fail(console.log)
}

function addContent(todoId) {
    const name = $(`#${todoId}new`).val()
    console.log('name=========', name);
    $.ajax({
        url: `${host}/todos/content`,
        method: 'POST',
        data: {
            name,
            id: todoId
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })

    .done(response => {
        console.log(response);
        mainPage()
    })

    .fail(console.log)

}

function updateContent(contentId, status) {
    let name = $(`#${contentId}content`).val()
    console.log(name, status);
    $.ajax({
        url: `${host}/todos/content`,
        method: 'PUT',
        data: {
            name,
            status,
            id: contentId
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(response => {
        console.log(response);
        mainPage()
    })
    .fail(console.log)
}
function userDashboard() {
    let page = `
    <div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li>
            <button class="sidebar-button" style="cursor:pointer; padding: 3px 10px; border-radius:5px; border:1px solid gray; background-color:aqua;"id="addTodo">New To Do</button>
        </li>
        <li>
            <form class="form-inline" id="formNewToDo"> 
            <label>To do name</label>
                <input class="form-control mr-md-2" type="text" id="todoNew" placeholder="todo name" >
                <button type="button" onclick="addToDo()" class="btn btn-light">Add</button>
            </form>
        </li>
    </ul>
</div>
    `
    $('.userDashboard').append(page)

    $('#changePassword').click(function(event) {
        event.preventDefault()
        $('#formPass').toggle()
    })
    $('#addTodo').click(function(event) {
        event.preventDefault()
        $('#formNewToDo').toggle()
    })
}

function addToDo() {
    let name = $('#todoNew').val()

    $.ajax({
        url: `${host}/todos`,
        method: 'POST',
        data: {
            name
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })

    .done(response => {
            console.log(response);
            mainPage()
        })
        .fail(console.log)
}
function updatePassword() {
    let newPassword = $('#passwordNew').val()
    let email = localStorage.getItem('email')

    $.ajax({
        url: `${host}/users/password`,
        method: 'PATCH',
        data: {
            email,
            newPassword
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(console.log)
    .fail(console.log)
}

function mainPage() {
    let page = `
    <div class="row main-content justify-content-around">
        <div class="col-3 userDashboard" >
        </div>
        <div class="col-8 todos grid">
        </div>
    </div>
    `
    $('.page').html('')
    $('.page').append(page)
    getTodos()
    userDashboard()
    $('#logOut').click(function(event) {
        event.preventDefault()
        signOut()
    })
    $('.deleteContent').click(function(event) {
        event.preventDefault()
        deleteContent(this.name())
    })

    $('#formPass').hide()
    $('#formNewToDo').hide()

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        loggedOut()
    });
}
function loggedIn() {
    mainPage()
    $('.g-signin2').hide()
    $('.signOutButton').show()
    $('#logOut').click(function(event) {
        event.preventDefault()
        signOut()
    })
}
function loggedOut() {
    $('.g-signin2').show()
    $('.signOutButton').hide()
    $('.page').html('')
    landingPage()
}