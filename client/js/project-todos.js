
let openId;


function getProjectTodos(id) {
  openId = id
  $('.group-detailss').empty()

  $('.asido').empty()
  axios({
    method: 'get',
    url: baseUrl + '/projects/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      const { project, todos } = data
      const members = project.members

      $('.group-detailss').append(`
      <div class="d-flex justify-content-center flex-column align-items-center">
        <h1>${project.name}</h1>
        <h3><i class="fas fa-users"></i> ${members.length + 1}</h3>
        <h4><i class="fas fa-clipboard-list"></i> ${todos.length}</h4>
      </div>
    `)

      // console.log(data)
      // console.log(todos, '<<<<');
      $('.asido').append(`
      <div class="mb-3">
        <h3>Members</h3>
      </div>
      <div>
        <h5><i class="fas fa-crown"></i> ${project.owner.name}</h5>
      </div>`)

      if (localStorage.getItem('_id') === project.owner._id) {
        members.forEach(el => {
          let html = ` 
          <div class="kick" onclick="removeMember('${el._id}')">
            <h5><i class="far fa-times-circle"></i> ${el.name}</h5>
          </div>`
          $('.asido').append(html)
        })
      }
      else {
        members.forEach(el => {
          let html = `
          <div>
            <h5><i class="fas fa-user-alt"></i> ${el.name}</h5>
          </div>`
          $('.asido').append(html)
        })
      }


      todosofGroup(id)
      $('.todo.default').hide()
      $('.todo.myprojects').hide()
      $('.todo.one-project').show()
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: '',
        type: 'error',
        confirmButtonText: 'Oke'
      })
      // console.log(err);
    })
}

function todosofGroup(id) {
  axios({
    method: 'get',
    url: baseUrl + '/projects/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      const { project, todos } = data
      $(`.done-group`).empty()
      $(`.undone-group`).empty()
      todos.forEach(el => {
        // console.log(el, '????');
        if (!el.status) {
          $('.undone-group').append(`
              <div class="onetodo d-flex justify-content-between my-3 mx-2">
                <article class="px-2 py-2">
                  <h4>${el.name}</h4>
                  <p class="m-width">${el.description} <br>
                  <b>created by:</b> ${el.user.name}</p>
                  <p>${el.dueDate}</p>
                </article>
                <aside class="d-flex justify-content-end align-items-center m-2">
                  <button class="btn btn-soft btn-circle" onclick="patchTodoGroup('${el._id}', true)"><i class="fas fa-check" ></i></button>
                  <button class="btn btn-dark btn-circle"  onclick="deleteTodoGroup('${el._id}')"><i class="fas fa-trash"></i></button>
                </aside>
              </div>
              `)
        }
        else {
          $(`.done-group`).append(
            `  
                  <div class="onetodo d-flex justify-content-between my-3 mx-2">
                    <article class="px-2 py-2">
                      <h4>${el.name}</h4>
                      <p class="m-width">${el.description} <br><b>created by:</b> ${el.user.name}</p>
                      <p>${el.dueDate}</p>
                    </article>
                    <aside class="d-flex justify-content-end align-items-center m-2">
                      <button class="btn btn-yel btn-circle" onclick="patchTodoGroup('${el._id}', false)"><i class="fas fa-undo-alt"></i></button>
                      <button class="btn btn-dark btn-circle"  onclick="deleteTodoGroup('${el._id}')"><i class="fas fa-trash"></i></button>
                    </aside>
                </div>
                  `
          )
        }
      })
    })
}

function removeMember(id) {
  // console.log(id)
  axios({
    method: 'patch',
    url: baseUrl + '/projects/' + openId + '/remove',
    data: {
      member: id
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      // console.log(data)
      getProjectTodos(openId)
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: '',
        type: 'error',
        confirmButtonText: 'Oke'
      })
      // console.log(err);
    })
}

function createTodoInGroup() {
  let name = $('#input-title-p').val()
  let description = $('#input-description-p').val()
  let dueDate = $('#input-dueDate-p').val()
  let project = openId
  axios({
    method: 'post',
    url: baseUrl + '/todos',
    data: {
      name, description, dueDate, project
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      // console.log(data)
      todosofGroup(openId)
    })
    .catch(err => {
      let text = err.response.data.msg.join('<br>')
      Swal.fire({
        title: 'Error!',
        html: text,
        type: 'error',
        confirmButtonText: 'Oke'
      })
      // console.log(err);
    })
}

function patchTodoGroup(id, status) {
  axios({
    method: 'patch',
    url: baseUrl + '/projects/' + openId + '/todo/' + id,
    data: {
      status
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(() => {
      getProjectTodos(openId)
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: '',
        type: 'error',
        confirmButtonText: 'Oke'
      })
      // console.log(err);
    })
}

function deleteTodoGroup(id) {
  axios({
    method: 'delete',
    url: baseUrl + '/projects/' + openId + '/todo/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(() => {
      getProjectTodos(openId)
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: '',
        type: 'error',
        confirmButtonText: 'Oke'
      })
      // console.log(err);
    })
}