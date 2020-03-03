$(document).ready(() => {
  $('#nav').hide()
  $('#linkLogout').hide()
  if(localStorage.getItem('token')) {
    doneLogin(localStorage.getItem('username'))  
    generateTodo()
  }
})

function showRegister() {
  $('#myLogin').hide()
  $('#googleLogin').hide()
  $('#myRegister').show()
}

function showLogin() {

  $('#myLogin').show()
  $('#googleLogin').show()
  $('#myRegister').hide()
}

function myRegister() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/register',
    data: {
      username: $('#registerUsername').val(),
      email: $('#registerEmail').val(),
      password: $('#registerPassword').val()
    }
  })
    .done(data => {
      Swal.fire({
        type: 'success',
        title: 'Register Success!',
        showConfirmButton: false,
        timer: 1500
      })

      showLogin()

    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.message,
      })
    })
}

function onSignIn(googleUser) {
  Swal.showLoading()
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: "post",
    url: 'http://localhost:3000/users/loginGoogle',
    data: {
      token: id_token
    }
  })
    .done(data => {
      Swal.close()
      localStorage.setItem('token', data.token)
      doneLogin(data.username)
      generateTodo()
    })
    .fail(err => {
      console.log(err)
    })
}

function loginUser() {

  Swal.showLoading()
  console.log($('#loginEmail').val())
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/login',
    data: {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val()
    }
  })
    .done(data => {
      Swal.close()
      localStorage.setItem('token', data.token)
      doneLogin(data.username)
      generateTodo()
    })
    .fail(err => alert(err))
}

function signOut() {
  Swal.fire({
    title: `Are you sure?`,
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Log out'
  }).then((result) => {
    if (result.value) {
      var auth2 = gapi.auth2.getAuthInstance()
      localStorage.removeItem('token')
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });

      localStorage.removeItem('token')
      $('#nav').remove()
      $('.main').hide()
      $('.landing').show()
    }
  })
}



function doneLogin(username) {
  $('.navbar').show()
  $('#loginEmail').val('')
  $('#loginPassword').val('')
  $('#myModal').hide()
  $('.modal-backdrop').remove()
  $('.landing').hide()
  $('#navbar').show()
  $('#linkLogout').show()
  $('.main').show()
  $('.listTodo').empty()
  $('#navbar').append(`
  
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm" id="nav">
  <h5 class="my-0 mr-md-auto text-dark" id="user"></h5>
  <div class="my-2 my-md-0 mr-md-3">
    <a href="#" id="linkLogout" onclick="signOut();" class="btn btn-outline-danger">Log out</a>
  </div>
</div>
  `)
  $('#user').append(`
      <h3 style="color: black"><i class="far fa-user" style="color: black"></i> : ${username}</h3>
  `)
}