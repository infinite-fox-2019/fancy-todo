//==============================================================================================================
var baseUrl = 'http://localhost:3000'
var globalToken = localStorage.getItem('token');
//==============================================================================================================
if(globalToken === null){
    $('#signout').hide();
    // $('#container').show()
}
$('#main-container').hide();
$('#main-container').hide();
$('#register').hide();
$('#signout').show();
// $('#signout').hide()
//==============================================================================================================
//GOOGLE OAuth 2  

////// function looping todo

function showTodo(data){
    let truee = 0;
    let falsee = 0;
    data.todoList.forEach(function(todo){
        let status ='';
        if(todo.status == false){
            status='To Do'
            falsee++
        }else if(todo.status == true){
            status='Done'
            truee++
        }
        $('#inputTodo').append(`
        <div class="mb-2">
            <div class="card text-center">
                <div class="card-header">
                    Todo ID ${todo.todoId} <h2>${status}</h2>
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${todo.title}</h5>
                        <p class="card-text">${todo.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                <div class="card-footer text-muted">
                    ${todo.createdAt}
                </div>
            </div>
        </div>
        `)
    })
    let persentase = (truee/data.todoList.length) * 100;
    $('.progress').append(`
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${persentase}%">${persentase}%</div>\    
    `)
    console.log(persentase)
}

///

function login(data){
    $('#row1').empty();
    $('#row2').empty();
    const {serverToken,photo,name} = data
    localStorage.setItem('token',serverToken);
    $('#row1').append(`
    <img src="${photo}" style="height:240px; margin: 6px 25px;width:200px;">
    `)
    $('#row2').append(`
    <marquee scrollamount="15" direction="left" style='font-size: 50px; font-family:'cursive'>Welcome ${name}</marquee>
    `)
    $('#container').hide();
    $('#main-container').show();
    $('#signout').show();
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'post',
        url : `${baseUrl}/users/signinG`,
        data : {
            id_token : id_token
        }
    })
        .done(function(data){
            showTodo(data)
            login(data)
        })
        .fail(console.log);
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        $('#register').hide();
        $('#main-container').hide();
        $('#container').show();
        console.log('User signed out.');
    });
}
//==============================================================================================================
//lempar-lempar
function scriptRegister(){
    $('#container').hide();
    $('#main-container').hide();
    $('#register').show();
}
function scriptSignin(){
    $('#main-container').hide();
    $('#register').hide();
    $('#container').show();
}

//==============================================================================================================
//create register

function createRegister(){
    $('#text-errorregister').empty()
    let username = $('#text-username').val();
    let password = $('#text-password').val();
    let confirm = $('#text-confirm').val();
    let email = $('#text-email').val();
    console.log(gender)
    if(password !== confirm){
        $('#text-errorregister').append('Pastikan password dan confirm sama!')
        $('#text-username').val('');
        $('#text-password').val('');
        $('#text-confirm').val('');
        $('#text-email').val('');
    }else{
        $.ajax({
            method : 'post',
            url : `${baseUrl}/users/signup`,
            data : {
                username,
                password,
                email
            }
        })
            .done(function(success){
                empty();
                scriptSignin();
                $('#text-errorlogin').append(`Success Register`)
            })
            .fail(function(err){
                $('#text-errorregister').append(`
                    ${err.responseJSON.msg}
                `)
            })
    }
}

//==============================================================================================================
//login


function signIn(){
    $('#text-errorlogin').empty();
    let username = $('#text-usernamel').val();
    let password = $('#text-passwordl').val();
    $.ajax({
        method : 'post',
        url : `${baseUrl}/users/signin`,
        data : {
            username,
            password,
            globalToken
        }
    })
        .done(function(data){
            console.log(data)
            let serverToken = data.getToken;
            let name = data.username;
            let photo = '../picture/blue-profile-1-e1538567682109.png';
            let todoList = data.todoList;
            login({
                serverToken,
                photo,
                name
            })
            showTodo(data)
            empty()
        })
        .fail(function(err){
            $('#text-errorlogin').append(`${err.responseJSON.msg}`)
            empty();
        })
}
