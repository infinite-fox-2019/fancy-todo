function deleteTodo(id) {
  axios({
    method: 'delete',
    url: baseUrl + '/todos/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      console.log(data)
      personalTodo()
    })
    .catch(err => {
      console.log(err);
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
      console.log(data);
      personalTodo()
    })
    .catch(err => {
      console.log(err);
    })
}

function createTodo() {
  console.log('hereee');
  let dueDate = $('#input-dueDate').val()
  let description = $('#input-description').val()
  let name = $('#input-title').val()
  console.log({
    name,
    description,
    dueDate
  });
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
      console.log(data)
      personalTodo()
    })
    .catch(err => {
      console.log(err.response);
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
      console.log(data);
    })
    .catch(err => {
      console.log(err);
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
      console.log(duedate);
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
      console.log(data);
    })
    .catch(err => {
      console.log(err)
    })
}


function editTodo(id) {
  let name = $('#input-titleUpdate').val()
  let description = $('#input-descriptionUpdate').val()
  let dueDate = $('#inputDueDateUpdate').val()
  console.log({
    name, description, dueDate
  })
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
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
}

{/*todo:
createdAt: "2019-10-06T17:38:16.803Z"
description: "234567543"
dueDate: "+275760-03-11T17:00:00.000Z"
name: "test"
status: false
updatedAt: "2019-10-06T17:38:16.803Z"
user: "5d99f59761cd87197dd57643"
_id: "5d9a2688bfec2c21854b37dd"  */}