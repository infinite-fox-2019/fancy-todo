
$(document).ready(function(){
    console.log("SIAP")

    if(localStorage.getItem('token')){
        console.log("masuk login")
        getTodolist()
        getDoneTodolist()
        $(`#user-todo`).show()
        $(`#user-todo-done`).show()
        $(`#signoutbtn`).show()
        $(`#signinbtn`).hide()
        $(`#user-information`).empty()
        $(`#user-information`).append(
            `<h5><b>Selamat datang di MyFancyTodo's~</b></h5>
            <h5><b>${$("#logname").val()}</b></h5>`
        )
    }else{
        $(`#titleList`).empty()
        $(`#titleDone`).empty()
        $(`#titleDate`).empty()
        $(`#signoutbtn`).hide()
        $(`#signinbtn`).show()
    }    
    
    
})

// register dan login

$('#register').submit(e => {
    $('.successRegis').empty()
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/register`,
        data: {
            email: `${$("#regemail").val()}`,
            password: `${$("#regpass").val()}`
        }
    })
        .done(token => {
            $('.errRegis').empty()
            $("#regemail").val('')
            $("#regpass").val('')
            $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
            localStorage.setItem('token', token)
            
        setTimeout(function(){
            $('#modalForm').modal('hide')
        }, 2000);

        })
        .fail(err=>{
            $('.errRegis').empty()
            $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

$('#login').submit(e => {
    $('.errLogin').empty()
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/login`,
        data: {
            email: `${$("#logname").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
        .done((token)=> {
            
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            let data = `${$("#logname").val()}`
            $("#logpass").val('')
            $("#logname").val('')
            localStorage.setItem('token', token)
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()

            $(`#user-information`).empty()
            $(`#user-information`).append(
                    `<h5><b>${data}</b></h5>`
            )
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 2000);
        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})


//google sign

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/user/gsign',
        method: 'post',
        data:{
            id_token
        }
    })
        .done((token) => {
            localStorage.setItem('token', token)
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()

            $(`#user-information`).empty()
            $(`#user-information`).append(
                `<h5><b>${profile.getName()}</b></h5>`
            )
            getTodolist()
            getDoneTodolist()
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 3000);
        })
}

//Todo here

//generate user todo's

