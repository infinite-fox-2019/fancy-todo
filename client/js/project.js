

function emptyProject() {
    return `
    <div class="d-flex justify-content-center align-items-center" style="height: 100%; width: 100%;">
        <h1>You have not joined any projects Yet!</h1>
    </div>
    `
}

function refreshProjects() {
    $('#fill-projects').empty()
    ajax.get('/projects')
        .then(({ data }) => {
            if (!data.length) { $('#fill-projects').append(emptyProject()) }
            else {
                data.forEach(el => $('#fill-projects').append(constructProject(el)))
            }
        }).catch(({ response: { data: error } }) => {
            Swal.fire(error)
        });
}


function constructProject({ _id, name, members, todos, owner, inviteLink, updatedAt, createdAt }) {
    return `   
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card d-flex flex-column align-items-stretch shadow" style="min-height: 13rem">
            <div class="bg-yellow text-white d-flex justify-content-center align-items-center flex-grow-1 py-3" style="height: 10vh;">
                <h5 class="shadow-text text-truncate px-3">${name}</h5>
            </div>
            <div class="flex-grow-1 mt-2 ml-2 row align-items-center px-3">
                <div class="row col-12">
                    <p class="col-6"><strong>Members</strong>: ${members.length}</p>
                    <p class="col-6"><strong>Todos</strong>: ${todos.length}</p>
                </div>
                <div class="row justify-content-center align-items-center col-6">
                    <p class="col-12 font-italic" style="font-size: 0.9rem"><strong>Last Active</strong> <br/>${moment(updatedAt).fromNow()}</p>
                    <p class="col-12 font-italic" style="font-size: 0.9rem"><strong>Started Date</strong> <br/>${moment(createdAt).fromNow()}</p>
                </div>
                <div class="col-6 justify-content-center align-items-center">
                    <p class="text-center"><strong>Project Starter</strong></p>
                    ${gravatar(md5(owner.email), 60)}
                    <p class="mt-2">${owner.username}</p>
                </div>
            </div>
            <div class="flex-grow-1 d-flex justify-content-center align-items-center px-3 my-3">
                <button class="btn btn-secondary  mx-2" onclick="showProject('${_id}')">Enter</button>
                <button class="btn btn-info mx-2" onclick="invite('${inviteLink}')">Invite</button>
            </div>
        </div>
    </div>
    `
}

