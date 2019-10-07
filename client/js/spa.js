$(document).ready(() => {
  //login checker
  goHome();

  $(".home-button").click(event => {
    event.preventDefault();
    goHome();
  });

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

  $(".aGoHome").click(event => {
    event.preventDefault();
    goHome();
  });
  $(".aGoGroup").click(event => {
    event.preventDefault();
    goGroup();
  });
});