function getTodolist(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/todo/allTodo`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data) {
        $(`#user-todo`).empty()
        data.forEach(function(element) {
            if(element.status!==true){
                $(`#user-todo`).prepend(
                `   <div class="card" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <a href="#" class="btn btn-sm btn-primary d-flex justify-content-center" id="${element._id}up">Done</a>
                            <br>
                            <a href="" class="btn btn-sm btn-default btn-primary d-flex justify-content-center" data-toggle="modal" data-target="#modalEdit" id="${element._id}edit">edit</a>
                            <br>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}del">Delete Todo</a>
                        </div>
                    </div>`
                    )
            }
                $(`#${element._id}del`).on('click', function () {
                    console.log("MASUK DELETEE")
                    console.log(`discard ${element.name}`)
                    $.ajax({
                        method: 'delete',
                        url: `http://localhost:3000/todo/deleteTodo`,
                        data: {
                            _id: element._id
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(function(data) {
                            $('.resultAddTodo').empty()
                            $('.resultAddTodo').append(`<h2 style="color:red;">Todo Deleted!</h2>`)
                            getTodolist()
                            getDoneTodolist()
                        })
                        .fail(function(err) {
                            console.log(err)
                        })
                })
                $(`#${element._id}edit`).on('click', function(){
                    $(`#edit`).submit( function(e) {
                        e.preventDefault()
                        $('.successEdit').empty()
                        $('.errEdit').empty()
                        // console.log(`edit ${element.name}`)
                        $.ajax({
                            method: 'put',
                            url: `http://localhost:3000/todo/updateTodo`,
                            data: {
                                _id: element._id,
                                name : `${$("#nameEdit").val()}`,
                                description : `${$("#descriptionEdit").val()}`,
                                dueDate : `${$("#dueDateEdit").val()}`
                                
                            },
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                            .done(function(data) {
                                $("#nameEdit").val('')
                                $("#descriptionEdit").val('')
                                $("#dueDateEdit").val('')
                                console.log("SINIIIIII EDIT")
                                console.log("updated")
                                $('.resultAddTodo').empty()
                                $('.resultAddTodo').append(`<h2 style="color:green;">Todo Updated!</h2>`)
                                getTodolist()
                                getDoneTodolist()
                                $('.successEdit').empty()
                                $('.successEdit').append(`<p style="color:green;">success</p>`)
                            })
                            .fail(function(err) {
                                console.log(err)
                                $('.errEdit').empty()
                                $('.errEdit').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
                            })
                    })
                })


                $(`#${element._id}up`).on('click', function () {
                    console.log(`update ${element.name}`)
                    $.ajax({
                        method: 'patch',
                        url: `http://localhost:3000/todo/statusTodo`,
                        data: {
                            _id: element._id,
                            status : true
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(function(data) {
                            $('.resultAddTodo').empty()
                            $('.resultAddTodo').append(`<h2 style="color:green;">Todo Achieved</h2>`)
                            getTodolist()
                            getDoneTodolist()
                        })
                        .fail(function(err) {
                            console.log(err)
                        })
                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })


            
}

//add todo

$('#add-todo').submit(e =>{
    $('.resultAddTodo').empty()
    e.preventDefault();
    cekLogin(function(status){
        if (status){
    $.ajax({
        method:'post',
        url: `http://localhost:3000/todo/addTodo`,
        data: {
            name: `${$("#name").val()}`,
            description: `${$("#description").val()}`,
            dueDate : `${$("#dueDate").val()}`
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        $("#name").val('')
        $("#description").val('')
        $("#dueDate").val('')
        console.log("disini upDATEEEE")
        console.log(data)
        getTodolist()
        getDoneTodolist()
        $('.resultAddTodo').empty()
        $('.resultAddTodo').append(`<h2 style="color:green;">Success Add Todo!</h2>`)
    })
    .fail(function(err){
        console.log(err)
        $('.resultAddTodo').empty()
        $('.resultAddTodo').append(`<h2 style="color:red;">${err.responseJSON.message}!</h2>`)
    })
    }else{
        $(`#modalForm`).modal("show")
        cb(false)
        }
    })
})

//generate achieved user todo's

function getDoneTodolist(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/todo/allTodo`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data) {
        $(`#user-todo-done`).empty()
        data.forEach(function(element) {
            if(element.status===true){
                $(`#user-todo-done`).prepend(
                `   <div class="card" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <p class="card-text d-flex justify-content-center">Congrats!, you did it!!</p>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}">Delete Todo</a>
                        </div>
                    </div>`
                    )
            }
                $(`#${element._id}`).on('click', function () {
                    console.log(`discard ${element.name}`)
                    $.ajax({
                        method: 'delete',
                        url: `http://localhost:3000/todo/deleteTodo`,
                        data: {
                            _id: element._id
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(function(data) {
                            $('.resultAddTodo').empty()
                            $('.resultAddTodo').append(`<h2 style="color:red;">Achieved Todo Deleted!</h2>`)
                            getTodolist()
                            getDoneTodolist()
                        })
                        .fail(function(data) {
                            console.log(err)
                        })
                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })
}


//generate holiday list


$.ajax({
    method : "get",
    url : "http://localhost:3000/api/holiday",
    headers : {
        token : localStorage.getItem("token")
    }
})
.done(function(data){
    console.log(data)
    data.response.holidays.forEach(function(element){
        console.log("MASUKKKKK")
        if(element.type[0]==="National holiday")
        $('#holiday').prepend(
            `   <div class="card" style="width: 15rem;">
                    <div class="card-body ">
                        <p class="card-title d-flex justify-content-center">DATE !</p>
                        <p class="card-text d-flex justify-content-center">${element.date.iso}</p>
                        <p class="card-title d-flex justify-content-center">Why is it special?</p>
                        <p class="card-title d-flex justify-content-center"><strong>${element.name}</strong></p>
                        <p class="card-text d-flex justify-content-center">Description</p>
                        <p class="card-text d-flex justify-content-center">${element.description}</p>
                        <a href="#" class="btn btn-sm btn-info d-flex justify-content-center" id="${element.date.iso}">Mark this Date !</a>
                    </div>
                </div>
            `
        )
        $(`#${element.date.iso}`).on('click',_ =>{
            $('.resultAddTodo').empty()
            cekLogin(function(status){
                if (status){
            $.ajax({
                method:'post',
                url: `http://localhost:3000/todo/addTodo`,
                data: {
                    name: element.name,
                    description: element.description,
                    dueDate : element.date.iso
                },
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .done(function(data){
                console.log("disini upDATEEEE")
                console.log(data)
                getTodolist()
                getDoneTodolist()
                $('.resultAddTodo').empty()
                $('.resultAddTodo').append(`<h2 style="color:green;">Success Add Todo!</h2>`)
            })
            .fail(function(err){
                console.log(err)
                $('.resultAddTodo').empty()
                $('.resultAddTodo').append(`<h2 style="color:red;">${err.responseJSON.message}!</h2>`)
            })
            }
            })
        })
    })
    .fail(function(err){
        console.log(err)
    })
})









//signout here

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $('.successLogin').hide()
    $(`#signoutbtn`).hide()
    $(`#signinbtn`).show()
    $('.resultAddTodo').empty()
    $(`#todoContainer`).empty()
    $(`#user-information`).empty()
}


//access todo if login

function cekLogin(cb){
    if (localStorage.getItem('token')){
        $.ajax({
            url: 'http://localhost:3000/user/authentication',
            method: 'get',
            headers: {
                token : localStorage.getItem('token')
            }
        })
            .done(function(status){
                cb(true)
            })
            .fail(function(err) {
                
                $(`#modalForm`).modal("show")
                cb(false)
            })
    }
    else{
        $(`#modalForm`).modal("show")
        cb(false)
    }
} 