$( document ).ready(function() {
    console.log( "ready!" );

    landingPage()
    

    
})

function todo(){
    $('#todo').append(`
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-white rounded sticky-top">
        <a class="navbar-brand" href="#" style="font-family: 'Allura', cursive;">
            Fancy Todo
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active my-2 float-align-right">
                <a href="#" onclick="signOut();">Sign out</a>
            </li>
            </ul>
        </div>
    </nav>
    <form class="text-center">
        <input class="form-control form-control-lg" type="date" id="dateInput">
        <h2>Insert your plan here:</h2>
        <input class="form-control form-control-lg" type="text" placeholder="Play Video Games" id="inputTodo">
        <button type="button" class="btn btn-primary btn-lg" style="margin-top: 20px" onclick="buttonInput()">Insert Todo</button>
    </form>
    <div class="container" style="margin-top: 30px; padding-right: 0px; margin-bottom: 30px">
        <div class="row">
            <div class="col-sm-4 border bg-light">
                <form class="form-inline my-2 my-lg-0" style="padding: 20px 10px 20px 10px; margin: 0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="inputSearch">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="findTodo()">Search</button>
                </form> 
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-danger" style="margin-bottom: 20px" onclick="deleteAllDone()">Delete Completed Todo</button>
                <div class="container">
                    <div class="row">
                        <div class="col-md border rounded-top bg-light text-dark">
                            <h4 style="margin-top: 5px">Your Todo List:</h4>
                        </div>
                    </div>
                </div>
                <ul class="list-group" id="todoList">
                </ul>
            </div>
        </div>
    </div> 
    `)
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    $('#todo').empty()
    $('.login').show()
    $('.g-signin2').show()
    localStorage.removeItem("token");
    console.log('User signed out.');
    });
}

function landingPage(){
    $('.login').append(`
        <form style="margin-top:25%">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </form>
    `)
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/users/oauth',
        data:{
            id_token
        }
    })
        .done(token=>{
            localStorage.setItem('token', token)
            $('.login').hide()
            $('.g-signin2').hide()
            todo()
            todoList()
        })
}

function todoList(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    $.ajax({
        url: `http://localhost:3000/todos/token`,
        method: 'post',
        data:{
            token
        }
    })
        .done(todos=>{
            
            todos.forEach(todo=>{
                if(todo.status == false){
                    $('#todoList').append(`
                        <li class="list-group-item" id="todo-${todo._id}">
                            <img src="./icons/undone.png" width="24px" onclick="todoDone('${todo._id}', '${todo.description}')" style="cursor:pointer">
                            ${todo.description}
                            <img class="float-sm-right" src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${todo._id}')" style="cursor:pointer"> 
                            <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoDone('${todo._id}', '${todo.description}')">Done</button>
                        </li>`)
                }
                else{
                    $('#todoList').append(`
                        <li class="list-group-item" id="todo-${todo._id}">
                            <img src='./icons/checked.png' width="24px" onclick="todoUndone('${todo._id}', '${todo.description}')" style="cursor:pointer">
                            <s>${todo.description} </s>
                            <img class="float-sm-right" src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${todo._id}')" style="cursor:pointer"> 
                            <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoUndone('${todo._id}', '${todo.description}')">Undone</button>
                        </li>`)
                }
            })
        })
}

function deleteTodo(id){
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`
    })
        .done(number=>{
            
            $(`#todo-${id}`).remove()
        })
}

function deleteAllDone(){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            const token = localStorage.getItem('token')
            if (willDelete) {
                $.ajax({
                    method: 'delete',
                    url: 'http://localhost:3000/todos/done',
                    data:{
                        token
                    }
                })
                    .done(number=>{
                        $('#todoList').empty()
                        todoList()
                    });
            }
        });
}

function todoDone(id, description){
    $.ajax({
        method: 'patch',
        url: `http://localhost:3000/todos/done/${id}`
    })
        .done(number=>{
            $(`#todo-${id}`).html(
                `<img src='./icons/checked.png' width="24px" onclick="todoUndone('${id}', '${description}')" style="cursor:pointer">
                <s>${description} </s>
                <img class="float-sm-right" src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${id}')" style="cursor:pointer"> 
                <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoUndone('${id}', '${description}')">Undone</button>`
            )
        })
}

function todoUndone(id, description){
    $.ajax({
        method: 'patch',
        url: `http://localhost:3000/todos/undone/${id}`
    })
        .done(number=>{
            $(`#todo-${id}`).html(
                `<img src='./icons/undone.png' width="24px" onclick="todoDone('${id}', '${description}')" style="cursor:pointer">
                ${description}
                <img class="float-sm-right" src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${id}')" style="cursor:pointer"> 
                <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoDone('${id}', '${description}')">Done</button>`
            )
        })
}

function buttonInput(){

    const token = localStorage.getItem('token')
    if(!$('#inputTodo').val()){
        swal("Input Empty", "Please Insert Your Plan", "error");
    }
    else{
        const description = $('#inputTodo').val()
        $.ajax({
            method: 'post',
            url: `http://localhost:3000/todos`,
            data:{
                description,
                token
            }
        })
            .done((todo)=>{
                $('#inputTodo').val('')
                $('#todoList').append(`
                    <li class="list-group-item" id="todo-${todo._id}">
                        <a href="#" onclick="todoDone('${todo._id}', '${todo.description}')">
                            <img src="./icons/undone.png" width="24px">
                        </a>
                        ${todo.description} 
                        <a class="float-sm-right delete-todo" href="#"> 
                        <img src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${todo._id}')"> 
                        </a> 
                        <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoDone('${todo._id}', '${todo.description}')">Done</button>
                    </li>`)
            })
    }
}

function findTodo(){
    const token = localStorage.getItem('token')
    const search = $('#inputSearch').val()
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/todos/find?q=${search}`,
        data: {
            token
        }
    })
        .done(todos=>{
            if(todos.length == 0){
                swal("Sorry", `You have no todo plan with keyword ${search}`, "error");
            }
            else{
                $('#todoList').empty()
                todos.forEach(todo=>{
                    if(todo.status == false){
                        $('#todoList').append(`
                            <li class="list-group-item" id="todo-${todo._id}">
                                <img src="./icons/undone.png" width="24px" onclick="todoDone('${todo._id}', '${todo.description}')">
                                ${todo.description}
                                <a class="float-sm-right delete-todo" href="#"> 
                                <img src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${todo._id}')"> 
                                </a> 
                                <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoDone('${todo._id}', '${todo.description}')">Done</button>
                            </li>`)
                    }
                    else{
                        $('#todoList').append(`
                            <li class="list-group-item" id="todo-${todo._id}">
                                <img src='./icons/checked.png' width="24px" onclick="todoUndone('${todo._id}', '${todo.description}')">
                                <s>${todo.description} </s>
                                <a class="float-sm-right delete-todo" href="#"> 
                                <img src="./icons/trash.png" alt="delete" width="24px" onclick="deleteTodo('${todo._id}')"> 
                                </a> 
                                <button type="button" class="btn-sm btn-outline-secondary float-sm-right" style="margin-right:20px" onclick="todoUndone('${todo._id}', '${todo.description}')">Undone</button>
                            </li>`)
                    }
                })
            }
        })
}
