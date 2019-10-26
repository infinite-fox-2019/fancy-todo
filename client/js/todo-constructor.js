function constructTodo({ title, description, _id, status, dueDate, createdAt, updatedAt }) {
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
                        </div>
                    </div>
                </div>
            </div>`
}

function emptyTodo() {
    return `
    <div class="d-flex justify-content-center align-items-center" style="height: 100%; width: 100%;">
        <h1>You have not made any todo yet :(</h1>
    </div>
    `
}