function createProject() {
    Swal.fire({
        title: "Project Name",
        input: "text",
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Create',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
            return new Promise((resolve, reject) => {
                ajax.post(`/projects`, { name })
                    .then(({ data }) => {
                        if (!data) {
                            throw new Error('Fail confirming created project')
                        }
                        toastr.success(data.name, 'Success Create New Project')
                        resolve(data)
                    })
                    .catch(({ response: { data: err } }) => Swal.fire('Error', err, 'error'))
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then(() => {
        Swal.close()
        refreshProjects()
    }).catch((err) => {
        Swal.fire('Something Happened', err, 'error')
    });
}

function joinProject() {
    Swal.fire({
        title: 'Invitation Code',
        html:
            '<input id="swal-input1" class="swal2-input">',
        preConfirm: function () {
            return new Promise((resolve) => {
                ajax.post('/projects/join', { inviteLink: $('#swal-input1').val() })
                    .then(({ data }) => {
                        toastr.success(data.name, 'Success Join Project')
                        resolve(data)
                    }).catch(({ response: { data: err } }) => Swal.fire('Error', err, 'error'));
            });
        },
        onOpen: function () {
            $('#swal-input1').focus()
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
    }).then((data) => {
        Swal.close()
        refreshProjects()
    }).catch((err) => {
        Swal.fire('Something Happened', err, 'error')
    });
}

function invite(code) {
    Swal.fire({
        title: 'Invite Code',
        html: `<strong>Share this to invite others.</strong><br/><br/><span id="invite-secret" class="border rounded px-3 py-1 shadow">${code}</span> <button class="btn btn-info" onclick="copyToClipboard('#invite-secret', 'Invite Code copied to Cliipboard')">Copy</button>`,
        showConfirmButton: true
    })
}

// * Project Page

function showProject(projectId) {
    $('#login-page').hide()
    $('#content').hide()
    $('#project-page').show()
    $('#project-id').text(projectId)
    Swal.fire({
        title: "Fetching Project Detail",
        onOpen() {
            Swal.showLoading()
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
    ajax.get(`/projects/project/${projectId}`)
        .then(({ data }) => {
            getMembers(data.members)
            $('#project-name').text(data.name)
            $('#fill-project-todos').empty()
            if (data.owner === localStorage.getItem('id')) {
                $('.project-owner').show()
            } else {
                $('.project-owner').hide()
            }
            if (data.todos.length) {
                data.todos.forEach(el => $('#fill-project-todos').append(constructProjectTodo(el)))
            } else {
                $('#fill-project-todos').append(emptyProjectTodo())
            }
            Swal.close()
        }).catch(({ response: { data: err } }) => {
            Swal.fire('Something Happened', err, 'error')
        });
}

function renameProject() {
    Swal.fire({
        title: 'Rename Project',
        input: 'text',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        allowOutsideClick() { !Swal.isLoading() },
        preConfirm(name) {
            return new Promise((resolve, reject) => {
                ajax.put(`/projects/update/${$('#project-id').text()}`, { name })
                    .then(({ data }) => {
                        toastr.success(data.name, 'Success rename project')
                        resolve(data)
                    })
                    .catch(({ response: { data: err } }) => {
                        Swal.fire('Something Happened', err, 'error')
                    })
            });
        }
    })
        .then(() => Swal.close())
}


function getMembers(members) {
    $('#members-list').empty()
    members.forEach(el => $('#members-list').append(memberGenerate(el)))
}

function memberGenerate({ email, username }) {
    return `
    <div class="container-fluid hover-todo">
        <div class="row align-items-center">
            <div class="col-3">
                ${gravatar(md5(email), 32)}
            </div>
            <div class="col-9">
                <p class="text-truncate">${username}</p>
            </div>
        </div>
    </div>
                        `
}

function emptyProjectTodo() {
    return `
    <div class="d-flex justify-content-center align-items-center" style="height: 100%; width: 100%;">
        <h1>Empty Project Todo</h1>
    </div>
    `
}

function constructProjectTodo({ title, description, _id, status, dueDate, createdAt, updatedAt, owner }) {
    return `<div class="col-12 border-bottom pt-2 ${status ? "bg-light" : ""}">
                <div class="row align-items-center">
                    <div class="col-1 pb-4">
                        <input type="checkbox" class="big-checkbox" id="${_id}" ${status ? "checked" : ""} onclick="${status ? "updateStatus(" + "'" + _id + "'" + ", false)" : "updateStatus(" + "'" + _id + "'" + ", true)"}">
                    </div>
                    <div class="col-11 d-flex flex-column align-items-start justify-content-center hover-todo rounded" onclick="showEditTodo('${_id}','${title}', '${description}', '${dueDate}')">
                        <p class="text-truncate" style="max-width: 80vw;">
                            <strong>${title}</strong>
                        </p>
                        <p class="text-truncate" style="max-width: 80vw;">${description ? description : "No Description."}</p>
                        <div class="d-flex">
                            <p class="mr-5 font-italic text-danger">Due Date: ${moment(dueDate).fromNow()}</p>
                            <p class="mr-5 font-italic text-muted">Last Updated: ${moment(updatedAt).fromNow()}</p>
                            <p class="mr-5 font-italic text-muted">Created: ${moment(createdAt).fromNow()}</p>
                            <p class="mr-5 font-italic text-muted">Creator: ${owner.username}</p>
                        </div>
                    </div>
                </div>
            </div>`
}

function createProjectTodo() {
    Swal.fire({
        title: 'Creating Todo',
        onOpen() {
            Swal.showLoading()
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
    ajax.post(`/projects/project/${$('#project-id').text()}`, {
        title: $('#create-project-todo-title').val(),
        description: $('#create-project-todo-description').val(),
        dueDate: $('#create-project-todo-dueDate').val()
    })
        .then(({ data }) => {
            toastr.success(data.title, 'Success Create Todo')
            showProject($('#project-id').text())
            closeEmptyCreateProjectTodo()
        }).catch(({ response: { data } }) => {
            Swal.fire('Something Happened', data, 'error')
        });
}

$('#create-project-todo-form').on('submit', (e) => {
    e.preventDefault()
    createProjectTodo()
})

function showCreateProjectTodo() {
    $('#create-project-todo-modal').modal('show')
    $('#create-project-todo-modal').on('shown.bs.modal', function () {
        $('#create-project-todo-title').trigger('focus')
    })
}

function closeEmptyCreateProjectTodo() {
    $('#create-project-todo-modal').modal('hide')
    $('#create-project-todo-title').val('')
    $('#create-project-todo-description').val('')
    $('#create-project-todo-dueDate').val('')
}