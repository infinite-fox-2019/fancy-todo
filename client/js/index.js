'use strict'

const baseUrl = 'https://server-todone.andreassosilo.co'

// Check if all document ready
$(document).ready(function () {
  console.log('toDone app ready!')
  currentPage()

  // Login using GitHub OAuth
  $('#github-button').on('click', function () {
    // Initialize with your OAuth.io app public key
    OAuth.initialize('gZeK0rjdjMpH70JACRM_kaKLUIc')
    // Use popup for OAuth
    OAuth.popup('github').then(github => {
      console.log(github)
      // Retrieves user data from oauth provider
      console.log(github.me())
    })
  })

  // Link from login form to register form
  $('#register-button').click(function () {
    console.log('test register')
    event.preventDefault()
    showRegister()
  })

  // Link from register form to login form
  $('#login-button').click(function () {
    event.preventDefault()
    showLogin()
  })

  // Submit register form button
  $('#register-button2').click(function () {
    event.preventDefault()
    register()
  })

  // Submit login form button
  $('#login-button2').click(function () {
    event.preventDefault()
    login()
  })

  // Click logout button
  $('#logout-nav').click(function () {
    console.log('logout button clicked')
    event.preventDefault()
    logout()
  })

  // Create to-do button
  $('#createTodoButton').click(function () {
    event.preventDefault()
    showCreate()
  })

  // Submit values to server to create new todo when submit button is clicked
  $('#saveCreateModal').click(function () {
    event.preventDefault()
    createTodo()
  })
})

// Select the current page, by default show login form page
function currentPage () {
  if (localStorage.getItem('token')) {
    if (localStorage.currentPage === 'viewTodo') {
      showTodo()
    } else if (localStorage.currentPage === 'archive') {
      showArchive()
    } else if (localStorage.currentPage === 'create') {
      showCreate()
    } else {
      showTodo()
    }
  } else {
    if (localStorage.currentPage === 'login') {
      showLogin()
    } else if (localStorage.currentPage === 'register') {
      showRegister()
    } else {
      showLogin()
    }
  }
}

// Show login form
function showLogin () {
  localStorage.setItem('currentPage', 'login')
  $('#register-form').hide()
  $('#dashboard').hide()
  $('#createModal').hide()
  $('#content-nav').empty()
  $('#content-nav').append(`
    <li class="nav-item">
      <a class="nav-link" href="#" id="login-nav" onclick="showLogin()">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" id="register-nav" onclick="showRegister()">Register</a>
    </li>`
  )
  $('#login-email').val('')
  $('#login-password').val('')
  $('#login-form').show()
}

// Show register form
function showRegister () {
  localStorage.setItem('currentPage', 'register')
  $('#login-form').hide()
  $('#dashboard').hide()
  $('#createModal').hide()
  $('#deleteModal').hide()
  $('#content-nav').empty()
  $('#content-nav').append(`
    <li class="nav-item">
      <a class="nav-link" href="#" id="login-nav" onclick="showLogin()">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" id="register-nav" onclick="showRegister()">Register</a>
    </li>`
  )
  $('#register-name').val('')
  $('#register-email').val('')
  $('#register-password').val('')
  $('#register-form').show()
}

