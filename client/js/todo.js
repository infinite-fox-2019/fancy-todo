function deleteTodo(id) {
  axios({
    method: 'delete',
    url: baseUrl + '/todos/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      // console.log(data)
      personalTodo()
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

function changeStatus(id, status) {
  axios({
    method: 'patch',
    url: baseUrl + '/todos/' + id,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      status: status
    }
  })
    .then(data => {
      // console.log(data);
      personalTodo()
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

function createTodo() {
  // console.log('hereee');
  let dueDate = $('#input-dueDate').val()
  let description = $('#input-description').val()
  let name = $('#input-title').val()
  // console.log({
  //   name,
  //   description,
  //   dueDate
  // });
  axios({
    method: 'post',
    url: baseUrl + '/todos/',
    data: {
      name, description, dueDate
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      // console.log(data)
      personalTodo()
    })
    .catch(err => {
      let text = err.response.data.msg.join('<br>')
      Swal.fire({
      title: 'Error!',
      html: text,
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err.response);
    })
  $('textarea').val('')
  $('input').val('')
  $("#myTodos").click()
}

function getJoke() {
  axios({
    method: 'get',
    url: baseUrl + '/apis',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      $('.apis').append(`
        <div class="d-flex flex-column justify-content-center mx-2">
        <img src="${data.gif}" alt="" srcset="">
        <article class="my-4">
        <h2>${data.joke}</h2>
        </article>
        </div>
        `)
      // console.log(data);
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

function todoDetails(id) {
  $('#editTodo').empty()
  axios({
    method: 'get',
    url: baseUrl + '/todos/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      let todo = data.todo
      let duedate = new Date(todo.dueDate).toLocaleDateString()
      // console.log(duedate);
      $('#editTodo').append(`
      <label>Title</label>
        <input type="text" class="form-control" id="input-titleUpdate" value="${todo.name}"
        required="true">
      <label>Description</label>
        <textarea class="form-control" id="input-descriptionUpdate" rows="3" required="true" 
        >${todo.description}</textarea>
      <div class="form-group">
        <label>Due Date</label>
          <input type="date" class="form-control" id="inputDueDateUpdate"
            value="${duedate})}" required>
      </div>
      <div class="form-group d-flex justify-content-end">
          <button type="submit" class="btn btn-dark mt-4 mb-3 mx-1" data-dismiss="modal"
              onclick="editTodo('${id}')">Submit</button>
      </div>`
      )
      // console.log(data);
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err)
    })
}


function editTodo(id) {
  let name = $('#input-titleUpdate').val()
  let description = $('#input-descriptionUpdate').val()
  let dueDate = $('#inputDueDateUpdate').val()
  // console.log({
  //   name, description, dueDate
  // })
  axios({
    method: 'put',
    url: baseUrl + '/todos/' + id,
    data: {
      name, description, dueDate
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      personalTodo()
      // console.log(data);
    })
    .catch(err => {
     
      Swal.fire({
      title: 'Error!',
      html: text,
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err);
    })
}