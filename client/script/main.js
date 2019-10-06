$(document).ready(function (params) {
    console.log('dom is ready')
    $("#register").show()
    $("#login").hide()
    $("#logoutGoogle").hide()
    $("#navbar-todo").hide()
    $("#createToDo").hide()
    $("#listToDo").hide()
    $("#updateToDo").hide()
})

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
            $("#showLogin").hide()
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
            $("#log-container").hide()
            $("#navbar-todo").show()
            findList()
            $("#listToDo").show()
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
        $("#log-container").hide()
        localStorage.setItem("token", token)
        // console.log("token")
        $("#navbar-todo").show()
        findList()
        $("#listToDo").show()   
    })
    .fail ( msg => {
        console.log(msg)
    })
}

function signOut() {  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( function () {
        localStorage.clear()
        $("#log-container").show()
        $("#register").show()
        $("#loginGoogle").show()
        $("#logoutGoogle").hide()
        $("#showLogin").show()
        $("#navbar-todo").hide()
        $("#listToDo").hide()
        $("#createToDo").hide()
        $("#updateToDo").hide()
        console.log('User signed out.');
    });
}

function showLogin() {
    $("#login").show()
    $("#loginGoogle").show()
    $("#register").hide()
    $("#showLogin").hide()
}

function showCreate() {
    $("#createToDo").show()
    $("#listToDo").hide()
    $("#updateToDo").hide()
}
function createToDo() {
    $("#createToDo").submit( e => {
        console.log("masuk console")
        e.preventDefault();
        $("listToDo").hide()
        $("#updateToDo").hide()
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
            $("#navbar-todo").show()
            $("#createToDo").show()
            findList()
            console.log(result)
        })
        .fail ( msg => {
            console.log(msg)
        })
    })
}

function findList() {
    $("#createToDo").hide()
    $("#listToDo").show()
    $("#listToDo").empty()
    console.log("masuk findAll Main");
    
    let token = localStorage.getItem("token")
    console.log(token)
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
        console.log("masuk findAll results");
        $("#createToDo").hide()
        $("#updateToDo").hide()
        $("#listToDo").empty()
        $("#listToDo").append(`<table class="centered" style="width: 100%">
            <thead>
                <tr>
                    <th class=""> Activity </th>
                    <th class=""> Date </th>
                    <th class=""> Options </th>
                </tr>
            </thead>`)
        for (let i = 0; i < results.length; i++) {
            $("#listToDo").append(`
            <table style="width: 100%" class="centered">
            <tbody >
                <tr>
                    <td class="">${results[i].activity} </td>
                    <td class="">${results[i].date} </td>      
                        <td>
                            <button class="btn btn-primary" onclick="showUpdate('${results[i]._id}')" id="btn-update" type="submit">Update</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" onclick="deleteToDo('${results[i]._id}')" id="btn-delete" type="submit">Delete</button>
                        </td>
                </tr>
            </tbody>
            `)
        }      
    })
}

function deleteToDo(_id) {
    // $("#delete").submit( e => {
        // let _id = $("#btn-delete").val()
        // e.preventDefault()
        console.log(_id)
        console.log("masuk delete main")
        $.ajax (
            {
                method: "delete",
                url: `http://localhost:3000/ToDo/delete/${_id}`,
                data: {
                    _id
                }
            }
        )
        .done ( result => {
            console.log("masuk delete main result")
            console.log(result);
            $("#listToDo").empty()
            $("#createToDo").hide()
            $("#updateToDo").hide()
            return findList() 
        })
        .fail ( msg => {
            console.log(msg);    
        })
    // })
}

function showUpdate (_id) {
    console.log("masuk showUpdate")
    localStorage.setItem("_id", _id)
    console.log(_id)
    $("#createToDo").hide()
    $("#listToDo").hide()
    $("#updateToDo").show()
}

function updateToDo() {
    $("#updateToDo").submit( e => {
        e.preventDefault()
        console.log("masuk update main")
        let _id = localStorage.getItem("_id")
        console.log(_id)
        let activity = $("#activityUpdate").val()
        let date = $("#dateUpdate").val()
        console.log(activity, date)
        $.ajax (
            {
                method: "put",
                url: `http://localhost:3000/ToDo/${_id}`,
                data : {
                    _id,
                    activity,
                    date
                }
            }
        )
        .done ( result => {
            console.log("masuk update main result")
            localStorage.removeItem("_id")
            console.log(result)
            $("#updateToDo").hide()
            findList()
        })
        .fail ( err => {
            console.log(err)
        })
    })
}