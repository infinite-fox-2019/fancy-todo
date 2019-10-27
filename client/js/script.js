const url = `http://35.240.249.106`

$(document).ready(() => {

    if(!localStorage.getItem('token')){
        $('#loginPage').show()
    } else{
        $('#loginPage').hide()
        // homeTodo()
        fetchTodo()
        $('#home').show()
        
    }

})

function register() { 
    let data = $('#getRegisterForm input').serialize()
        $.ajax({
            url: `${url}/users/register`,
            method: 'post',
            data: data
        })
            .done(response => {
                localStorage.setItem('token', response.token)
                userLogged()
            })
            .fail(err => {
                let msg = err.responseJSON
                let text = ''
                msg.forEach(el => {
                    text += el + ', '
                });

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text,
                })
            })
    
}

function homeTodo(){
    $('#home').append(`
    <div>
        <div class="d-flex m-3" >
            <button type="button" class="btn-addtodo" data-toggle="modal" data-target="#addTodoModal">add todo</button>
        </div>

        <!-- Modal -->
            <div class="modal fade" id="addTodoModal" tabindex="-1" role="dialog" aria-labelledby="addTodoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="addTodoModalLabel">Add New Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    <form method="POST" class="myFrom" id="addTodo">
                        <input name="title" type="text" placeholder="Enter title...">
                        <textarea class="ml-1" rows="4" cols="50" name="description" placeholder="Enter description..."></textarea>
                        <select class="ml-1 bg-light" name="status">
                            <option value="UNCOMPLETE">UNCOMPLETE</option>
                            <option value="COMPLETE">COMPLETE</option>
                        </select>   
                        <input name="dueDate" type="date" na>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onclick="createTodo()"  class="btn btn-primary" data-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>

        <div id="todo-card" class="d-flex flex-wrap todo-card-container" ></div>
    </div>
    `)
}

function login(){
    let data = $('#getLoginFrom input').serialize()
        $.ajax({
            url: `${url}/users/login`,
            method: 'post',
            data: data
        })
            .done(response => {
                localStorage.setItem('token', response.token)
                $('#loginPage').hide()
                $('#home').show()
            })
            .fail(err => {
                let msg = err.responseJSON
                let text = ''
                msg.forEach(el => {
                    text += el + ', '
                });

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text,
                })
            })
}

function logout(){
    localStorage.removeItem('token');
    $('#home').hide()
    $('#loginPage').show()
}

function dateFormat(date) {
    let event = new Date(date);
    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return event.toLocaleDateString("en-US", options);
  }

function fetchTodo(){
    $.ajax({
        url: `${url}/todos`,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(todos => {
            if (todos.length) {
                todos.forEach(todo => {
                    todoCard(todo)
                });
            }
        })
        .fail(err => {
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })
}

function todoCard(todo){

    $('#todo-card').append(`
    <div class="todo-card d-flex flex-column justify-content-between">
        <div class="todo-title">
            <p class="text-center">${todo.title}</p>
        </div>
        <div class="todo-content">
            <p>${todo.description}</p>
        </div>
        <div class="todo-footer d-flex align-items-center justify-content-between">
            <div>
                <span class="text-white">${todo.status}</span>
                <p>due date: ${dateFormat(todo.dueDate)}</p>
            </div>
            <div>
                <i data-toggle="modal" data-target="#editTodoModal${todo._id}" class="far fa-edit"></i>
                <i onclick="deleteTodo('${todo._id}')" class="fas fa-trash"></i>
            </div>
        </div>
    </div>


    <div class="modal fade" id="editTodoModal${todo._id}" tabindex="-1" role="dialog" aria-labelledby="addTodoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header ">
                <h5 class="modal-title" id="addTodoModalLabel">Add New Todo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                
                <form method="POST" class="myFrom" id="EditTodo${todo._id}">
                    <input value="${todo.title}" name="title" type="text" placeholder="Enter title...">
                    <textarea class="ml-1" rows="4" cols="50" name="description" placeholder="Enter description...">${todo.description}</textarea>
                    <select class="ml-1 bg-light" name="status">
                        <option value="UNCOMPLETE">UNCOMPLETE</option>
                        <option value="COMPLETE">COMPLETE</option>
                    </select>   
                    <input value="${todo.dueDate}" name="dueDate" type="date" na>
                </form>

            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onclick="updateTodo('${todo._id}')" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
            </div>
            </div>
        </div>
    </div>
    `)
}

function deleteTodo(todoId){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: `${url}/todos/${todoId}`,
                method: 'delete',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .done(response => {
                $('#todo-card').html('')
                fetchTodo()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            })
            .fail(err => {
                let msg = err.responseJSON
                let text = ''
                msg.forEach(el => {
                    text += el + ', '
                });

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text,
                })
            })
        }
      })
}

function createTodo(){
    let data = $('#addTodo textarea').serialize() + '&'
        data += $('#addTodo input').serialize()

    $.ajax({
        url: `${url}/todos`,
        method: 'post',
        data: data,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(todo => {
            $('#todo-card').html('')
            fetchTodo()
            Swal.fire(
                'Success',
                'Success add new todo.',
                'success'
              )
        })
        .fail(err => {
            let msg = err.responseJSON
            let text = ''
            msg.forEach(el => {
                text += el + ', '
            });

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text,
            })
        })

}



function updateTodo(todoId){
    let data = $(`#EditTodo${todoId} textarea`).serialize() + '&'
    data += $(`#EditTodo${todoId} select`).serialize() + '&'
    data += $(`#EditTodo${todoId} input`).serialize()

    $.ajax({
        url: `${url}/todos/${todoId}`,
        method: 'patch',
        data: data,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .done(todo => {
        fetchTodo()
        $('#todo-card').html('')
        // Swal.fire(
        //     'Success',
        //     'Success edit todo.',
        //     'success'
        //   )
    })
    .fail(err => {
        console.log(err);
        let msg = err.responseJSON
        let text = ''
        msg.forEach(el => {
            text += el + ', '
        });

        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text,
        })
    })
}