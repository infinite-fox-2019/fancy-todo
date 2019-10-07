function findTodo() {
    $.ajax({
        url: `${baseUrl}/todos/todo`,
        method: `get`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos => {
            console.log(todos)
            showAllEvent()
            showMyEvent()
            $(".form-add-todo").slideUp("slow");
            $('.todo-box').empty()
            todos.forEach(el => {
                $('.todo-box').append(`
                <div class="card-todo cards">
                    <a href="#" class="task${el._id}">${el.title}</a>
                </div>`)
                $(`.task${el._id}`).on('click', function (e) {
                    e.preventDefault()
                    localStorage.setItem('todoId', el._id)
                    $(`.todo-detail`).slideDown()
                    $(`#todo-title`).html(el.title)
                    $(`#desc-todo`).html(el.description)
                    $(`#todo-due-date`).html(new Date(el.due_date).toLocaleDateString())
                })
            });
        })
        .fail(err => {
            console.log(err)
            let msg = "Fail to find Todo";
            Swal.fire("Error!", msg, "error");
        })
}

function findDoing() {
    $.ajax({
        url: `${baseUrl}/todos/doing`,
        method: `get`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos => {
            showAllEvent()
            showMyEvent()
            $(".form-add-todo").slideUp("slow");
            $('.doing-box').empty()
            todos.forEach(el => {
                $('.doing-box').prepend(`
                <div class="card-todo cards">
                    <a href="#" class="task${el._id}" >${el.title}</a>
                </div>`)
                $(`.task${el._id}`).on('click', function (e) {
                    e.preventDefault()
                    localStorage.setItem('todoId', el._id)
                    $(`.todo-detail`).slideDown()
                    $(`#todo-title`).html(el.title)
                    $(`#desc-todo`).html(el.description)
                    $(`#todo-due-date`).html(new Date(el.due_date).toLocaleDateString())
                })
            });
        })
        .fail(err => {
            console.log(err)
            let msg = "Fail to find Todo";
            Swal.fire("Error!", msg, "error");
        })

}

function findDone() {
    $.ajax({
        url: `${baseUrl}/todos/done`,
        method: `get`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos => {
            showAllEvent()
            showMyEvent()
            $(".form-add-todo").slideUp("slow")
            $('.done-box').empty()
            todos.forEach(el => {
                $('.done-box').prepend(`
                <div class="card-todo cards">
                    <a href="#" class="task${el._id}" >${el.title}</a>
                </div>`)
                $(`.task${el._id}`).on('click', function (e) {
                    e.preventDefault()
                    localStorage.setItem('todoId', el._id)
                    $(`.todo-detail`).slideDown()
                    $(`#todo-title`).html(el.title)
                    $(`#desc-todo`).html(el.description)
                    $(`#todo-due-date`).html(new Date(el.due_date).toLocaleDateString())
                })
            });
        })
        .fail(err => {
            console.log(err)
            let msg = "Fail to find Todo";
            Swal.fire("Error!", msg, "error");
        })
}

function createNewTodo() {
    let title = $("#title-todo").val()
    let description = $("#description-todo").val()
    let due_date = $("#due-date-todo").val()
    let status = 'Todo'
    let eventId = localStorage.getItem('eventId')

    Swal.fire({
        title: `Creating New Todo...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();
    console.log({ title, description, due_date, status, eventId })
    $.ajax({
        url: `${baseUrl}/todos`,
        method: `post`,
        data: {
            title,
            description,
            due_date,
            eventId
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showAllEvent()
            showMyEvent()
            findTodo()
            $(".form-add-todo").slideUp("slow");
            Swal.close()
            Swal.fire('Success!', "Your Todo is Created!", 'success')
        })
        .fail(err => {
            console.log(err)
            let msg = "Fail to add Todo";
            Swal.fire("Error!", msg, "error");
        })
        .always(() => {
            $("#title-todo").val("")
            $("#description-todo").val("")
            $("#due-date-todo").val("")
        })
}

function toDoing() {
    $.ajax({
        url: `${baseUrl}/todos/doing/${localStorage.getItem('todoId')}`,
        method: `patch`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            $(".form-add-todo").slideUp('slow')
            showAllEvent()
            showMyEvent()
            findTodo()
            findDoing()
            findDone()
        })
        .fail(err => {
            console.log(err)
        })
}

function toDone() {
    $.ajax({
        url: `${baseUrl}/todos/done/${localStorage.getItem('todoId')}`,
        method: `patch`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            $(".form-add-todo").slideUp('slow')
            showAllEvent()
            showMyEvent()
            findTodo()
            findDoing()
            findDone()
        })
        .fail(err => {
            console.log(err)
        })
}

function updateTodo() {

}

function deleteTodo() {
    $.ajax({
        url: `${baseUrl}/todos/${localStorage.getItem('todoId')}`,
        method: `delete`,
        data: {
            eventId: localStorage.getItem('eventId')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            $(".form-add-todo").slideUp('slow')
            showAllEvent()
            showMyEvent()
            findTodo()
            findDoing()
            findDone()
        })
        .fail(err => {
            console.log(err)
        })
}