$(document).ready(function() {
    isAuth()
    if (localStorage.getItem('token')) {
        home()
        showToday()
    }

    $('.changeName').on('click', function(e){
        e.preventDefault()
        changeName()
    })
})

function isAuth(){
    if(localStorage.getItem('token')){
        $('.userLog').html(`<i class="fas fa-user"> ${localStorage.username}</i>`)
        $('.home').show()
        $('.login').hide()
        $('.register').hide()
        $('.signOut').show()
        $('.listTodo').show()
        $('.userLog').show()
        $('.dropdown').show()
    } else {
        $('.home').hide()
        $('.login').show()
        $('.signOut').hide()
        $('.register').hide()
        $('.listTodo').hide()
        $('.userLog').hide()
        $('.dropdown').hide()
    }
}

function signUpForm() {
    $('.login').hide()
    $('.register').show()
}

function signInForm() {
    $('.login').show()
    $('.register').hide()
}

// Login Regular
$('#formLogin').on('submit', function(e){
    e.preventDefault()
    swal.fire({
        title: 'Login Success',
        onOpen: () => {
            swal.showLoading()
        }
    })

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            email: $('#email').val(),
            password: $('#password').val(),
        }
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        isAuth()
        home()
        showToday()
        swal.close()
    })
    .catch(err => {
        swal.fire({
            title: `${err.response.data}`,
            showCloseButton: true
        })
    })
})

// Form Register
$('#formRegister').on('submit', function(e) {
    e.preventDefault()
    swal.fire({
        title: 'Creating Account',
        onOpen: () => {
            swal.showLoading()
        }
    })
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
            username: $('#usernameRegis').val(),
            email: $('#emailRegis').val(),
            password: $('#passwordRegis').val(),
        }
    })
    .then((res) => {
        $('#usernamelRegis').val('')
        $('#emailRegis').val('')
        $('#passwordRegis').val('')
        localStorage.setItem('token', res.data.token)
        isAuth()
        swal.close()
        home()
    })
    .catch(err => {
    swal.fire({
        title: `${err.response.data.join('\n')}`,
        showCloseButton: true
    })
    })
})


// Change Name
function changeName(){
    let newUsername;
    axios({
        method: 'get',
        url: `http://localhost:3000/user/${localStorage.username}`,
        headers: {
            token: localStorage.token
        }
    })
        .then(({data}) => {
            return { value: formValues } =  Swal.fire({
                title: 'Change Full Name',
                html:
                    `<fieldset disabled>
                        <input class="swal2-input form-control"  value="${data.username}"></input>
                    </fieldset>` +
                    `<input id="newName" class="swal2-input" placeholder="New Full Name">`,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        newUsername: document.getElementById('newName').value,
                    }
                }
            })
        })
        .then(({value}) => {
            newUsername = value.newUsername
            return axios({
                method: 'patch',
                url: `http://localhost:3000/user/update/name`,
                data:{
                    username: localStorage.username,
                    newUsername: value.newUsername
                },
                headers: {
                    token: localStorage.token
                }
            })
        })
        .then(() => {
            localStorage.setItem('username', newUsername)
            swal.fire({
                type: 'success',
                title: 'success change your name..'
            })
            isAuth()
        })
        .catch(err => {
            swal.fire({
                title: `${err.response.data}`,
                showCloseButton: true
            })
        })
}

// Homepage
function home() {
    swal.fire({
        title: 'Fetching your Todo',
        onOpen: () => {
            swal.showLoading()
        }
    })

    axios({
        method: 'get',
        url: 'http://localhost:3000/todo',
        headers: {
            token: localStorage.token
        }
    })
        .then(({data}) => {
            $('.tbody').empty()
            if (!data.length) {
                $('.tbody').append(`
                    <div class="alert alert-dark text-center">
                        NO DATA
                    </div>
                `)
            } else {
                data.map(res => {
                $('.tbody').append(listTodo(res))
                })
                swal.close()
            }
        })
        
        .catch(err => {
            swal.fire({
            title: `${err.response.data}`,
            showCloseButton: true
            })
        })
}

// LIST TODAY
function showToday(){
    axios({
        method: 'get',
        url: 'http://localhost:3000/todo/today',
        headers: {
            token: localStorage.token
        }
    })
        .then(({data}) => {
            $('.listToday').empty()
            if (!data.length) {
                $('.listToday').append(`
                    <div class="alert alert-dark text-center">
                        NO DATA
                    </div>
                `)
            } else {
                data.map(res => {
                $('.listToday').append(listToday(res))
                })
                swal.close()
            }
        })
        .catch(err => {
            swal.fire({
            title: `${err.response.data}`,
            showCloseButton: true
            })
        })
}

function listToday(res){
    let {title, description} = getTitle(res.status, res.title, res.description)
    if(res.status){
        return  `
    <tr>
        <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
        
        <td>${description}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
            <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>
    ` 
    } else {
        return  `
        <tr>
            <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
            
            <td>${description}</td>
            <td class="right">
            <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
            <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button> | 
            <button class="btn btn-sm btn-outline-primary" onclick="done('${res._id}')"><i class="fas fa-check fa-xs"></i></button>
            </td>
        </tr>
        ` 
    }
}