// Register a new user
function register () {
  $.ajax({
    url: `${baseUrl}/users/register`,
    method: 'POST',
    data: {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
    .done(function (response) {
      console.log('New user successfully created')
      showLogin()
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
      $('#errorRegister').empty()
      jqXHR.responseJSON.forEach(err => {
        $('#errorRegister').append(`
        <div class="alert alert-danger alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> ${err}
        </div>
      `)
      })
    })
}

// Login to the server
function login () {
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(function (response) {
      localStorage.setItem('token', response.token)
      console.log('User successfully signed in')
      currentPage()
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
      $('#errorLogin').empty().append(`
        <div class="alert alert-danger alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> ${jqXHR.responseJSON}
        </div>
      `)
    })
}

// Login to server using Google Account (OAuth)
function onSignIn (googleUser) {
  const profile = googleUser.getBasicProfile()
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${baseUrl}/users/logingoogle`,
    method: 'POST',
    data: {
      id_token: id_token
    }
  })
    .done(function (response) {
      console.log(response)
      localStorage.setItem('token', response.token)
      console.log('User successfully signed in')
      currentPage()
    })
    .fail(err => {
      console.log(err)
    })
}

function logout () {
  const auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out successfuly.')
  })
  localStorage.removeItem('token')
  showLogin()
}

// Show to-do list
function showTodo () {
  localStorage.setItem('currentPage', 'viewTodo')
  $('#login-form').hide()
  $('#register-form').hide()
  $('#createModal').hide()
  $('#deleteModal').hide()
  $('#content-nav').empty().append(`
    <li class="nav-item">
      <a class="nav-link" href="#" id="create-nav" onclick="showCreate()">Create to-do</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" id="view-nav" onclick="showTodo()">View to-do</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" id="archive-nav" onclick="showArchive()">Archive</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" id="logout-nav" onclick="logout()">Logout</a>
    </li>`
  )
  $('#dashboard').show()
  readTodo()
  $('#createNew').show()
  $('#todo-list').show()
}

function readTodo (id, tag, find) {
  $.ajax({
    url: `${baseUrl}/todos?status=false`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function (response) {
      console.log('Reading To-Do.')
      $('#createNew').show()
      $('#todo-header').empty()
      $('#todo-list').empty()

      $('#todo-header').append(
        `
        <tr>
            <th style="width: 20%">To-do activity</th>
            <th style="width: 25%">Description</th>
            <th style="width: 20%">Due date</th>
            <th style="width: 10%">Urgent</th>
            <th style="width: 25%">Actions</th>
        </tr>
        `
      )

      response.forEach((value, index) => {
        const date = new Date(value.dueDate).toISOString().slice(0, 10)
        $('#todo-list').append(
          `
          <tr>
              <td>${value.title}</td> 
              <td>${value.description}</td> 
              <td>${date}</td>
              <td>${(value.urgency === false) ? 'No' : 'Yes'}</td>
              <td>
                  <button type="button" class="btn btn-success btn-block" onclick="doneTodo('${value._id}', 1)"
                      id="doneTodoButton"><i class="fas fa-thumbs-up"></i> Done</button>
                  <button type="button" class="btn btn-warning btn-block" id="editTodoButton${index}" data-toggle="modal"
                      data-target="#editModal"><i class="fas fa-edit"></i> Edit</button>
                  <button type="button" class="btn btn-danger btn-block" data-toggle="modal"
                      data-target="#deleteModal" id="deleteTodoButton" onclick="showDelete('${value._id}')"><i class="fas fa-trash-alt"></i>
                      Delete</button>
              </td>
          </tr>
          `
        )
        $(`#editTodoButton${index}`).click(() => {
          // console.log('masuk broo!!!')
          showEdit(value._id, value.title, value.description, value.dueDate, value.urgency)
        })
      })
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
    })
}

// Create a new to-do when create to-do button clicked
function createTodo () {
  $.ajax({
    url: `${baseUrl}/todos`,
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#titleCreateModal').val(),
      description: $('#descriptionCreateModal').val(),
      dueDate: $('#dueDateCreateModal').val(),
      urgency: $('#urgencyCreateModal').is(':checked')
    }
  })
    .done(function (response) {
      console.log('New to-do successfully created.')
      console.log(response)
      readTodo()
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
    })
}

// Show create model when create new to-do button is clicked
function showCreate () {
  localStorage.setItem('currentPage', 'create')
  $('#login-form').hide()
  $('#register-form').hide()
  $('#deleteModal').hide()
  $('#createNew').show()

  $('#titleCreateModal').val('')
  $('#descriptionCreateModal').val('')
  $('#dueDateCreateModal').val('')
  $('#urgencyCreateModal').val('')
  $('#createModal').show()
}

function deleteTodo (id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function (response) {
      console.log(`Todo with id ${id} successfully deleted`)
      readTodo()
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
    })
}

