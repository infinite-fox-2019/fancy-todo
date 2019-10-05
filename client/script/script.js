$(document).ready(()=>{
  console.log('dom is ready')
  loginPage()
})
const show = (element)=>{
  $(element).show()
}
const hide = (element)=>{
  $(element).hide()
}
const loginPage = ()=>{
  hide('#nav')
  hide('#addTodo')
  hide('#listTodo')
  show('#loginPage')
  hide('#registerform')
  hide('#signoutClick')
  hide('#modalButton')
}

const todoPage = ()=>{
  show('#nav')
  show('#addTodo')
  show('#listTodo')
  hide('#loginPage')
  hide('#registerform')
  show('#signoutClick')
  show('#modalButton')
}

// let token = localStorage.getItem('token')
// if(!token){
//   hide('#nav')
//   hide('#addTodo')
//   hide('#listTodo')
//   show('#loginPage')
//   hide('#registerform')
// }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
  method : 'post',
  url : 'http://localhost:3000/users/loginOAuth',
  data : {
    id_token
  }
  })
  .done((token)=>{
    console.log('asdadasdadwqed')
    localStorage.setItem('token',token)
    todoPage()
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    loginPage()
  });
}

$('#signoutClick').click(function(){
  loginPage()
})

$('#loginClick').click(function(){
  hide('#registerform')
  show('#loginform')
})

$('#registerClick').click(function(){
  hide('#loginform')
  show('#registerform')
})

$('#login').on('submit',(e)=>{
  e.preventDefault()
  let email = $('#loginemail').val()
  let password = $('#loginpassword').val()
  $.ajax({
    method : 'post',
    url : 'http://localhost:3000/users/login',
    data : {
      email,password
    }
  })
  .done((token)=>{
    localStorage.setItem('token',token)
    console.log(localStorage.getItem('token'));
    getCards()
    // todoPage()
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
})

$('#register').on('submit',(e)=>{
  e.preventDefault()
  let email = $('#registeremail').val()
  let password = $('#registerpassword').val()
  let name = $('#registername').val()
  $.ajax({
    method : 'post',
    url : 'http://localhost:3000/users/register',
    data : {
      email,password,name
    }
  })
  .done((token)=>{
    localStorage.setItem('token',token)
    todoPage()
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
})

$('#addTodo').on('submit',(e)=>{
  e.preventDefault()
  let token = localStorage.getItem('token')
  let title = $('#addTodoTitle').val()
  let descriptions = $('#addTodoDescriptions').val()
  let dueDate = $('#addTodoDueDate').val()
  $('#exampleModal').modal('toggle');
  $.ajax({
    method : 'post',
    url : 'http://localhost:3000/todos/add',
    data : {
      title,descriptions,dueDate
    },
    headers : {
      token
    }
  })
  .done((updateUser)=>{
    console.log(updateUser);
    todoPage()
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
})

function getCards(){
  let token = localStorage.getItem('token')
  $.ajax({
    method : 'get',
    url : 'http://localhost:3000/users/find',
    headers : {
      token
    }
  })
  .done((user)=>{
    let todo = user.todoList
    let todos = ''
    todo.forEach(element => {
      todos += `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Created at : ${element.createdAt}</h6>
        <h6>Descriptions: </h6>
        <p class="card-text">${element.descriptions}</p>
        <p class="card-text">Due date: ${element.dueDate}</p>
        <p class="card-text">Status: ${element.status}</p>
        <a href="#" class="btn btn-success">Update Status</a>
        <a href="#" class="btn btn-danger">Delete todo</a>
      </div>
    </div>
      `
    });
    $('#newTodo').replaceWith(todos)
    todoPage()
  })
  .fail((error)=>{
    console.log(error);
  })
  .always()
}
