$(document).ready(() => {


    addTask = () => {
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/tasks',
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
            getNowTasks()
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
            description: $('#description-update-task').val(),
            startDate: $('#start-date-update-task').val() !== '' ? $('#start-date-update-task').val() : undefined,
            dueDate: $('#due-date-update-task').val() !== '' ? $('#due-date-update-task').val() : undefined
        }
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/tasks/' + $('#id-update-task').val(),
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
        })
        .fail(showSwal)
    }

    deleteTask = () => {
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
                    url: 'http://timehuntserver.satyowicaksana.online/tasks/' + $('#id-update-task').val(),
                    type: 'delete',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        token: localStorage.token
                    }
                })
                .done(() => {
                    $('#update-container').hide()
                    getNowTasks()
                    getAllTasks()
                })
                .fail(showSwal)
            }
        });
        
    }

    $('#sign-up').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/users/signUp',
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
            url: 'http://timehuntserver.satyowicaksana.online/users/signIn',
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
            showProfile()
        })
        .fail(showSwal)
    })

   

    onSignIn = (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        $.ajax({
            method:'post',
            url: 'http://timehuntserver.satyowicaksana.online/users/googleSignIn',
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
            showProfile()
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

    showAllTasks = () => {
        $('#show-now-tasks').hide()
        $('#update-container').hide()
        $('#show-all-tasks').show()
        getAllTasks()
    }

    getAllTasks = () => {
        $('#show-all-tasks').empty()
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/tasks/',
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done((tasks) => {
            if(tasks.length === 0) {
                $('#show-all-tasks').append('<p class="ml-4">No Task</p>')
            } else {
                let strTasks = generateStrTasks(tasks)
                $('#show-all-tasks').append(strTasks)
            }
        })
        .fail(showSwal)
    }

    showNowTasks = () => {
        $('#show-all-tasks').hide()
        $('#update-container').hide()
        $('#show-now-tasks').show()
        getNowTasks()
    }

    getNowTasks = () => {
        $('#show-now-tasks').empty()
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/tasks/now',
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done((tasks) => {
            if(tasks.length === 0) {
                $('#show-now-tasks').append('<p class="ml-4">No Task</p>')
            } else {
                let strTasks = generateStrTasks(tasks)
                $('#show-now-tasks').append(strTasks)
            }
        })
        .fail(showSwal)
    }

    generateStrTasks = (tasks) => {
        strTasks = `<ul class="list-group">`
                tasks.forEach(task => {
                    const {_id, name, description, startDate, dueDate, status} = task
                    let strTask = `{id: '${_id}', name: '${name}', description: '${description ? description : ''}', startDate: '${startDate}', dueDate: '${dueDate}', status: ${status}}`
                    strTasks += `
                    <li class="list-group-item list-group-item-action" onclick="renderRightCol(${strTask})">
                    <div class="row">
                    <div class="col-1">
                    <a href="#" onclick="statusUpdate(${strTask})">
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
                    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1ffa1"><path d="M86,8.0625c-42.97581,0 -77.9375,34.96169 -77.9375,77.9375c0,42.97581 34.96169,77.9375 77.9375,77.9375c42.97581,0 77.9375,-34.96169 77.9375,-77.9375c0,-42.97581 -34.96169,-77.9375 -77.9375,-77.9375zM86,13.4375c40.0115,0 72.5625,32.551 72.5625,72.5625c0,40.0115 -32.551,72.5625 -72.5625,72.5625c-40.0115,0 -72.5625,-32.551 -72.5625,-72.5625c0,-40.0115 32.551,-72.5625 72.5625,-72.5625zM97.74207,22.56555c-1.45931,-0.26875 -2.85967,0.70072 -3.12842,2.15735c-0.26875,1.45931 0.69804,2.85967 2.15735,3.12842c18.46581,3.38894 34.35041,15.4931 42.49085,32.37598c0.46225,0.95944 1.42005,1.51697 2.4198,1.51697c0.39238,0 0.78903,-0.08239 1.16528,-0.26245c1.33569,-0.645 1.89952,-2.25196 1.25452,-3.59033c-8.88487,-18.42012 -26.21656,-31.62793 -46.35937,-35.32593zM145.30347,64.90418c-0.34723,-0.03439 -0.7069,-0.00063 -1.0603,0.11023c-1.41631,0.43806 -2.21492,1.94306 -1.77417,3.35938c0.9245,2.98313 1.61418,6.07136 2.05762,9.17005c0.19081,1.34106 1.33913,2.30957 2.65601,2.30957c0.12631,0 0.25687,-0.00999 0.38318,-0.03149c1.47006,-0.20963 2.49295,-1.56912 2.28332,-3.03919c-0.48106,-3.38087 -1.23877,-6.74483 -2.24658,-9.99939c-0.32855,-1.06425 -1.25737,-1.77598 -2.29907,-1.87915zM27.31067,93.07568l-5.30676,0.87659c-1.46469,0.24187 -2.45171,1.62968 -2.20984,3.09168c0.21769,1.31688 1.35551,2.24658 2.64551,2.24658c0.14513,0 0.29298,-0.01255 0.44617,-0.03674l5.30151,-0.87659c1.462,-0.24187 2.45696,-1.62699 2.21509,-3.09168c-0.24456,-1.462 -1.63505,-2.44634 -3.09168,-2.20984zM31.03748,104.78625c-0.34942,-0.00999 -0.70769,0.04934 -1.05505,0.18372l-5.00232,1.95788c-1.38406,0.54019 -2.06765,2.09604 -1.52747,3.4801c0.41388,1.06156 1.42878,1.71118 2.50378,1.71118c0.3225,0 0.65382,-0.0574 0.97632,-0.18371l5.00757,-1.95789c1.38406,-0.54019 2.0624,-2.09604 1.52222,-3.4801c-0.40313,-1.03603 -1.3768,-1.6812 -2.42505,-1.71118zM36.04504,115.67798c-0.34349,0.06236 -0.67641,0.1901 -0.98682,0.39368l-4.49841,2.9447c-1.24163,0.81163 -1.59117,2.47993 -0.77686,3.72156c0.51331,0.78744 1.37571,1.21252 2.25183,1.21252c0.50525,0 1.01554,-0.14005 1.46973,-0.43567l4.49316,-2.9447c1.24162,-0.81162 1.59117,-2.47993 0.77685,-3.72156c-0.60872,-0.93122 -1.699,-1.35761 -2.72949,-1.17053zM44.19153,125.12097c-0.68733,0 -1.37474,0.26195 -1.90015,0.78735l-3.80029,3.80029c-1.05081,1.05081 -1.05081,2.74948 0,3.80029c0.52406,0.52406 1.21215,0.78735 1.90015,0.78735c0.688,0 1.37608,-0.26329 1.90015,-0.78735l3.80029,-3.80029c1.05081,-1.05081 1.05081,-2.74948 0,-3.80029c-0.52541,-0.52541 -1.21282,-0.78735 -1.90015,-0.78735zM54.15942,132.82654c-1.03049,-0.18645 -2.12077,0.24658 -2.72949,1.17578l-2.93945,4.49316c-0.81162,1.24162 -0.47002,2.90993 0.77161,3.72156c0.45419,0.29831 0.96973,0.44092 1.47498,0.44092c0.87613,0 1.73058,-0.42765 2.24658,-1.21777l2.9447,-4.49841c0.81162,-1.24162 0.46477,-2.90468 -0.77686,-3.71631c-0.31041,-0.20358 -0.64857,-0.33678 -0.99206,-0.39893zM64.44751,138.35376c-1.04762,0.0296 -2.01991,0.6699 -2.42505,1.70593l-1.95789,5.00757c-0.54019,1.38137 0.1434,2.93991 1.52747,3.4801c0.31981,0.12631 0.65113,0.18896 0.97632,0.18896c1.075,0 2.08991,-0.65218 2.50379,-1.71643l1.95788,-5.00232c0.54019,-1.38138 -0.1434,-2.93992 -1.52746,-3.4801c-0.34736,-0.13505 -0.70585,-0.19358 -1.05505,-0.18371zM76.71448,141.6029c-1.46469,-0.24725 -2.8498,0.74784 -3.09168,2.20984l-0.88184,5.30151c-0.24187,1.46469 0.7504,2.8498 2.21509,3.09168c0.1505,0.02687 0.29579,0.03674 0.44092,0.03674c1.29269,0 2.42782,-0.92971 2.64551,-2.24658l0.88184,-5.30151c0.24187,-1.46469 -0.74515,-2.8498 -2.20984,-3.09168z"></path></g></g></svg>
                    `
                    }
                    </a>
                    </div>
                    ${task.status ? `<div class="col-9"><strike>${task.name}</strike></div>` : `<div class="col-9">${task.name}
                    </div>`}
                    </div>
                    </li>
                    `
                })
                strTasks += `</ul>`
                return strTasks
    }

    renderRightCol = (task) => {
        $('#update-title').empty()
        $('#update-title').append(task.name)
        $('#text-description').empty()
        $('#text-description').append(task.description)
        $('#id-update-task').val(task.id)
        $('#name-update-task').val(task.name)
        $('#start-date-update-task').val(generateDateString(task.startDate))
        $('#due-date-update-task').val(generateDateString(task.dueDate))
        $('#form-group-update').find('textarea').remove()
        $('#form-group-update').append('<textarea class="form-control mt-1" id="description-update-task" rows="3" style="display: none"></textarea>')         
        $('#description-update-task').hide()
        $('#description-update-task').html(task.description)
        $("#update-button").attr("disabled", false);
        if(task.status) {
            $("#update-button").attr("disabled", true);
        }
        $('#update-container').show()
    }

    generateDateString = (date) => {
        date = new Date(date)
        let result = ''
        let split = date.toLocaleDateString().split('/')
        result += `${split[2]}/${split[0]}/${split[1].length === 1 ? '0' + split[1] : split[1]} `
        
        result += `${String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours()}:${String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes()}`
        return result
    }

    showDescriptionForm = (action) => {
        if($(`#description-${action}-task`).is(":hidden")) {
            $(`#description-${action}-task`).show()
        } else {
            $(`#description-${action}-task`).hide()
        }
    }

    statusUpdate = (task) => {
        if($('#id-update-task').val() === task.id && !task.status){
            let set = {
                name: task.name,
                startDate: task.startDate,
                dueDate: task.dueDate,
                description: task.description,
                status: !task.status
            }
            $.ajax({
                url: 'http://timehuntserver.satyowicaksana.online/tasks/' + $('#id-update-task').val(),
                type: 'patch',
                data: set,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    token: localStorage.token
                }
            })
            .done(() => {
                var diffMs = (new Date(task.dueDate) - new Date()); // milliseconds between now & Christmas
                timepointUpdate(diffMs)
                renderRightCol(set)
                getNowTasks()
                getAllTasks()
            })
            .fail(showSwal)
        }
    }

    timepointUpdate = (timepoint) => {
        let set = {
            timepoint
        }
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/users/',
            type: 'patch',
            data: set,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done(() => {
            showProfile()
        })
        .fail(showSwal)
    }

    generateTimePoint = (now, dueDate) => {
        let diff = Math.abs(now - dueDate);
        return Math.floor((diff/1000)/60);
    }


    showSwal = (err) => {
        if(!err.responseJSON) {
            err.responseJSON = {}
            err.responseJSON.title = 'Connection Failed'
            err.responseJSON.message = 'Couldn\'t connect to the server'
        }
        swal(err.responseJSON.title, err.responseJSON.message, "error");
    } 
    
    showProfile = () => {
        $.ajax({
            url: 'http://timehuntserver.satyowicaksana.online/users/',
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: localStorage.token
            }
        })
        .done(({email, timepoint}) => {
            $('#profile-email').empty()
            $('#profile-email').append(`<small>${email.split('@')[0]}</small>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="40" height="40"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M34.9375,79.28125v-71.21875v0c8.46562,11.825 22.0375,18.8125 36.55,18.8125h29.025c14.5125,0 28.08437,-6.9875 36.55,-18.8125v0v71.21875" fill="#e8ff46"></path><path d="M94.33125,161.25h-16.6625c-36.0125,0 -61.8125,-34.66875 -51.46562,-69.20312l11.825,-34.80312c6.18125,-18.14062 23.24687,-30.36875 42.4625,-30.36875h11.01875c19.21563,0 36.28125,12.22812 42.4625,30.36875l11.825,34.80313c10.48125,34.53437 -15.45312,69.20313 -51.46562,69.20313z" fill="#e8ff46"></path><path d="M94.33125,157.21875h-16.6625c-2.28438,0 -4.03125,-1.74687 -4.03125,-4.03125c0,-2.28438 1.74687,-4.03125 4.03125,-4.03125h16.79688c13.30312,0 25.53125,-6.18125 33.45937,-16.79687c3.35938,-4.43438 5.64375,-9.40625 6.9875,-14.64688c0.5375,-2.15 2.6875,-3.49375 4.8375,-2.95625c2.15,0.5375 3.49375,2.6875 2.95625,4.8375c-1.6125,6.31562 -4.43437,12.22812 -8.33125,17.46875c-9.54062,12.9 -24.05312,20.15625 -40.04375,20.15625z" fill="#fcca3d"></path><path d="M55.09375,45.6875c-11.13199,0 -20.15625,9.02426 -20.15625,20.15625c0,11.13199 9.02426,20.15625 20.15625,20.15625c11.13199,0 20.15625,-9.02426 20.15625,-20.15625c0,-11.13199 -9.02426,-20.15625 -20.15625,-20.15625z" fill="#e8ff46"></path><path d="M55.09375,61.8125c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125z" fill="#444b54"></path><path d="M86,107.5c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125zM72.5625,107.5c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125zM99.4375,107.5c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125zM92.71875,120.9375c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125zM79.28125,120.9375c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125z" fill="#fcca3d"></path><path d="M116.90625,45.6875c-11.13199,0 -20.15625,9.02426 -20.15625,20.15625c0,11.13199 9.02426,20.15625 20.15625,20.15625c11.13199,0 20.15625,-9.02426 20.15625,-20.15625c0,-11.13199 -9.02426,-20.15625 -20.15625,-20.15625z" fill="#e8ff46"></path><path d="M116.90625,61.8125c-2.2264,0 -4.03125,1.80485 -4.03125,4.03125c0,2.2264 1.80485,4.03125 4.03125,4.03125c2.2264,0 4.03125,-1.80485 4.03125,-4.03125c0,-2.2264 -1.80485,-4.03125 -4.03125,-4.03125zM34.9375,43c2.28437,0 4.03125,-1.74688 4.03125,-4.03125v-20.425c8.86875,7.92813 20.425,12.3625 32.51875,12.3625h29.025c12.09375,0 23.65,-4.43437 32.51875,-12.3625v20.425c0,2.28437 1.74687,4.03125 4.03125,4.03125c2.28437,0 4.03125,-1.74688 4.03125,-4.03125v-30.90625c0,-1.74688 -1.075,-3.35937 -2.82188,-3.89687c-1.6125,-0.5375 -3.49375,0.13437 -4.56875,1.47812c-7.65938,10.75 -20.15625,17.06562 -33.325,17.06562h-28.89063c-13.16875,0 -25.66562,-6.45 -33.325,-17.06562c-1.075,-1.47813 -2.82187,-2.01562 -4.56875,-1.47813c-1.6125,0.5375 -2.6875,2.15 -2.6875,3.89688v30.90625c0,2.28437 1.74688,4.03125 4.03125,4.03125z" fill="#444b54"></path><path d="M55.09375,90.03125c9.1375,0 17.06562,-5.10625 21.23125,-12.63125l5.9125,16.6625c0.5375,1.6125 2.15,2.6875 3.7625,2.6875c1.6125,0 3.225,-1.075 3.7625,-2.6875l5.9125,-16.6625c4.16563,7.525 12.09375,12.63125 21.23125,12.63125c13.30312,0 24.1875,-10.88438 24.1875,-24.1875c0,-13.30313 -10.88438,-24.1875 -24.1875,-24.1875c-10.2125,0 -18.94687,6.31563 -22.44062,15.31875c0,0.13437 -0.13438,0.13437 -0.13438,0.26875l-8.33125,23.38125l-8.33125,-23.38125c0,-0.13437 -0.13438,-0.13437 -0.13438,-0.26875c-3.49375,-9.00312 -12.22812,-15.31875 -22.44062,-15.31875c-13.30313,0 -24.1875,10.88437 -24.1875,24.1875c0,13.30312 10.88437,24.1875 24.1875,24.1875zM116.90625,49.71875c8.86875,0 16.125,7.25625 16.125,16.125c0,8.86875 -7.25625,16.125 -16.125,16.125c-8.86875,0 -16.125,-7.25625 -16.125,-16.125c0,-8.86875 7.25625,-16.125 16.125,-16.125zM55.09375,49.71875c8.86875,0 16.125,7.25625 16.125,16.125c0,8.86875 -7.25625,16.125 -16.125,16.125c-8.86875,0 -16.125,-7.25625 -16.125,-16.125c0,-8.86875 7.25625,-16.125 16.125,-16.125z" fill="#444b54"></path><path d="M149.82813,91.375c-0.13438,-0.40313 -0.13438,-0.80625 -0.40312,-1.20938c-0.80625,-1.47812 -2.28438,-2.15 -3.7625,-2.15c-0.26875,0 -0.67187,0 -0.94062,0.13437c-0.40313,0.13437 -0.67187,0.26875 -0.94063,0.40313c-14.64687,7.92813 -25.12812,22.30625 -28.89062,39.50625c-0.40313,2.15 0.94062,4.3 3.09063,4.8375c0.26875,0 0.5375,0.13438 0.80625,0.13438c1.88125,0 3.49375,-1.34375 3.89688,-3.225c2.82187,-13.03437 10.2125,-24.1875 20.425,-31.44375c2.55312,13.57187 -0.5375,27.54688 -9.00313,38.83438c-9.54062,12.76563 -24.05312,20.02188 -39.90937,20.02188h-16.52812c-15.85625,0 -30.36875,-7.25625 -39.90938,-20.02188c-8.46563,-11.2875 -11.55625,-25.12812 -9.00313,-38.83438c10.34688,7.12188 17.7375,18.40938 20.55938,31.44375c0.40312,1.88125 2.01563,3.225 3.89687,3.225c0.26875,0 0.5375,0 0.80625,-0.13438c2.15,-0.40312 3.62813,-2.55312 3.09062,-4.8375c-3.7625,-17.2 -14.24375,-31.57813 -29.025,-39.50625c-0.13438,-0.13437 -0.26875,-0.13437 -0.40312,-0.13437c-0.40313,-0.13437 -0.80625,-0.26875 -1.20937,-0.26875c-0.13438,0 -0.13438,0 -0.26875,0c-0.13438,0 -0.40312,0 -0.5375,0c-0.13438,0 -0.26875,0 -0.40313,0.13437c-0.13437,0 -0.26875,0 -0.26875,0.13437c-0.13438,0 -0.26875,0.13437 -0.40313,0.13437c-0.13437,0 -0.13437,0.13437 -0.26875,0.13437c-0.13438,0.13437 -0.26875,0.13437 -0.40313,0.26875c-0.13437,0 -0.13437,0.13437 -0.26875,0.13437c-0.13438,0.13438 -0.26875,0.26875 -0.40313,0.40313l-0.13437,0.13437c-0.13438,0.26875 -0.40313,0.5375 -0.5375,0.80625c-0.13437,0.26875 -0.26875,0.40313 -0.26875,0.67188c-5.24063,17.60312 -2.01562,36.28125 9.00312,51.0625c6.31563,8.46562 14.5125,14.91562 23.91875,18.8125c0,0.13437 0,0.26875 0,0.40312v2.6875c0,2.28438 1.74688,4.03125 4.03125,4.03125c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-0.5375c4.70313,1.20938 9.54062,1.88125 14.5125,1.88125h16.79688c4.97187,0 9.80937,-0.67187 14.5125,-1.88125v0.5375c0,2.28438 1.74688,4.03125 4.03125,4.03125c2.28438,0 4.03125,-1.74687 4.03125,-4.03125v-2.6875c0,-0.13438 0,-0.26875 0,-0.40312c9.40625,-3.89688 17.60312,-10.34688 23.91875,-18.8125c10.61562,-14.78125 13.84062,-33.325 8.73438,-50.79375z" fill="#444b54"></path></g></g></svg>
        `)
        var diffDays = Math.floor(timepoint / 86400000); // days
        var diffHrs = Math.floor((timepoint % 86400000) / 3600000); // hours
        var diffMins = Math.round(((timepoint % 86400000) % 3600000) / 60000); // minutes
         
        $('#timepoint').empty()
        $('#timepoint').append(`<small>time you saved</small><br>
        <small style="color: rgb(241, 255, 161);">${diffDays} ${diffDays < 2? 'day' : 'days'} ${diffHrs < 10 && diffHrs >= 0  ? '0'+diffHrs : diffHrs}:${diffMins < 10 && diffMins >= 0 ? '0'+diffMins : diffMins} ${diffHrs < 2 ? 'hour' : 'hours'}</small>`)
        })
        .fail(showSwal)
    }

    if(localStorage.token) {
      $('#auth-page').hide()
      $('#page-container').show()
      getNowTasks()
      $('#sign-out').show()
      showProfile()
    }
})