function done(id){
    axios({
        method: 'patch',
        url: `http://localhost:3000/todo/update/${id}`,
        data: {
            status: true
        },
        headers: {
            token: localStorage.token
        }
    })
        .then(()=>{
            $('.tbody').empty()
            $('.listToday').empty()
            showToday()
            home()
        })
        .catch(err => {
            swal.fire({
            title: `${err.message}`,
            showCloseButton: true
        })
    })
}

// Search Todo by Title
function searchTodo(){
    swal.fire({
        title: 'Searching Todo',
        onOpen: () => {
            swal.showLoading()
        }
    })
    axios({
        method: 'get',
        url: `http://localhost:3000/todo/search/${$('#search').val()}`,
        headers: {
            token: localStorage.token
        }
    })
        .then(({data}) => {
            $('#search').val('')
            $('.tbody').empty()
            if (!data.length) {
                $('.tbody').append(`
                    <div class="alert alert-dark text-center">
                        NO DATA
                    </div>
                `)
                swal.close()
            } else {
                data.map(res => {
                    $('.tbody').append(listTodo(res))
                })
                    swal.close()
            }
        })
        
        .catch(err => {
            swal.fire({
            title: `${err.message}`,
            showCloseButton: true
        })
    })
}

function listTodo(res){
    let date = convertDate(res.dueDate)
    let {title, description, status} = getTitle(res.status, res.title, res.description)
    return  `
    <tr>
        <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
        <th scope="row">${title}</th>
        <td>${description}</td>
        <td>${status}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-sm" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
            <button class="btn btn-sm" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>
    `
}

function convertDate (date) {
    return moment(date).format('D MMM Y')
}

function getTitle(status, title, description){
    if(status) return {title: `<strike>${title}</strike>`, description: `<strike>${description}</strike>`, status: '<div class="btn btn-success"></div>'}
    else return {title, description, status: `<div class="btn btn-warning"></div>`}
}

// DELETE Todo
function deleteTodo(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(result => {
            if (result.value) {
                return axios({
                    method: 'delete',
                    url: `http://localhost:3000/todo/delete/${id}`,
                    headers: {
                        token: localStorage.token
                    }
                })
            } else {
                throw {message: 'canceled..'}
            }
        })
        .then(()=>{
            Swal.fire(
                'Deleted!',
                'Your todo has been deleted.',
                'success'
                )
            $('.tbody').empty()
            $('.listToday').empty()
            showToday()
            home()
        })
        .catch(err => {
            swal.fire({
                title: `${err.message}`,
            })
        })
}

// EDIT Todo Title / Description
function editTodo(id){
    axios({
        method: 'get',
        url: `http://localhost:3000/todo/${id}`,
        headers: {
            token: localStorage.token
        }
    })
        .then(({data}) => {
            return { value: formValues } =  Swal.fire({
                title: 'Edit your TODO',
                html:
                    `<input id="title" class="swal2-input" value="${data.title}">` +
                    `<input id="description" class="swal2-input" value="${data.description}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        title: document.getElementById('title').value,
                        description: document.getElementById('description').value,
                    }
                }
            })
        })
        .then(({value}) => {
            return axios({
                method: 'patch',
                url: `http://localhost:3000/todo/update/${id}`,
                data:value,
                headers: {
                    token: localStorage.token
                }
            })
        })
        .then(() => {
            swal.fire({
                type: 'success',
                title: 'success updating todo..'
            })
            $('.tbody').empty()
            $('.listToday').empty()
            showToday()
            home()
        })
        .catch(err => {
            swal.fire({
                title: `${err.response}`,
                showCloseButton: true
            })
        })
}

$('#addTodo').on('click', function(e){
    e.preventDefault()
    addTodo()
})

// ADD Todo
function addTodo(){
    const { value: formValues } =  Swal.fire({
        title: 'Create new TODO',
        html:
            '<input id="title" class="swal2-input" placeholder="title">' +
            '<input id="description" class="swal2-input" placeholder="description">' +
            '<input type="date" id="dueDate" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                dueDate: document.getElementById('dueDate').value,
            }
        }
    })
        .then(({value}) => {
            return axios({
                method: 'post',
                url: 'http://localhost:3000/todo',
                data:value,
                headers: {
                    token: localStorage.token
                }
            })
        })
        .then(() => {
            $('.tbody').empty()
            $('.listToday').empty()
            showToday()
            home()
            wal.fire({
                type: 'succes',
                title: 'success..',
            })
        })
        .catch(err => {
            swal.fire({
                title: `${err.response.data}`,
                showCloseButton: true
            })
        })
}


function onSignIn(googleUser){
    const id_token = googleUser.getAuthResponse().id_token

    swal.fire({
        title: 'Logging In',
        onOpen: () => {
        swal.showLoading()
        }
    })
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/gsignin',
        data: {
            token: id_token
        }
    })
    .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        isAuth()
        home()
        showToday()
        swal.close()
    })
    .catch(err => {
        swal.fire({
            title: `${err.response.data}`,
            showCloseButton: true
        })
    })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        $('.tbody').empty()
        $('.listToday').empty()
        $('#email').val('')
        $('#password').val('')
        isAuth()
    });
    Swal.fire({
        type: 'success',
        title: 'Sign out successfully',
        showConfirmButton: false,
        timer: 1500
    })
}