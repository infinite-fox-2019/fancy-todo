$(document).ready(function() {
  $("#content").hide();

  login();
});

function getAllToDo() {
  $.ajax({
    post: "get",
    url: "http://localhost:3000/todos",
    header
  });

  $("#todoContentBody").append(`
    <div class="col-12 col-md-4 mt-4">
      <div class="card" style="height:13rem">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Card subtitle
          </h6>
          <p class="card-text">
            Bayar kost ssdoa ibu jugaadadadadadasddddddddddddd
            aadadadadadadadad
          </p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  `);
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

        $("#homepage").hide();
        $("#content").show();
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
