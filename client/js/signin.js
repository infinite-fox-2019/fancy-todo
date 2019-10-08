$(document).ready(function(){
    $('#sign-in-modal').modal();
    $('#logup-button').hide()
    $('#email-form').hide()
    $('#logup-header').hide()
    $('#login-choice').hide()
    $('#homepage-link').hide()
    $('#sign-out-link').hide()
    $('#my-plans-link').hide()
    $('#my-plans-page').hide()
    $('#my-itineraries-link').hide()
    $('#my-itineraries-page').hide()
})

$('#show-register-form').click(function(e){
    e.preventDefault()
    $('#logup-button').show()
    $('#login-button').hide()
    $('#email-form').show()
    $('#login-header').hide()
    $('#logup-header').show()
    $('#login-choice').show()
    $('#logup-choice').hide()
})

$('#show-login-form').click(function(e){
    e.preventDefault()
    $('#logup-button').hide()
    $('#login-button').show()
    $('#email-form').hide()
    $('#logup-header').hide()
    $('#login-header').show()
    $('#login-choice').hide()
    $('#logup-choice').show()
})

$('#show-register-form').click(function(e){
    e.preventDefault()
    console.log('heyy')
    $('#logup-button').show()
})

$('#login-button').click(function(){
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/users/login',
        data : {
            username: $('#default-form-username').val().trim(),
            password: $('#default-form-password').val().trim()
        }
    })
    .done(({token})=>{
        localStorage.setItem('token',token)
        $('#sign-in-modal').modal('close');
        $('.container').css('-webkit-filter','blur(0px)')
        $('#homepage-link').show()
        $('#sign-out-link').show()
        $('#my-plans-link').show()
        $('#my-itineraries-link').show()
        $('#sign-in-link').hide()
        M.toast({html: 'successfully logged in', classes:'green-toast'})
    })
    .fail(err=>{
        console.log(err.responseJSON.msg)
        M.toast({html: err.responseJSON.msg, classes:'yellow-toast'})
    })
})

$('#logup-button').click(function(){
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/users/register',
        data : {
            username: $('#default-form-username').val().trim(),
            email: $('#default-form-email').val().trim(),
            password: $('#default-form-password').val().trim()
        }
    })
    .done(({token})=>{
        localStorage.setItem('token',token)
        $('#sign-in-modal').modal('close');
        $('.container').css('-webkit-filter','blur(0px)')
        $('#homepage-link').show()
        $('#sign-out-link').show()
        $('#my-plans-link').show()
        $('#my-itineraries-link').show()
        $('#sign-in-link').hide()
        M.toast({html: 'successfully registered and logged in', classes:'green-toast'})
    })
    .fail(err=>{
        console.log(err.responseJSON.msg)
        for (let i = 0; i < err.responseJSON.msg.length; i++) {
            M.toast({html: err.responseJSON.msg[i], classes:'yellow-toast'})
            
        }
    })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/google/gsignin`,
        data : {
            idtoken : id_token
        }
    })
    .done((token)=>{
        console.log(token)
        localStorage.setItem('token', token)
        $('#sign-in-modal').modal('close');
        $('.container').css('-webkit-filter','blur(0px)')
        $('#homepage-link').show()
        $('#sign-out-link').show()
        $('#my-plans-link').show()
        $('#my-itineraries-link').show()
        $('#sign-in-link').hide()
    })
    .fail(function(err){
        console.log('failed sending request')
        console.log(err);
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear('token')
        $('#plans-list').empty()
        $('#sign-out-link').hide()
        $('#my-plans-link').hide()
        $('#my-itineraries-link').hide()
        $('#my-itineraries-page').hide()
        $('#homepage-link').hide()
        $('#sign-in-link').show()
        M.toast({html: 'successfully logged out', classes:'green-toast'})
        $('#sign-in-modal').modal();
        $('.container').css('-webkit-filter','blur(5px)')
    });
}
