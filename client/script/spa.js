$(document).ready(() => {
  //login checker
  if (!localStorage.getItem("token")) {
    hideAll();
    $("#landing-page").show();
  } else {
    hideAll();
    $("#home-page").show();
    fetchUserTodos();
  }

  //get started click
  $("#getstarted").click(event => {
    event.preventDefault();
    hideAll();
    $("#login-page").show();
  });

  //register click
  $("#linkregister").click(event => {
    event.preventDefault();
    hideAll();
    $("#register-page").show();
  });

  //register click
  $("#linklogin").click(event => {
    event.preventDefault();
    hideAll();
    $("#login-page").show();
  });
});
