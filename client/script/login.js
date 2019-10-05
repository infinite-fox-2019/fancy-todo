function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
  
  var id_token = googleUser.getAuthResponse().id_token;// This is null if the 'email' scope is not present.
  Swal.fire({
    title: `Connecting to server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();
  $.ajax({
      url: `${baseURL}/users/logingoogle`,
      method: 'post',
      data: {
          token: id_token
      }
  })
      .done(({ token }) => {
          localStorage.setItem('token', token)
          $('.landingPage').hide()
          $('.main').show()
          Swal.close()
          Swal.fire('Success!', "Your Account is Logged in!", 'success')
      })
      .fail(err => {
          let msg = "Fail to Login";
          Swal.fire("Error!", msg, "error");
      })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}