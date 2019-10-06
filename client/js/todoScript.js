//=====================================================================
//createTodo
function createTodo(){
    $('#text-errorTodo').empty();
    let date = $('#date').val();
    let title = $('#recipient-name').val();
    let description = $('#description').val();
    $.ajax({
        method : 'post',
        url : `${baseUrl}/todos/`,
        data : {
            date,
            title,
            description,
            token : globalToken
        }
    })
        .done(function(success){
            $('#text-errorTodo').empty();
            let todo = success.data
            $('#inputTodo').append(`
            <div class="card border-success mb-5" style="max-width: 18rem;">
            <div class="card-header bg-transparent border-success">${todo.title}</div>
            <div class="card-body text-success">
            <h5 class="card-title">Data Berhasil di Simpan</h5>
            <p class="card-text">silahkan muat ulang tautan :)</p>
            </div>
            <div class="card-footer bg-transparent border-success">Due_date ${todo.date}</div>
            </div>
            `)
            $('#text-errorTodo').append(success.msg)
            empty()
        })
        .fail(function(err){
            $('#text-errorTodo').append(`${err.responseJSON.msg}`)
        })
}

//delete Todo


function deleteTodo(id){

    let getId = id;
    $.ajax({
        method : 'delete',
        url : 'http://localhost:3000/todos',
        data : {
            todoId : getId
        }
    })
        .done(function(message){
            $(`#todo-message${getId}`).append(message.msg);
            $('.progress-bar').empty()
            truee--
        })
        .fail(console.log)
}

//kosongkan
function empty(){
    $('#text-usernamel').val('');
    $('#text-passwordl').val('');
    $('#date').val('');
    $('#recipient-name').val('');
    $('#description').val('');
    $('#text-username').val('');
    $('#text-password').val('');
    $('#text-confirm').val('');
    $('#text-email').val('');
}