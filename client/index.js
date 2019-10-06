$(document).ready(() => {
    addTask = () => {
        $.ajax({
            url: 'http://localhost:3000/tasks',
            type: 'post',
            data: {
                name: $('#name-add-task').val(),
                description: $('#description-add-task').val(),
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
    }

    updateTask = () => {
        let set = {
            name: $('#name-update-task').val() !== '' ? $('#name-update-task').val() : undefined,
            description: $('#description-update-task').val() !== '' ? $('#description-update-task').val() : undefined,
            startDate: $('#start-date-update-task').val() !== '' ? $('#start-date-update-task').val() : undefined,
            dueDate: $('#due-date-update-task').val() !== '' ? $('#due-date-update-task').val() : undefined
        }
        $.ajax({
            url: 'http://localhost:3000/tasks/' + $('#id-update-task').val(),
            type: 'patch',
            data: set,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done(() => {
            getNowTasks()
            getAllTasks()
            set.id = $('#id-update-task').val()
            renderRightCol(set)
            $('#description-update-task').html('')
        })
        .fail(showSwal)
    }

    deleteTask = () => {
        console.log('gas')
        swal({
            title: "Delete this task?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: 'http://localhost:3000/tasks/' + $('#id-update-task').val(),
                    type: 'delete',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        token: localStorage.token
                    }
                })
                .done(() => {
                    $('#update-container').hide()
                    getAllTasks()
                })
                .fail(showSwal)
            }
        });
        
    }
    
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
            $('#page-container').show()
            getNowTasks()
            $('#sign-out').show()
            
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
            $("#page-container").show()
            getNowTasks()
            $('#show-now-tasks').click()
            $('#sign-out').show()
        })
        .fail(showSwal)
    }

    signOut = () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            localStorage.removeItem('token')
            $('#page-container').hide()
            $('#auth-page').show()
            $('#sign-out').hide()
            $('#sign-up').hide()
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
        $('#update-container').hide()
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
                    const {_id, name, description, startDate, dueDate} = task
                    // console.log(task)
                    let strTask = `{id: '${_id}', name: '${name}', description: '${description ? description : ''}', startDate: '${startDate}', dueDate: '${dueDate}'}`
                    // console.log(`<li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">`)
                    strTasks += `
                    <li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">
                    ${task.name}
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
        $('#update-container').hide()
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
                    const {_id, name, description, startDate, dueDate} = task
                    let strTask = `{id: '${_id}', name: '${name}', description: '${description ? description : ''}', startDate: '${startDate}', dueDate: '${dueDate}'}`
                    strTasks += `
                    <li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">
                    <div class="row">
                    <div class="col-2">
                    <a href="" onclick="statusUpdate(${strTask})">
                    ${task.status ? 
                    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="20" height="20"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1ffa1"><path d="M86,1.24038c-46.79868,0 -84.75962,37.96094 -84.75962,84.75962c0,46.79868 37.96094,84.75962 84.75962,84.75962c46.79868,0 84.75962,-37.96094 84.75962,-84.75962c0,-46.79868 -37.96094,-84.75962 -84.75962,-84.75962zM130.55048,59.77103l-45.45493,67.03246c-1.34375,1.98978 -3.48858,3.33353 -5.60757,3.33353c-2.11899,0 -4.44471,-1.16286 -5.94351,-2.63581l-26.66827,-26.69412c-1.8089,-1.80889 -1.8089,-4.78065 0,-6.58954l6.58954,-6.58954c1.8089,-1.8089 4.78065,-1.8089 6.56371,0l17.36538,17.33954l37.72837,-55.66226c1.44712,-2.11899 4.36719,-2.66166 6.48618,-1.24038l7.72656,5.24579c2.09315,1.42128 2.66166,4.34135 1.21454,6.46033z"></path></g></g></svg>
                    `  
                    :
                    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="20" height="20"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1ffa1"><path d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z"></path></g></g></svg>
                    `
                    }
                    </a>
                    </div>
                    <div class="col-9">${task.name}</div>
                    </div>
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
        console.log(task.description)
        $('#update-title').empty()
        $('#update-title').append(task.name)
        $('#text-description').empty()
        $('#text-description').append(task.description)
        $('#id-update-task').val(task.id)
        $('#name-update-task').val(task.name)
        $('#start-date-update-task').val(task.startDate)
        $('#due-date-update-task').val(task.dueDate)
        $('#form-group-update').find('textarea').remove()
        $('#form-group-update').append('<textarea class="form-control mt-1" id="description-update-task" rows="3" style="display: none"></textarea>')         
        $('#description-update-task').hide()
        $('#description-update-task').html(task.description)
        $('#update-container').show()
    }

    showDescriptionForm = (action) => {
        if($(`#description-${action}-task`).is(":hidden")) {
            $(`#description-${action}-task`).show()
        } else {
            $(`#description-${action}-task`).hide()
        }
    }

    showSwal = (err) => {
        if(!err.responseJSON) {
            err.responseJSON = {}
            err.responseJSON.title = 'Connection Failed'
            err.responseJSON.message = 'Couldn\'t connect to the server'
        }
        swal(err.responseJSON.title, err.responseJSON.message, "error");
    }

    $("#fdate" ).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss',
        onShow: function () {
            this.setOptions({
                maxDate:$('#tdate').val()?$('#tdate').val():false,
                maxTime:$('#tdate').val()?$('#tdate').val():false
            });
        }
    }).attr('readonly', 'readonly');
    $( "#tdate" ).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss',
            onShow: function () {
                this.setOptions({
                    minDate:$('#fdate').val()?$('#fdate').val():false,
                    minTime:$('#fdate').val()?$('#fdate').val():false
                });
            }                    
    }).attr('readonly', 'readonly');     
    
})