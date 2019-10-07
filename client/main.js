$(document).ready(function(){
    cekLogin()
});

function search(){
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".list .activity").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function loginshow(){
    $(`#modalForm`).modal("show")
}
function textshow(){
    $(`#textModal`).modal("show")
}
function imgshow(){
    // $(`#imgModal`).modal("show")
}

function cekLogin(){
    auth(function(status){
        if (status){
            todolist(true)
            refresh()
            search()
            addText()
            addImg()
            register()
            login()
        }
        else{
            todolist(false)
            profil()
            loginshow()
        }
    })
}

function auth(cb){
    if (localStorage.getItem('token')){
        $.ajax({
            url: 'http://localhost:3000/user/authentication',
            method: 'get',
            headers: {
                token : localStorage.getItem('token')
            }
        })
            .done(user =>{
                profil(user.username)
                cb(true)
            })
            .fail(err => {
                cb(false)
            })
    }
    else{
        cb(false)
    }
}

function todolist(status){
    if(status){
        $('.todolist').empty()
        $('.todolist').append(
            `<div class="search">
                <form id="searchnavbar">
                    <input class="form-control" id="myInput" type="text" placeholder="Search..">
                </form>
            </div>
            <div class="list"></div>`
        )
    }
    else{
        $('.todolist').empty()
        $('.todolist').append(
            `<div class="search">
                <form id="searchnavbar">
                    <input class="form-control" id="myInput" type="text" placeholder="Search..">
                </form>
            </div>`
        )
        // $('.todolist').css("background-image", "url('./img/hacktiv.jpg')")
    }
}

function profil(username){
    console.log(username);
    
    $('.profil').empty()
    if(username){
        $('.profil').append(
            `<div class="fotoprofil"><img src=http://localhost:3000/myAvatars/${username}" alt="" class="img-thumbnail"></img></div>
            <div class="namauser">${username}</div>
            <div class="option" onclick="textshow()">Add To Do Text</div>
            <div class="option" onclick="imgshow()">Add To Do Image</div>
            <button type="button" class="btn btn-danger signout" onclick="signOut()">Log Out</button>`
        )
    }
    else{
        $('.profil').append(
        `<div class="fotoprofil"><img src="./img/logo.png" height="100%" width="100%"></img></div>
        <div class="namauser">WELCOME TO 3K</div>
        <div class="option" onclick="textshow()">Add To Do Text</div>
        <div class="option" onclick="imgshow()">Add To Do Image</div>
        <button type="button" class="btn btn-success signin" onclick="loginshow()">Log In</button>`
        )
    }
}

function refresh(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/user/allToDoList`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
        .done( msg => {
            $('.list').empty()
            msg.forEach(todo => {
                let color
                let line
                if(todo.status == "Done"){
                    line = "line-through"
                }   
                else{
                    line = "none"
                }
                
                if(new Date(todo.duedate) >= new Date()){
                    color = "#29a9dfe1"
                }   
                else{
                    color = "rgba(128, 128, 128, 0.781)"
                }
                $('.list').append(
                    `<div id="todo${todo.id}" class="activity" style="background-color:${color}; text-decoration: ${line};">
                        <div id="titlestatus${todo.id}" class="title"> ${todo.title} </div>
                        <div class="description"> ${todo.description} </div>
                    </div>`
                )               
                $(`#todo${todo.id}`).on('click' , (e) => {
                    e.preventDefault()
                        $('.modals').empty()
                        $('.modals').append(
                            `<div id="edit${todo.id}" class="modal fade" role="dialog">
                                <div class="modal-dialog">
                                    <!-- Modal content-->
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Update To Do</h4>
                                        </div>
                                        <div class="modal-body">
                                            <form id="update${todo.id}" style="text-align:center">
                                                <input type="text" id="title${todo.id}" placeholder="Title" value="${todo.title}">
                                                <textarea form="addtodotext" id="description${todo.id}" placeholder="Description"
                                                    style="width: 100%;
                                                        padding: 2%;
                                                        resize: none;
                                                        border-radius: 15px;">${todo.description}</textarea> 
                                                <input type="date" id="duedate${todo.id}" value="${todo.duedate}">
                                                <select id="status${todo.id}">
                                                    <option value="${todo.status}" selected disabled hidden>${todo.status}</option>
                                                    <option value="On Progress">On Progress</option>
                                                    <option value="Done">Done</option>
                                                </select>
                                                <br>
                                                <div class="err${todo.id}"></div>
                                                <input type="submit" value="Update">
                                                <input type="button" id="delete" onclick="del(${todo.id})");" value="Delete">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        )
                    $(`#edit${todo.id}`).modal("show")
                    $(`#update${todo.id}`).on('submit' , (e) => {
                        e.preventDefault()
                        $.ajax({
                            method: 'patch',
                            url:  `http://localhost:3000/user/updateToDo`,
                            data : {
                                title: `${$(`#title${todo.id}`).val()}`,
                                description : `${$(`#description${todo.id}`).val()}`,
                                duedate : `${$(`#duedate${todo.id}`).val()}`,
                                status : `${$(`#status${todo.id} option:selected`).text()}`,
                                type: "text",
                                id: todo.id
                            },
                            headers: {
                                token : localStorage.getItem('token')
                            }
                        })
                            .done( msg => {
                                console.log(msg);
                                setTimeout(function(){
                                    $(`#edit${todo.id}`).modal('hide')
                                }, 1000);
                                refresh()
                            })
                            .fail(err => {
                                console.log(todo.id);
                                $(`.err${todo.id}`).empty()
                                $(`.err${todo.id}`).append(`<p style="color:red;">${err.responseJSON.message}</p>`)
                            })
                    })
                })
            });
        })
        .fail(err => {
            console.log(err);
        })
}

