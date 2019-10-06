$(document).ready(function() {

  $("#content").hide()

  login()
});

function login(){

  $("#loginForm").on("submit", function(e){
    e.preventDefault()

    let email = $("#exampleInputEmail1").val()
    let password = $("#exampleInputPassword1").val()

    console.log(email,password)

    
  
  
  
  
  })
}
