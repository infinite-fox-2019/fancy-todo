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
                    <a href="#" id="task${el._id}" >${el.title}</a>
                </div>`)
                $(`#task${el._id}`).on('click', function (e) {
                    e.preventDefault()
                    $(`#todo-title`).html(el.title)
                    $(`#desc-todo`).html(el.description)
                    $(`#due-date-todo`).html(`Due Date : ${new Date(el.due_date).toLocaleDateString()}`)
                    $(`.todo-datail`).slideDown('slow')
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
            console.log(todos)
            showAllEvent()
            showMyEvent()
            $(".form-add-todo").slideUp("slow");
            todos.forEach(el => {
                $('.doing-box').prepend(`
                <div class="card-todo cards">
                    <a href="#" id="task" >${el.title}</a>
                </div>`)
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
            console.log(todos)
            showAllEvent()
            showMyEvent()
            $(".form-add-todo").slideUp("slow");
            todos.forEach(el => {
                $('.done-box').prepend(`
                <div class="card-todo cards">
                    <a href="#" id="task" >${el.title}</a>
                </div>`)
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

function updateTodo() {

}

function deleteTodo() {

}