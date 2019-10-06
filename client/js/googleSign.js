function onSignIn(googleUser) {
    console.log('let me in');
    const token = googleUser.getAuthResponse().id_token
    axios({
      method: 'post',
      url: baseUrl + '/users/signGoogle',
      data: {
        googleToken: token
      }
    })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('_id', data._id)

        $("div.cursor").remove()
        $('.landingpage').hide()
        $('.toleft').hide()
        $('.navbari').css("justify-content", "space-around")
        $('.navbari').css("align-items","center")
        $('.navbari').append(`
        <div class="cursor c-white" id="myTodos" onclick="myTodosbtn()"><h2>Todos</h2></div>
        <div class="cursor c-white" id="myProjects" onclick="myProjectsbtn()"><h2>Projects</h2></div>
        <div class="cursor c-white" id="logoutMe" onclick="logoutMebtn()"><h2>Logout</h2></div>`)
        $('.todo.projects').hide()
        $('.todo.one-project').hide()
        $('.aftersignIn').show()
        $('.todo.default').show()
      })
      .catch(err => {
          console.log(err);
      })
  }
