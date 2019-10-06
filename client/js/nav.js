function myTodosbtn(){
  $('.todo.default').show()
  $('.todo.myprojects').hide()
  $('.todo.one-project').hide()
}

function myProjectsbtn(){
  $('.todo.default').hide()
  $('.todo.myprojects').show()
  $('.todo.one-project').hide()
  fetchProjects()
}

function logoutMebtn(){
  $("div.cursor").remove()
  $('.navbari').css("justify-content", "space-between")
  $('.navbari').css("align-items","center")
  $('.landingpage').show()
  $('.toleft').show()
  $('#myTodos').click()
  $('.todo.default').hide()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  localStorage.clear()
}
