$(document).ready(function (params) {
    console.log('dom is ready')
    $("#register").show()
    $("#login").hide()
    $("#logoutGoogle").hide()
})

const temp = [];

function register () {
    $("#register").submit( e => {
        e.preventDefault()
        let email = $("#registerEmail").val()
        let password = $("#registerPassword").val()
        $.ajax (
            {
                method: "post",
                url: "http://localhost:3000/register",
                data: {
                    email,
                    password
                }
            }
        )
        .done ( user => {
            $("#login").show()
            $("#register").hide()
            console.log(user);
        })
        .fail ( msg => {
            console.log(msg)
        })
    })
}

function login () {
    $("#login").submit( e => {
        e.preventDefault()
        let email = $("#loginEmail").val()
        let password = $("#loginPassword").val()
        $.ajax (
            {
                method: "post",
                url: "http://localhost:3000/login",
                data: {
                    email,
                    password
                }
            }
        )
        .done ( (token) => {
            $("#loginGoogle").hide()
            $("#login").hide()
            $("#register").hide()
            $("#logoutGoogle").show()
            localStorage.setItem("token", token)
            // console.log(user);
        })
        .fail ( msg => {
            console.log(msg)
        })
    })
}   

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax(
        {
            method: "post",
            url: "http://localhost:3000/loginGoogle",
            data: {
                id_token
            }
        }
    )
    .done ( (token) => {
        $("#register").hide()
        $("#login").hide()
        $("#logoutGoogle").show() 
        $("#showLogin").hide() 
        localStorage.setItem("token", token)
        console.log("token")
    })
    .fail ( msg => {
        console.log(msg)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( function () {
        localStorage.clear()
        $("#register").show()
        $("#loginGoogle").show()
        $("#logoutGoogle").hide()
        $("#showLogin").show()
        console.log('User signed out.');
    });
}

function showLogin() {
    $("#login").show()
    $("#loginGoogle").show()
    $("#register").hide()
    $("#showLogin").hide()
}

function createToDo() {
    $("#createToDo").submit( e => {
        console.log("masuk console")
        // e.preventDefault();
        let date = $("#date").val()
        let activity = $("#activity").val()
        let token = localStorage.getItem("token")
        $.ajax(
            {
                method: "post",
                url: "http://localhost:3000/ToDo/create",
                data: {
                    date,
                    activity,
                    token
                }
            }
        )
        .done ( result => {
            console.log(result)
        })
        .fail ( msg => {
            console.log(msg)
        })
    })
}

function findList() {
    let token = localStorage.getItem("token")
    $.ajax(
        {
            method: "get",
            url: "http://localhost:3000/ToDo",
            data: {
                token
            }
        }
    )
    .done ( results => {
        $("#listToDo").empty()

        for ( let i = 0; i < results.length; i++) {
            $("#listToDo").append(` `)
        }
    })
}