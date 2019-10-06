function emptyProject() {
    return `
    <div class="d-flex justify-content-center align-items-center" style="height: 100%; width: 100%;">
        <h1>You have not joined any projects Yet!</h1>
    </div>
    `
}

function refreshProjects() {
    $('#fill-projects').empty()
    axios.get('/projects')
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
                    <p class="col-12 font-italic"><strong>Last Active</strong> <br/>${moment(updatedAt).fromNow()}</p>
                    <p class="col-12 font-italic"><strong>Started Date</strong> <br/>${moment(createdAt).fromNow()}</p>
                </div>
                <div class="col-6 justify-content-center align-items-center">
                    <p class="text-center"><strong>Project Starter</strong></p>
                    ${gravatar(md5(owner.email), 60)}
                    <p class="mt-2">${owner.username}</p>
                </div>
            </div>
            <div class="flex-grow-1 d-flex justify-content-center align-items-center px-3 my-3">
                <button class="btn btn-secondary  mx-2">Enter</button>
                <button class="btn btn-info onclick="invite('${inviteLink}')"  mx-2">Invite</button>
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
            return ajax.post(`/projects`, { name })
                .then(({ data }) => {
                    if (!data) {
                        throw new Error('Fail confirming created project')
                    }
                    toastr.success(result.value.name, 'Success Create New Project')
                    refreshProjects()
                    return data.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then(({ value }) => {
        Swal.fire(value)
    })
}

function invite() {

}