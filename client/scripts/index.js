$(document).ready(() => {
    $('#signOutButton').hide()
    $('#loginButton').hide()
    $('#registerButton').hide()
    $('#mainPage').hide()
    $('#ToDos').empty()

    if (localStorage.token) {
        $('#signOutButton').show()
        $('#container2').hide()
        $('#container3').hide()
        $('#container4').hide()
        $('#mainPage').show()
    } else {
        $('#signOutButton').hide()
        $('#loginButton').show()
        $('#registerButton').show()
    }
})


