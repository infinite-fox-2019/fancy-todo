$(document).ready(function() {
  $("#content").hide();

  if(localStorage.getItem('token')){
    console.log('masuk')
    getAllToDo()
    $("#homepage").hide();
    $("#content").show();
  }
  else{
    login();
    $("#homepage").show();
    $("#content").hide();
  }

});

function getAllToDo() {
  $.ajax({
    post: "get",
    url: "http://localhost:3000/todos",
    headers: {
      "Authorization":localStorage.getItem('token')
    }
  })
  .done(data => {
    console.log(data)
    $("#todoContentBody").empty();
    for(let i = 0 ; i < data.length; i++){
      let event = new Date(data[i].dueDate);
      $("#todoContentBody").append(`
        <div class="col-12 col-md-4 mt-4">
          <div class="card" style="height:13rem">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                ${(event).toLocaleString('en-GB', { timeZone: 'UTC' })}
              </h6>
              <p class="card-text">
                ${data[i].description}
              </p>
              <a href="#" class="card-link">Done</a>
              <a href="#" class="card-link">Delete</a>
            </div>
          </div>
        </div>
      `)
    }
  })
  .fail(err => {
    if (!err.responseJSON) {
      swal("Connection lost", "Something wrong with the server", "error");
    } else {
      swal(err.responseJSON.message, "", "error");
    }
  });
}

function getAllDoneToDo(){
  $.ajax({
    post: "get",
    url: "http://localhost:3000/todos/done",
    headers: {
      "Authorization":localStorage.getItem('token')
    }
  })
  .done(data => {
    $("#todoContentBody").empty();
    console.log(data)
    for(let i = 0 ; i < data.length; i++){
      let event = new Date(data[i].dueDate);
      let idString = data[i]._id
      $("#todoContentBody").append(`
        <div class="col-12 col-md-4 mt-4">
          <div class="card" style="height:13rem">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                ${(event).toLocaleString('en-GB', { timeZone: 'UTC' })}
              </h6>
              <p class="card-text">
                ${data[i].description}
              </p>
              <a href="#" class="card-link">Done</a>
              <button type="button" onclick="removeToDo('${idString}');" class="btn btn-primary btn-sm">Delete</button>
              
            </div>
          </div>
        </div>
      `)
    }
  })
  .fail(err => {
    if (!err.responseJSON) {
      swal("Connection lost", "Something wrong with the server", "error");
    } else {
      swal(err.responseJSON.message, "", "error");
    }
  });
}

function getAllUndoneToDo(){
  $.ajax({
    post: "get",
    url: "http://localhost:3000/todos/undone",
    headers: {
      "Authorization":localStorage.getItem('token')
    }
  })
  .done(data => {
    $("#todoContentBody").empty();
    console.log(data)
    for(let i = 0 ; i < data.length; i++){
      let event = new Date(data[i].dueDate);
      $("#todoContentBody").append(`
        <div class="col-12 col-md-4 mt-4">
          <div class="card" style="height:13rem">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                ${(event).toLocaleString('en-GB', { timeZone: 'UTC' })}
              </h6>
              <p class="card-text">
                ${data[i].description}
              </p>
              <a href="#" class="card-link">Done</a>
              <a href="#" class="card-link">Delete</a>
            </div>
          </div>
        </div>
      `)
    }
  })
  .fail(err => {
    if (!err.responseJSON) {
      swal("Connection lost", "Something wrong with the server", "error");
    } else {
      swal(err.responseJSON.message, "", "error");
    }
  });
}

function removeToDo(id){
  console.log('masuk hapus')
  console.log(typeof id)
  $.ajax({
    post: "delete",
    url: `http://localhost:3000/todos/${String(id)}`,
    headers: {
      "Authorization":localStorage.getItem('token')
    }
  })
  .done(() => {
    getAllToDo()
    $("#homepage").hide();
    $("#content").show();
  })
  .fail(err => {
    if (!err.responseJSON) {
      swal("Connection lost", "Something wrong with the server", "error");
    } else {
      swal(err.responseJSON.message, "", "error");
    }
  })
}

function login() {
  $("#loginForm").on("submit", function(e) {
    e.preventDefault();

    let email = $("#exampleInputEmail1").val();
    let password = $("#exampleInputPassword1").val();

    console.log(email, password);

    $.ajax({
      method: "post",
      url: "http://localhost:3000/users/login",
      data: {
        email,
        password
      }
    })
      .done(token => {
        localStorage.setItem("token", token);

        let remaining_seconds = 50000
        sessionStorage.setItem('rmng_time', remaining_seconds);

        $("#homepage").hide();
        $("#content").show();
        getAllToDo()
      })
      .fail(err => {
        if (!err.responseJSON) {
          swal("Connection lost", "Something wrong with the server", "error");
        } else {
          swal(err.responseJSON.message, "", "error");
        }
      });
  });
}

function logout() {
  localStorage.removeItem("token");
  $("#homepage").show();
  $("#content").hide();
}
