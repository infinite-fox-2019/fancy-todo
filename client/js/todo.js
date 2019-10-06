function generateTodo() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todos => {

      $.each(todos, function (index, todo) {
        console.log(todo)
        $('.listTodo').append(`
          <div class="card" id="todo${index}">
            <div class="card-body">
              <h5 class="card-title">${todo.todo}</h5>
              <p class="card-text">${todo.description}</p>
              <label for="tag${index}">done? check this box</label>
              <input class="btn btn-md btn-info" type="button" id="edit${index}" value="edit" data-toggle="modal" data-target="#editModal">
              <input class="btn btn-md btn-danger" type="button" id="delete${index}" value="delete">
            </div>
          </div>
        `)

        $(`#delete${index}`).click(() => {

          Swal.fire({
            title: `Delete ${todo.todo}?`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              deleteTodo(todo._id)
              $(`.listTodo #todo${index}`).remove()
              Swal.fire({
                type: 'success',
                title: 'Deleted!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        })

        $(`#edit${index}`).click(() => {
          $('.main').append(`
          <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
      
              <div class="card" style="padding: 2rem;">
              <form>
              <div class="form-group">
              <label>Todo</label>
                <input type="text" class="form-control" id="todoEdit" value="${todo.todo}">
              </div>
              <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" id="descriptionEdit" value="${todo.description}">
              </div>
              <div class="form-group">
                <label>Tag</label>
                <input type="text" class="form-control" placeholder="Add tag" id="tagEdit" value="${todo.tags === undefined ? '' : todo.tags}">
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="statusEdit" name="checkTodo">
                <label class="custom-control-label" for="statusEdit">Finish?</label>
              </div>
              <button type="submit" class="btn btn-info" onclick="updateTodo('${todo._id}'); return false">Edit</button>
              </div>
            </div>
          </div>
        </div>
          `)
        })

      })
    })
    .fail(console.log)
}

function createTodo() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/todos',
    data: {
      todo: $('#todoForm').val(),
      description: $('#descriptionForm').val(),
      tags: $('#tagForm').val()
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todo => {
      $('#todoForm').val('')
      $('#descriptionForm').val('')
      $('#tagForm').val('')
      $('.listTodo').empty()
      generateTodo()
    })
    .catch(console.log)
}

function deleteTodo(id) {
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
}

function updateTodo(id) {

  Swal.showLoading()
  const statusUpdate = $("input[name='checkTodo']:checked").val() === undefined ? false : true
  console.log(statusUpdate)
  $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/todos/${id}`,
    data: {
      todo: $('#todoEdit').val(),
      description: $('#descriptionEdit').val(),
      tags: $('#tagEdit').val(),
      status: statusUpdate
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      Swal.close()
      $('#editModal').hide()
      $('.modal-backdrop').remove()
      $('.listTodo').empty()
      generateTodo()
    })
    .fail(console.log)
}