// Show delete modal when create new to-do button is clicked
function showDelete (id) {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#createModal').hide()
  $('#deleteModal').show()
  $('#deleteModalFooter').empty().append(`
    <button type="button" class="btn btn-success" id="yesDeleteModal" onclick="deleteTodo('${id}')" data-dismiss="modal">Yes</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
}

// Show edit modal when edit to-do button is clicked
function showEdit (id, title, description, dueDate, urgency) {
  console.log(urgency)
  $('#login-form').hide()
  $('#register-form').hide()
  $('#createModal').hide()
  $('#deleteModal').hide()
  $('#editModal').show()
  $('#editModalForm').empty().append(`
    <div class="form-group" style="color: #000000">
      <label for="titleEditModal">To-Do:</label>
      <input type="text" class="form-control" id="titleEditModal" value="${title}"
          name="title">
    </div>
    <div class="form-group" style="color: #000000">
      <label for="descriptionEditModal">Description:</label>
      <input type="text" class="form-control" id="descriptionEditModal" value="${description}"
          name="description">
    </div>
    <div class="form-group" style="color: #000000">
      <label for="dueDateEditModal">Date:</label>
      <input value="${new Date(dueDate).toISOString().split('T')[0]}" type="date" class="form-control" id="dueDateEditModal" name="date">
    </div>
    <div class="form-check-inline">
      <label class="form-check-label" for="urgencyEditModal"
          style="color: #000000">Urgent:</label>
      <div class="container" style="color: #000000">
          <input type="checkbox" class="form-check-input" name="urgency" id="urgencyEditModal"
              style="color: #000000">Yes
      </div>
    </div>`
  )
  if (urgency) $('#urgencyEditModal').prop('checked', true)
  else $('#urgencyEditModal').prop('checked', false)
  $('#editModalFooter').empty().append(`
  <button type="button" class="btn btn-success" id="saveEditModal" onclick="editTodo('${id}')" data-dismiss="modal">Save</button>
  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
  )
}

// Set status to-do to "done"
function doneTodo (id, value) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'PATCH',
    data: {
      status: value
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function (response) {
      if (value === 0) {
        console.log(`Todo with id ${id} is undoned`)
        readArchive()
      } else if (value === 1) {
        console.log(`Todo with id ${id} is completed`)
        readTodo()
      }
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
    })
}

// Show archive page for todos that already finished
function showArchive () {
  localStorage.setItem('currentPage', 'archive')
  $('#login-form').hide()
  $('#register-form').hide()
  $('#createModal').hide()
  $('#deleteModal').hide()
  $('#createNew').hide()
  $('#content-nav').empty().append(`
    <li class="nav-item">
      <a class="nav-link" href="#" id="create-nav" onclick="showCreate()">Create to-do</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" id="view-nav" onclick="showTodo()">View to-do</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" id="archive-nav" onclick="showArchive()">Archive</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" id="logout-nav" onclick="logout()">Logout</a>
    </li>`
  )
  $('#dashboard').show()
  readArchive()
  $('#todo-list').show()
}

// Read todos that have already been done, show it to the table in archive
function readArchive () {
  $.ajax({
    url: `${baseUrl}/todos?status=true`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function (response) {
      console.log('Reading archive.')
      $('#createTodoButton').hide()
      $('#todo-header').empty()
      $('#todo-list').empty()

      $('#todo-header').append(
        `
        <tr>
            <th style="width: 20%">To-do activity</th>
            <th style="width: 20%">Description</th>
            <th style="width: 20%">Due date</th>
            <th style="width: 20%">Completed date</th>
            <th style="width: 20%">Actions</th>
        </tr>
        `
      )

      response.forEach((value, index) => {
        const dueDate = new Date(value.dueDate).toISOString().slice(0, 10)
        const completedDate = new Date(value.updatedAt).toISOString().slice(0, 10)
        $('#todo-list').append(
          `
        <tr>
            <td>${value.title}</td> 
            <td>${value.description}</td> 
            <td>${dueDate}</td>
            <td>${completedDate}</td>
            <td>
                <button type="button" class="btn btn-warning btn-block" onclick="doneTodo('${value._id}', 0)"
                    id="doneTodoButton"><i class="fas fa-thumbs-up"></i> Undone</button>
                <button type="button" class="btn btn-danger btn-block" data-toggle="modal"
                    data-target="#deleteModal" id="deleteTodoButton" onclick="showDelete('${value._id}')"><i class="fas fa-trash-alt"></i>
                    Delete</button>
            </td>
        </tr>
        `
        )
      })

      if (response.length === 0) {
        $('#archiveList').html('<p>Your archive is empty</p>')
      }
    })
    .fail(function (jqXHR, status) {
      console.log(jqXHR.responseJSON)
    })
}

// Edit todo information
function editTodo (id) {
  console.log($('#urgencyEditModal').is(':checked'), 'ini element')
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: 'PATCH',
    data: {
      title: $('#titleEditModal').val(),
      description: $('#descriptionEditModal').val(),
      dueDate: $('#dueDateEditModal').val(),
      urgency: ($('#urgencyEditModal').is(':checked'))
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function (response) {
      console.log(`Todo with id ${id} updated.`)
      readTodo()
    })
    .fail(function (jqXHR, textStatus) {
      console.log(jqXHR.responseJSON)
    })
}
