$(document).ready(function(){
  
  if(localStorage.getItem("access_token")){
    console.log("You Successfuly Login")
    renderHomePage()
    renderProjectPage()
  } 
  else{
    renderLoginPage()
  }
  
  login()
  register()
})

var baseURL = "http://localhost:3000"

function parseMonth (num) {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
  return months[`${num}`]
}

function parseDay (num) {
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  return days[`${num}`]
}

function parseDate (dateD) {
  let dateDate = new Date(dateD)
  let date = dateDate.getDate()
  let month = dateDate.getMonth() + 1
  let year = dateDate.getFullYear()
  return `${year}/${month}/${date}`
}

// Render Page Function
function renderLoginPage () {
  $("#loginPage").show()
  $("#registerPage").hide()
  $("#nav-bar").hide()
  $("#userHomeTodo").hide()
  $("#projectHomeTodo").hide()
}

function renderRegisterPage () {
  $("#registerPage").show()
  $("#loginPage").hide()
}

function renderHomePage () {
  $("#nav-bar").show()
  $("#userHomeTodo").show()
  $("#projectHomeTodo").hide()
  $("#loginPage").hide()
  $("#registerPage").hide()
  fetchUserTodo()
}

function renderProjectPage () {
  $("#nav-bar").show()
  $("#projectHomeTodo").show()
  $("#userHomeTodo").hide()
  $("#loginPage").hide()
  $("#registerPage").hide()
  // fetch todo here
}

// Asyncronus Function
function login () {
  $("#loginForm").submit(function(event){
    event.preventDefault()
    Swal.fire({
      heightAuto: false,
      text: "Processing your login...",
      onOpen: Swal.showLoading
    })
    let email = $("#loginEmail").val()
    let password = $("#loginPassword").val()
    $.ajax({
      url: `${ baseURL }/users/login`,
      method: 'post',
      data: {
        email,
        password
      }
    })
    .done(function(data){
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("name", data.name)
      renderHomePage()
      Swal.close()
    })
    .fail(function(err){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
        heightAuto: false
      })
    })

  })
}

function register () {
  $("#registerForm").submit(function(event){
    event.preventDefault()
    Swal.fire({
      heightAuto: false,
      text: "Processing your data...",
      onOpen: Swal.showLoading
    })
    let email = $("#registerEmail").val()
    let password = $("#registerPassword").val()
    let name = $("#registerName").val()
    $.ajax({
      url: `${ baseURL }/users/register`,
      method: 'post',
      data: {
        email,password,name
      }
    })
    .done(function(data){
      console.log(data)
      renderLoginPage()
      Swal.fire({
        type: 'success',
        title: 'Register Completed!',
        text: "Please login to continue.",
        heightAuto: false
      })
    })
    .fail(function(err){
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors[0],
        heightAuto: false
      })
    })
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${ baseURL }/users/googleSignIn`,
    method: 'post',
    data: {
      id_token
    }
  })
  .done(function(data){
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("name", data.name)
    renderHomePage()
  })
  .fail(function(err){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseText,
      heightAuto: false
    })
  })
}

function logout () {
  localStorage.removeItem("access_token")
  localStorage.removeItem("name")
  var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  $("#loginEmail").val('')
  $("#loginPassword").val('')
  renderLoginPage()
  $(".navbar-collapse").collapse('hide')
}

function fetchUserTodo () {
  $("#welcome-world-username").empty()
  $("#welcome-world-username").append(`${localStorage.getItem("name")}`)
  
  $.ajax({
    method: 'get',
    url: `${ baseURL }/todos`,
    headers: {
      authorization: localStorage.getItem('access_token')
    }
  })
  .done(function(data){
    console.log(data)
    $("#todo-place").empty()
    for(let i = 0; i < data.length; i++){
      let dueDate = new Date(data[i].dueDate)
      $("#todo-place").append(`
      <div class="card mb-2" onclick="updateTodo('${data[i]._id}')" style="cursor: pointer;">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-12 col-md-10">
              <p class="m-0">
                <b class="text-palegreen">
                  ${data[i].title}
                </b>
              </p>
              <p class="mt-1 mb-0 text-muted">
                ${parseDay(dueDate.getDay())}, ${dueDate.getDate()} ${parseMonth(dueDate.getMonth())} ${dueDate.getFullYear()} 
              </p>
            </div>
            <div class="col-12 col-md-2 text-md-center mt-1">
              <span class="badge badge-pill badge-secondary">${localStorage.getItem("name")}</span>
            </div>
          </div>
        </div>
      </div>
      `)
    }
  })
  .fail(function(err){
    console.log(err.responseJSON)
  })
}

var todoForUpdate

function updateTodo (id) {
  console.log(id)
  todoForUpdate = id
  $.ajax({
    method:'get',
    url: `${ baseURL }/todos/${id}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTitleTodo").val(data.title)
    $("#editDescriptionTodo").val(data.description)
    $("#editDateTodo").val( parseDate(data.dueDate) )
    $("#editTodo").modal('show')
  })
  .fail(function(err){
    console.log(err)
  })
}

function updateTodoProcess () {
  $.ajax({
    method: 'patch',
    url: `${ baseURL }/todos/${todoForUpdate}`,
    data: {
      title: $("#editTitleTodo").val(),
      description: $("#editDescriptionTodo").val(),
      dueDate: $("#editDateTodo").val()
    },
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTodo").modal('hide')
    renderHomePage()
  })
  .fail(function(err){
    console.log(err)
  })
}

function createTodo () {
  $.ajax({
    method: 'post',
    url: `${ baseURL }/todos`,
    data: {
      title: $("#titleNewTodo").val(),
      description: $("#descriptionNewTodo").val(),
      dueDate: $("#dueDateNewTodo").val()
    },
    headers: {
      authorization:localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    renderHomePage()
    $("#createNewTodo").modal('hide')
    $("#titleNewTodo").val(''),
    $("#descriptionNewTodo").val(''),
    $("#dueDateNewTodo").val('')
  })
  .fail(function(err){
    console.log(err)
  })
}

function deleteTodo () {
  $.ajax({
    method: 'delete',
    url: `${ baseURL }/todos/${todoForUpdate}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTodo").modal("hide")
    renderHomePage()
  })
  .fail(function(err){
    console.log(err)
  })
}