function del(id){
    $.ajax({
        method: 'patch',
        url:  `http://localhost:3000/user/delToDo`,
        data : {
            id
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
        .done( msg => {
            console.log(msg);
            setTimeout(function(){
                $(`#edit${id}`).modal('hide')
            }, 1000);
            refresh()
        })
        .fail(err => {
            console.log(id);
            $(`.err${id}`).empty()
            $(`.err${id}`).append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
}

function addText(){
    $(`#addtodotext`).on('submit' , (e) => {
        e.preventDefault()
    $.ajax({
        method: 'patch',
        url:  `http://localhost:3000/user/addToDoText`,
        data : {
            title: `${$("#title").val()}`,
            description : `${$("#description").val()}`,
            duedate : `${$("#duedate").val()}`,
            status : "On Progress",
            type : "text"
            },
            headers: {
            token : localStorage.getItem('token')
        }
    })
        .done( msg => {
            $('.errAddText').empty()
            console.log(msg);
            setTimeout(function(){
                $('#textModal').modal('hide')
            }, 1000);
            refresh()
        })
        .fail(err => {
            $('.errAddText').empty()
            $('.errAddText').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
        .always(() =>{
            $("#title").val('')
            $("#description").val('')
            $("#duedate").val('')
        })
    })
}

function addImg(){
    $(`#addtodoimg`).on('submit' , (e) => {
        e.preventDefault()
    $.ajax({
        method: 'post',
        url:  `http://localhost:3000/img`,
        data : {
            title: `${$("#title").val()}`,
            img : `${$("#img").val()}`,
            duedate : `${$("#duedate").val()}`,
            status : "On Progress",
            type : "text"
            },
            headers: {
            token : localStorage.getItem('token')
        }
    })
        .done( msg => {
            $('.errAddText').empty()
            console.log(msg);
            setTimeout(function(){
                $('#textModal').modal('hide')
            }, 1000);
            refresh()
        })
        .fail(err => {
            $('.errAddText').empty()
            $('.errAddText').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
        .always(() =>{
            $("#title").val('')
            $("#description").val('')
            $("#duedate").val('')
        })
    })
}

function register(){
    $('#register').submit(e => {
        e.preventDefault();
        $.ajax({
            method:'post',
            url: `http://localhost:3000/user/register`,
            data: {
                username: `${$("#regname").val()}`,
                email: `${$("#regemail").val()}`,
                password: `${$("#regpass").val()}`
            }
        })
            .done(token => {
                $('.errRegis').empty()
                $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
                localStorage.setItem('token', token)
                cekLogin()
                setTimeout(function(){
                    $('#modalForm').modal('hide')
                }, 1000);

            })
            .fail(err=>{
                $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
            })
            .always(() =>{
                $("#regname").val('')
                $("#regemail").val('')
                $("#regpass").val('')
            })
    })

}

function login(){
    $('#login').submit(e => {
        e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/login`,
        data: {
            email: `${$("#logemail").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
    .done(({token, username})=> {
        $('.errLogin').empty()
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            localStorage.setItem('token', token)
            cekLogin()
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 1000);
        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
        .always(() =>{
            $("#logemail").val('')
            $("#logpass").val('')
        })
    })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/user/signGoogle',
        method: 'post',
        data:{
            id_token
        }
    })
        .done(({token, username}) => {
            $('.errLogin').empty()
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            localStorage.setItem('token', token)
            cekLogin()
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 1000);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $('.errRegis').empty()
    $('.successRegis').empty()
    $('.errLogin').empty()
    $('.successLogin').empty()
    cekLogin()
}