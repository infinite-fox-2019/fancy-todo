// $.ajax({
//     url: 'http://www.boredapi.com/api/activity/',
//     method: 'get'
// })
//     .done((data) => {
        
//         console.log(data.activity)

//     })

// $('#addTodo').submit(e =>{
//     e.preventDefault()
//     $.ajax({
//         method: 'post',
//         url: 'http://localhost:3000/todo',
//         data: {description: `${$("#description").val()}`}
//     })
//     .done((data) => {
        
//         console.log(`berhasil menambahkan ${data}`)

//     })
// })

// -----------------------------------------------------------
let datauser = 'tes'
$(document).ready(function(){
  
})

refresh()

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
            $("#regname").val('')
            $("#regemail").val('')
            $("#regpass").val('')
            $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
            localStorage.setItem('token', token)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
            refresh()
        })
        .fail(err=>{
            $('.errRegis').empty()
            $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

$('#login').submit(e => {
    e.preventDefault();
    
    $('.errLogin').empty()
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/login`,
        data: {
            username: `${$("#logname").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
        .done((token)=> {
            datauser = `${$("#logname").val()}`
            $("#logpass").val('')
            $("#logname").val('')
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            localStorage.setItem('token', token)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
            // location.reload(); pake ini bisa tapi ke refresh gmna caranya
            refresh()
 
        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

function refresh() {
    if(localStorage.getItem('token')){
        // alert(datauser)
        $('#afterLogin').show()
        $('#beforeLogin').hide()
        addTodo()
        allTodo()
        
        $.ajax({
            method: 'get',
            url:`http://localhost:3000/user`,
            headers: {
                token:localStorage.getItem('token')
            }
        })
        .done(data=>{
            $('.loginStatusimg').empty()
            $('.loginStatusket').empty()
            $('.profile-image').empty()
            $('.nama').empty()

            $('.loginStatusimg').append(`
            <img src="http://localhost:3000/myAvatars/32/${data.username}">
            `)
            $('.loginStatusket').append(`
            <a href="#" class="mx-2 my-1">${data.username}</a>
            <span class="mx-2 my-1">Logged in </span>
            `)
            $('.profile-image').append(`
            <span class="image" style="background-image: url('http://localhost:3000/myAvatars/${data.username}');"></span>
            `)
            $('.nama').append(`<h3>${data.username}</h3>`)
           
            
        })
        .fail(err=>{
            
            
            console.log(err);
            
        })
       



    } else {
        $('#afterLogin').hide()
        $('#beforeLogin').show()
        $('.loginStatusimg').empty()
        $('.loginStatusket').empty()
        $('.profile-image').empty()
        $('.nama').empty()
        
    }
}

function addTodo() {
    $(`#addTodoForm`).submit((e)=>{
        e.preventDefault()
        e.stopImmediatePropagation();
        $.ajax({
            url: `http://localhost:3000/user/addTodo`,
            method : 'patch',
            data:{
                title: `${$('#titleTodo').val()}`,
                description: `${$('#descriptionTodo').val()}`,
                dueDate: `${$('#dateTodo').val()}`
            },
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .done(data =>{
            setTimeout(function(){
                $('#formTodoModal').modal('hide')
            }, 500);
            refresh()
        })
        .fail(err => {
            console.log(err)
        })
    })
}

function allTodo() {
    $.ajax({
        url:'http://localhost:3000/user/allTodo',
        method:'get',
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(data=>{
        console.log(data);
        $('.todo-list').empty()
        $('.modalUpdate').empty()
        for(let i = 0; i < data.length; i++) {
            if(new Date(data[i].dueDate) >= new Date()) {
                $(".sticky").attr('style','background-color: red !important;')
            }
            $('.modalUpdate').append(`
            <div class="modal fade" id="formTodoModalUpdate${data[i].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Your Todos</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addTodoFormUpdate${data[i].id}">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" id="titleTodoUpdate${data[i].id}" placeholder="todos title" value="${data[i].title}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" id="descriptionTodoUpdate${data[i].id}" placeholder="description" value="${data[i].description}">
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" class="form-control" id="dateTodoUpdate${data[i].id}" value="${data[i].dueDate}">
                    </div>
                    <div class="form-group">
                        <select id="status">
                            <option value="On Progress">On Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <br>
                            <div class="err${data[i].id}"></div>
                        </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
                </div>
            </div>
          </div>
            `)
            $('.todo-list').append(`
            <div class="post-it">
            <p class="sticky taped" style="font-weight: normal; ">
                <span style="font-weight: bold;">${data[i].title}</span> <br>
                    ${data[i].description}
                </p>
                <a href="#" onclick="deleteTodo(${data[i].id})" style="color:white;margin-left:5px;"><i class="fas fa-trash-alt"></i></a>
                <a href="#" onclick="updateTodo(${data[i].id})" data-toggle="modal" data-target="#formTodoModalUpdate${data[i].id}" style="color:white;margin-left:5px;"><i class="fas fa-pencil-alt"></i></a>
            </div>
            `)
        }
        // refresh()
    
    })
}

function deleteTodo(id) {
    $.ajax({
        method:'patch',
        url:  `http://localhost:3000/user/deleteTodo`,
        data : {
            id
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done( msg => {
     
        refresh()
    })
    .fail(err => {
        console.log(id);
        $(`.err${id}`).empty()
        $(`.err${id}`).append(`<p style="color:red;">${err.responseJSON.message}</p>`)
    })
}

function updateTodo(id) {
    $(`#addTodoFormUpdate${id}`).on('submit',(e)=>{
        
        e.preventDefault()
        console.log('ini on submit');
        console.log(id);
        
        $.ajax({
            method: 'patch',
            url:  `http://localhost:3000/user/updateTodo`,
            data : {
                title: `${$(`#titleTodoUpdate${id}`).val()}`,
                description : `${$(`#descriptionTodoUpdate${id}`).val()}`,
                dueDate : `${$(`#dateTodoUpdate${id}`).val()}`,
                // status : `${$(`#status option:selected${id}`).text()}`,
                id
            },
            headers: {
                token : localStorage.getItem('token')
            }
        })
            .done( msg => {
                // alert('tes')
                // console.log(msg);
                setTimeout(function(){
                    $(`#formTodoModalUpdate${id}`).modal('hide')
                }, 1000);
                refresh()
            })
            .fail(err => {
                console.log('error nih');
                
                console.log(err);
                
            })
    })

}

function onSignIn(googleUser) {
    // SING IN GOOGLE NYA BLM BISAAAAAAAAAAAAAAAAAAAAAAA ???????????????
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/user/signGoogle',
        method: 'post',
        data:{
            id_token
        }
    })
        .done((token) => {
            localStorage.setItem('token', token)
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
            refresh()
        })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    // SIGN OUT NYA BLM BISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    
    localStorage.removeItem('token')
    $('.successLogin').hide()

    refresh()
}

function cekLogin(cb){
    if (localStorage.getItem('token')){
        $.ajax({
            url: 'http://localhost:3000/user/authentication',
            method: 'get',
            headers: {
                token : localStorage.getItem('token')
            }
        })
            .done(status =>{
                cb(true)
            })
            .fail(err => {
                
                $(`#modalForm`).modal("show")
                cb(false)
            })
    }
    else{
        $(`#modalForm`).modal("show")
        cb(false)
    }
} 
