function hideAll() {
  $("#home-page").hide();
  $("#landing-page").hide();
  $("#login-page").hide();
  $("#register-page").hide();
}

//google sign in
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log('test')
  $.ajax({
    method: "post",
    url: "http://localhost:3000/users/googleSignIn",
    headers: {
      id_token
    }
  })
    .done(data => {
      resetLogin();
      localStorage.setItem("token", data.token);
      hideAll();
      $("#home-page").show();
    })
    .fail(err => {
      resetLogin();
      Swal.fire({
        type: "error",
        text: err.responseJSON.message
      });
    });
}

//reset login form
function resetLogin() {
  $("#login-email").val("");
  $("#login-password").val("");
}

//reset register form
function resetRegister() {
  $("#reg-name").val("");
  $("#reg-email").val("");
  $("#reg-password").val("");
}
