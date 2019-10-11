$(document).ready(()=>{
  console.log('dom is ready')
  loginPage()
  let token = localStorage.getItem('token')
  if(token){
  // console.log(token)
  todoPage()
  getCards()
}
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





function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
  method : 'post',
  url : 'http://localhost:3000/users/loginOAuth',
  data : {
    id_token
  }
  })
  .done((token)=>{
    let name = profile.getName()
    $('#navname').append(`${name}`)
    localStorage.setItem('token',token)
  
    getCards()
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
    $('#newTodo').empty()
    $('#onProgTodo').empty()
    $('#doneTodo').empty()
    $('#navname').empty()
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
  .done((data)=>{
    localStorage.setItem('token',data.token)
    $('#navname').append(`${data.name}`)
    getCards()
  
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
    let error = msg.responseJSON
    if(typeof error == 'string'){
      $('#err').append(`
        <p style="color: red">${error}</p>
        `)
    } else {
      error.errors.forEach(element => {
        $('#err').append(`
        <p style="color: red">${element.msg}</p>
        `)
      });
    }
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
    getCards()
  
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
})

function getCards(){
  $('#newTodo').empty()
  $('#onProgTodo').empty()
  $('#doneTodo').empty()
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
    todo.forEach(element => {
      if(element.status === 'New') {
        addTodoCards('#newTodo',element,token)
      } else if (element.status === 'On-Progress') {
        addTodoCards('#onProgTodo',element,token)
      } else if (element.status === 'Done'){
        addTodoCards('#doneTodo',element,token)
      }
    });
    todoPage()
  })
  .fail((error)=>{
    console.log(error);
  })
  .always()
}


function addTodoCards(id,element,token){
  $(`${id}`).append(`
  <div class="card" style="width: 18rem;" id="${element._id}">
    <div class="card-body">
      <h6 class="card-title" style="text-align : center">${element.title}</h6>
      <hr>
      <p class="card-subtitle mb-2 text-muted">Created at : ${element.createdAt.slice(0,10)}</p>
      <p class="card-text">Descriptions : ${element.descriptions}</p>
      <p class="card-text">Due date: ${element.dueDate}</p>
      <p class="card-text">Status: ${element.status}</p>
      <div class="row" id="updel">
        <div class="col-sm">
        <a class="btn btn-secondary btn-sm" id="updateStatus" onclick="updateCard('${element._id}','${element.userId}')">Update Status</a>
        </div>
        <div class="col-sm">
        <a href="#" class="btn btn-danger btn-sm" id="delete${element._id}">Delete todo</a>
        </div>
      </div>
      <div id="updatePage${element._id}"></div>
      </div>
    </div>
  </div>
  `)
  $(`#delete${element._id}`).click(function(){
    $.ajax({
      method : 'delete',
      url : 'http://localhost:3000/todos/delete',
      data : {
        _id : element._id,
        userId : element.userId
      },
      headers : {
        token
      }
    })
    .done( ()=>{
      $(`#${element._id}`).empty()
      todoPage()
    })
    .fail((err)=>{
      console.log(err);
    })
    .always(  )
  })
}


function updateCard(id,userId){
  $(`#updatePage${id}`).empty()
  $(`#updatePage${id}`).append(`
  <div id="updateform">
    <form action="" method="post" id="updateTodo${id}">
      <div class="form-group">
        <h6>choose your updated status</h6>
        <select class="form-control-sm" id="updateTodoStatus">
          <option>New</option>
          <option>On-Progress</option>
          <option>Done</option>
        </select>
    </div>
    <hr>
    <button type="button" class="btn btn-primary btn-sm" onclick="updateHandler('${userId}', '${id}')">Update</button>
    </form>
  </div>
  `)
  localStorage.setItem('userId',userId)
  localStorage.setItem('_id',id)
}

const updateHandler = (userId, id)=>{
  let token = localStorage.getItem('token')
  let status = $('#updateTodoStatus').val()
  $.ajax({
    method : 'patch',
    url : 'http://localhost:3000/todos/update',
    data : {
      status,userId,_id: id
    },
    headers : {
      token
    }
  })
  .done((updateUser)=>{
    localStorage.removeItem('userId')
    localStorage.removeItem('_id')
    getCards()
    todoPage()
  })
  .fail((msg)=>{
    console.log(msg);
  })
  .always()
}

$.ajax({
  method : 'get',
  url : 'https://api.weatherbit.io/v2.0/current?city=Jakarta,ID&key=639fd0648ccc40c2966a0f4a31bc341f'
})
.done((weather)=>{
  $('#api').append(`
  <p>${weather.data[0].city_name}</p>
  <p>temp : ${weather.data[0].temp}°c</p>
  <img src="https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png" style="width : 20px ; height : 20px">
  <p>${weather.data[0].weather.description}</p>
  <p>obs time : ${weather.data[0].ob_time}</p>
  `)
})
.fail((err)=>{
  console.log(err);
})