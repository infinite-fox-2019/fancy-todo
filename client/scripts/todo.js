const token = localStorage.getItem('token')

function findAllTodo() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/todo',
        headers: { Authorization: token }
    })
    .done(ToDos => {
        console.log(ToDos)
        ToDos.forEach(todo => {
            const title = todo.title
            const description = todo.description || 'No Description'
            const _id = todo._id
            let status = null
            if (todo.status === false) {
                status = 'Pending'
            } else {
                status = "Done"
            }
            $('#ToDos').append(`
            <tr>
            <td>${title}</td>
            <td>${description}</td>
            <td>${status}</td>
            <td><button class="btn btn-outline-dark" id="updateButton" value="${_id}">Update</button>
            <button class="btn btn-outline-dark" id="deleteButton" value="${_id}">Delete</button></td>
            </tr>`)
        })

        $('#updateButton').on('click', function() {
            const _id = this.value
            console.log(_id)
        })

        $('#deleteButton').on('click', function() {
            const _id = this.value
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/todo/${_id}`,
                headers: { Authorization: token }

            })
            .done(data => {
                console.log(data.msg)
            })
            .fail(console.log)
        })
    })
    .fail(console.log)
}

// function findOneTodo() { }

$('#addNewTodoForm').on('submit', (e) => {
    e.preventDefault()
    let status = null
    if ($('#status').val() === 'Done') {
        status = true
    } else {
        status = false
    }
    const data = {
        title: $('#title').val(),
        description: $('#description').val(),
        status,
        user_id: token
    }
    createTodo(data)
})

function createTodo(data) {
    console.log(data)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/todo',
        headers: { Authorization: token },
        data
    })
    .done(toDo => {
        const title = toDo.title
        const description = toDo.description || 'No Description'
        const status = toDo.status
        const _id = toDo._id
        $('#ToDos').prepend(`
        <tr>
        <td>${title}</td>
        <td>${description}</td>
        <td>${status}</td>
        <td><button class="btn btn-outline-dark" id="updateButton" value="${_id}">Update</button>
        <button class="btn btn-outline-dark" id="deleteButton" value="${_id}">Delete</button></td>
        </tr>`)

        $('#updateButton').on('click', function() {
            const _id = this.value
            console.log(_id)
        })

        $('#deleteButton').on('click', function() {
            const _id = this.value
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/todo/${_id}`,
                headers: { Authorization: token }

            })
            .done(data => {
                console.log(data.msg)
            })
            .fail(console.log)
        })
    })
    .fail(console.log)
}

findAllTodo()

