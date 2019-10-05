$(document).ready(() => {
    $('#main-page').hide()
    $('#sign-up').hide()
    $('#sign-up').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/users/signUp',
            type: 'post',
            data: {
                email: $('#email-sign-up').val(),
                password: $('#password-sign-up').val()
            }
        })
        .done(({message}) => {
            swal('Registered', message, "success");
            $('#sign-up').hide()
            $('#email-sign-up').val('')
            $('#password-sign-up').val('')
            $('#sign-in').show()
        })
        .fail(showSwal)
    })

    $('#sign-in').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/users/signIn',
            type: 'post',
            data: {
                email: $('#email-sign-in').val(),
                password: $('#password-sign-in').val()
            }
        })
        .done(({token}) => {
            localStorage.token = token
            $('#auth-page').hide()
            $('#main-page').show()
            getNowTasks()
            
        })
        .fail(showSwal)
    })

    $('#add-task').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/tasks/',
            type: 'post',
            data: {
                name: $('#name-add-task').val(),
                startDate: $('#start-date-add-task').val(),
                dueDate: $('#due-date-add-task').val()
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done(() => {
            getAllTasks()
            $('#close-add-task').click()
            $('#name-add-task').val('')
            $('#start-date-add-task').val('')
            $('#due-date-add-task').val('')
        })
        .fail(showSwal)
    })

    onSignIn = (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        $.ajax({
            method:'post',
            url: 'http://localhost:3000/users/googleSignIn',
            data : {
            token
            }
        })
        .done(function({token}){
            localStorage.token = token
            $("#auth-page").hide()
            $("#main-page").show()
            getNowTasks()
            $('#show-now-tasks').click()
        })
        .fail(showSwal)
    }

    signOut = () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            localStorage.removeItem('token')
            $('#main-page').hide()
            $('#auth-page').show()
        });
    }

    toSignUp = () => {
        $('#sign-in').hide()
        $('#email-sign-in').val('')
        $('#password-sign-in').val('')
        $('#sign-up').show()
    }

    toSignIn = () => {
        $('#sign-up').hide()
        $('#email-sign-up').val('')
        $('#password-sign-up').val('')
        $('#sign-in').show()
    }

    getAllTasks = () => {
        $('#show-now-tasks').hide()
        $('#show-all-tasks').empty()
        $('#show-all-tasks').show()
        $.ajax({
            url: 'http://localhost:3000/tasks/',
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done((tasks) => {
            if(tasks.length === 0) {
                $('#show-all-tasks').append('No Task')
            } else {
                strTasks = `<ul class="list-group">`
                tasks.forEach(task => {
                    console.log(task)
                    const {_id, name, description, startDate, dueDate} = task
                    let strTask = `{id: '${_id}', name: '${name}', description: '${description ? description : ''}', startDate: '${startDate}', dueDate: '${dueDate}'}`
                    console.log(`<li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">`)
                    strTasks += `
                    <li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">
                    ${task.name}
                    <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    `
                })
                strTasks += `</ul>`
                $('#show-all-tasks').append(strTasks)
            }
        })
        .fail(showSwal)
    }

    getNowTasks = () => {
        $('#show-all-tasks').hide()
        $('#show-now-tasks').empty()
        $('#show-now-tasks').show()
        $.ajax({
            url: 'http://localhost:3000/tasks/now',
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done((tasks) => {
            if(tasks.length === 0) {
                $('#show-now-tasks').append('No Task')
            } else {
                strTasks = `<ul class="list-group">`
                tasks.forEach(task => {
                    strTasks += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${task.name}
                    <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    `
                })
                strTasks += `</ul>`
                $('#show-now-tasks').append(strTasks)
            }
        })
        .fail(showSwal)
    }

    renderRightCol = (task) => {
        // console.log('rendered')
        console.log(task.name)
        $('#update-title').empty()
        $('#update-title').append(task.name)
        $('#name-update-task').val(task.name)
        $('#start-date-update-task').val(task.startDate)
        $('#due-date-update-task').val(task.dueDate)
        $('#description-update-task').val(task.description)
        $('#update-container').show()
    }

    showDescriptionForm = (action) => {
        $(`#description-${action}-task`).show()
    }
    showSwal = (err) => {
        if(!err.responseJSON) {
            err.responseJSON.title = 'Connection Failed'
            err.responseJSON.message = 'Couldn\'t connect to the server'
        }
        swal(err.responseJSON.title, err.responseJSON.message, "error");
    }
})