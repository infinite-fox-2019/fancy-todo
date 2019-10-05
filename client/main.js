// $.ajax({
//     url: 'http://www.boredapi.com/api/activity/',
//     method: 'get'
// })
//     .done((data) => {
        
//         console.log(data.activity)

//     })

// $('#addTodo').submit(e =>{
//     e.preventDefault()
//     $.ajax({
//         method: 'post',
//         url: 'http://localhost:3000/todo',
//         data: {description: `${$("#description").val()}`}
//     })
//     .done((data) => {
        
//         console.log(`berhasil menambahkan ${data}`)

//     })
// })

// -----------------------------------------------------------

$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('#afterLogin').show()
        $('#beforeLogin').hide()
    } else {
        $('#afterLogin').hide()
        $('#beforeLogin').show()
    }
})


$('#register').submit(e => {
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/register`,
        data: {
            username: `${$("#regname").val()}`,
            email: `${$("#regemail").val()}`,
            password: `${$("#regpass").val()}`
        }
    })
        .done(token => {
            $('.errRegis').empty()
            $("#regname").val('')
            $("#regemail").val('')
            $("#regpass").val('')
            $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
            localStorage.setItem('token', token)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
        })
        .fail(err=>{
            $('.errRegis').empty()
            $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

$('#login').submit(e => {
    e.preventDefault();
    
    $('.errLogin').empty()
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/login`,
        data: {
            username: `${$("#logname").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
        .done((token)=> {
            $("#logpass").val('')
            $("#logname").val('')
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            localStorage.setItem('token', token)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
            // location.reload(); pake ini bisa tapi ke refresh gmna caranya
 
        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/user/signGoogle',
        method: 'post',
        data:{
            id_token
        }
    })
        .done((token) => {
            localStorage.setItem('token', token)
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            $('#afterLogin').show()
            $('#beforeLogin').hide()
        })
}
function signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
    localStorage.removeItem('token')
    $('.successLogin').hide()
    $('#afterLogin').hide()
    $('#beforeLogin').show()
}
