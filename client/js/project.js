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


function constructProject({ name, members, todos, owner, inviteLink, updatedAt, createdAt }) {
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
                <button class="btn btn-secondary  mx-2">Enter</button>
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
        html: `<strong>Share this to invite others.</strong><br/><br/><span id="invite-secret" class="border rounded px-3 py-1 shadow">${code}</span> <button class="btn btn-info" onclick="copyToClipboard('#invite-secret')">Copy</button>`,
        showConfirmButton: true
    })
}