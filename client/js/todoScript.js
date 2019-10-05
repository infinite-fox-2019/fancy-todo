//=====================================================================
//createTodo
function createTodo(){
    $('#text-errorTodo').empty();
    let date = $('#date').val();
    let title = $('#recipient-name').val();
    let description = $('#description').val();
    $.ajax({
        method : 'post',
        url : `${baseUrl}/todos/create`,
        data : {
            date,
            title,
            description,
            token : globalToken
        }
    })
        .done(function(success){
            console.log(success.data)
            let todo = success.data
            console.log('ini di dalam todoScript done')
            $('#inputTodo').append(`
            <div class="mb-2">
                <div class="card text-center">
                    <div class="card-header">
                        New Update
                    </div>
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">${todo.description}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    <div class="card-footer text-muted">
                        New Update
                    </div>
                </div>
            </div>
            `)
            $('#text-errorTodo').append(success.msg)
            empty()
        })
        .fail(function(err){
            $('#text-errorTodo').append(`${err.responseJSON.msg}`)
        })
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