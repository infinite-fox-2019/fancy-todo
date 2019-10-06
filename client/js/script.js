const url = `http://localhost:3000`

$(document).ready(() => {

    // kondisi ketika user meng-CLICK tombol login
    $('#loginbtn').click(function (event) {
        event.preventDefault()
        let data = $('#getLoginFrom input').serialize()
        $.ajax({
            url: `${url}/user/manualLogin`,
            method: 'post',
            data: data
        })
            .done(response => {
                localStorage.setItem('token', response.token)
                avatar(response.user)
                userLogged()
            })
            .fail(err => {
                console.log(err);
                let msg = err.responseJSON
                let text = ''
                msg.forEach(el => {
                    text += el + ', '
                });

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text,
                })
            })
    })

    // kondisi ketika user melakukan REGISTER dan meng-CLICK tombol register
    $('#registerBtn').click(function (event) {
        event.preventDefault()
        let data = $('#getRegisterForm input').serialize()

        $.ajax({
            url: `${url}/user/register`,
            method: 'post',
            data: data
        })
            .done(response => {
                localStorage.setItem('token', response.token)
                avatar(response.user)
                userLogged()
            })
            .fail(err => {
                console.log(err);
                let msg = err.responseJSON
                let text = ''
                msg.forEach(el => {
                    text += el + ', '
                });

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text,
                })
            })
    })

    //kondisi ketika user meng-CLICK tombol LOGOUT
    $('#logout').click(function (event) {
        event.preventDefault()
        localStorage.removeItem('token');
        userNotLogged()

    })

})


function PersonBtn() {
    $('#middleDiv').html('')

}


function profileData() {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
    }).queue([
        {
            title: 'Alamat',
            text: 'masukan alamat anda ex: Jakarta Selatan'
        },
        {
            title: 'Nomor Telepon',
            text: 'masukan nomor telepon anda'
        },
        {
            title: 'Moto hidup',
            text: 'masukan moto hidup anda ex: sleep only for the week'
        }
    ]).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'All done!',
                html:
                    'Your answers: <pre><code>' +
                    JSON.stringify(result.value) +
                    '</code></pre>',
                confirmButtonText: 'Lovely!'
            })


        }
    })
}

function avatar(user) {

    let data = `
    <button onclick="signOut()">Logout</button>
    <div class="presonalInfo">
        <p>${user.username}</p>
        <p>${user.motto}</p>
    </div>
    <img src="https://api.adorable.io/avatars/285/${user.email}.png" alt="">

    <div class="footer">
        <p>Lokasi: ${user.location}</p>
        <p>Nomor Hp: ${user.phone}</p>
        <p>email: ${user.email}</p>
    </div>
    <button onclick="profileData()">Edit Profil</button>`
    $('.profile').html('')
    $('.profile').html(data)
}

function createNewTodo() {
    $('.middleDiv').hide()
    $('#createTodoFrom').html(`

    <form id = "todoFrom" class="formTodo" method = "patch" >
        <h1>: Create New Todo</h1>
        <input type="text" name="title" placeholder="Enter Title">
            <input type="text" name="description" placeholder="Enter Description">
                <input type="text" name="status" placeholder="Enter Status">
                    <input type="date" name="dueDate" placeholder="Enter DueDate">
                        <button type="button" onclick="return createTodo()" id="createBtn" >Add</button>
    </form>
                    `)
    $('#createTodoFrom').show()
}


// fungsi untuk membuat create baru
function createTodo() {
    let data = $('#todoFrom input').serialize()

    $.ajax({
        url: `${url}/todo/create`,
        method: 'post',
        data: data,
        headers: {
            'access_token': localStorage.getItem('token')
        }
    })
        .done(todo => {
            $('#createTodoFrom').hide()
            $('#createTodoFrom').html('')
            showTodoList(todo)
            $('.middleDiv').show()
        })
        .fail(err => {
            console.log(err);
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })
}


// kondisi ketika user login
function userLogged() {
    $('#loginPage').hide()
    getTodos()
    $('#dashboard').show()
}

// kondisi ketika user BELUM login ATAU LOGOUT
function userNotLogged() {
    $('#dashboard').hide()
    $('.profile').html('')
    $('#personalTodolist').html('')
    $('#personalTodolist').html(
        `<div class="card createNewBoard" id="createPersonalTodo" onclick="createNewTodo()">
                        <i class="far fa-plus-square"></i>
                        <p>Create New Todo</p>
                    </div>`
    )
    $('#loginPage').show()
}


// fungsi untuk menampikan semua todo
function getTodos() {
    $.ajax({
        url: `${url}/todo/show`,
        method: 'get',
        headers: {
            'access_token': localStorage.getItem('token')
        }
    })
        .done(todos => {
            if (todos.length) {
                todos.forEach(todo => {
                    showTodoList(todo)
                });
            }
        })
        .fail(err => {
            console.log(err);
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })
}


