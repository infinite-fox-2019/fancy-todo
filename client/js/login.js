$(document).ready(() => {
  // $('#linkLogin').hide()
  $('#linkLogout').hide()
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
      console.log(data.token)
      $('#loginEmail').val('')
      $('#loginPassword').val('')
      $('#myModal').hide()
      $('.modal-backdrop').remove()
      $('#linkLogin').hide()
      $('#linkLogout').show()
      $('.main').show()
      $('.listTodo').empty()
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
      console.log(data)
      console.log(data)
      Swal.close()
      localStorage.setItem('token', data.token)
      $('#loginEmail').val('')
      $('#loginPassword').val('')
      $('#myModal').hide()
      $('.modal-backdrop').remove()
      $('#linkLogin').hide()
      $('#linkLogout').show()
      $('.main').show()
      $('.listTodo').empty()
      generateTodo()
    })
    .fail(err => alert(err))
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  localStorage.removeItem('token')
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
    
  localStorage.removeItem('token')
  $('#linkLogin').show()
  $('#linkLogout').hide()
  $('.main').hide()
}