// fungsi untuk mengubah format tanggal
function awesomeDate(date) {
    let event = new Date(date);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString('en-US', options)
}


// show detail todo
function showOneTodo(id) {
    $.ajax({
        url: `${url}/todo/showOne/${id}`,
        method: 'get',
        headers: {
            'access_token': localStorage.getItem('token')
        }
    })
        .done(todo => {
            $('.middleDiv').hide()
            let data =
                `
            <div class="showSingleTodoCard">
                        <div class="SingleTodo">
                            <p>${todo.title}</p>
                        </div>
                        <div class="descriptionSingleTodo">
                            <p>
                               ${todo.description}
                            </p>
                        </div>
                        <div class="SingleTodo">
                            <p>${todo.status}</p>
                        </div>
                        <div class="SingleTodo">
                            <p>${awesomeDate(todo.dueDate)}</p>
                        </div>
                        <div class="options">
                            <button onclick="return editTodo('${todo._id}')" >Edit</button>
                            <button onclick="return deleteTodo('${todo._id}')" >Delete</button>
                        </div>
                    </div>
            `

            $('#showSingleTodo').html(data)
            $('#showSingleTodo').show()
        })
        .fail(err => {
            console.log(err);
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })
}


// untuk mengedit todo
function editTodo(id) {
    $.ajax({
        url: `${url}/todo/showOne/${id}`,
        method: 'get',
        headers: {
            'access_token': localStorage.getItem('token')
        }
    })
        .done(todo => {
            let event = new Date(todo.dueDate);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            $('.middleDiv').hide()
            $('#showSingleTodo').hide()
            $('#showSingleTodo').html('')

            let data =
                `<form action="" id="updateTodo" class="formTodo" method="patch">
                <h1>: Edit Todo</h1>
                <input type="text" value="${todo.title}" name="title" placeholder="Enter Title">
                <input type="text" value="${todo.description}" name="description" placeholder="Enter Description">
                <input type="text" name="status" value="${todo.status}" placeholder="Enter Status">
                <label style="font-size: 15px;" >Current Date:</label>
                <input type="text" style="font-size: 15px; background-color: rgba(0, 0, 0, 0.449);" value="${awesomeDate(todo.dueDate)}" readonly>
                <input type="date" value="${todo.dueDate}" name="dueDate">
                <button type="button" onclick="updateTodo('${todo._id}')" id="UpdateBtn">Edit</button>
            </form>`
            $('#updateTodoForm').append(data)
            $('#updateTodoForm').show()
        })
        .fail(err => {
            console.log(err);
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })
}


// MNECETAK tudo BUKAN ngambil dari data base
function showTodoList(todo) {
    let todolist =
        `
    <div class="card" onclick="return showOneTodo('${todo._id}')">
                        <h3>${todo.title}</h3>
                        <p>${todo.description}</p>
                    </div>
                    `
    $('#personalTodolist').prepend(todolist)
}


// memasukkan data updatetan ke database
function updateTodo(id) {
    let data = $('#updateTodo input').serialize()
    $.ajax({
        url: `${url}/todo/update/${id}`,
        method: 'patch',
        data: data,
        headers: {
            'access_token': localStorage.getItem('token')
        }
    })
        .done(todo => {
            $('#createTodoFrom').hide()
            $('#updateTodoForm').html('')
            $('#personalTodolist').html('')
            $('#personalTodolist').html(
                `<div class="card createNewBoard" id="createPersonalTodo" onclick="createNewTodo()">
                        <i class="far fa-plus-square"></i>
                        <p>Create New Todo</p>
                    </div>`
            )
            getTodos()
            $('.middleDiv').show()
        })
        .fail(err => {
            let msg = err.responseText
            $(`#errorLogin`).html(msg);
        })
}


// menghapus todo
function deleteTodo(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: `${url}/todo/delete/${id}`,
                method: 'delete',
                headers: {
                    'access_token': localStorage.getItem('token')
                }
            })
                .done(todo => {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    $('#showSingleTodo').html('')
                    $('#showSingleTodo').hide()
                    $('#personalTodolist').html('')
                    $('#personalTodolist').html(
                        `<div class="card createNewBoard" id="createPersonalTodo" onclick="createNewTodo()">
                        <i class="far fa-plus-square"></i>
                        <p>Create New Todo</p>
                        </div>`
                    )
                    getTodos()
                    $('.middleDiv').show()
                })
                .fail(err => {
                    let msg = err.responseText
                    $(`#errorLogin`).html(msg);
                })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })


}