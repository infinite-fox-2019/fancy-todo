
const hideElement = (element) => {
    return $(element).hide()
}
const showElement = (element) => {
    return $(element).show()
}
const hideShowElement = (target, hide, show) => {

    $(target).on('click', (e) => {
        e.preventDefault()
        console.log('masuk')
        hideElement(hide)
        showElement(show)
    })
}

$(document).ready(function () {
    //sign out user
    


    $(`#signout-btn`).click(function (e) {
        e.preventDefault()
        localStorage.removeItem('token')
        hideElement('#signout-btn')
        $('#user-profile').empty()
        showElement('#login-form-container')
    })

    if (localStorage.getItem('token')) {
        hideElement('#signup-form-container')
        hideElement('#login-form-container')
        getUser()
    } else {
        
        hideElement(`#signup-form-container`)
        showElement('#login-form-container')
        hideElement('#signout-btn')
        hideElement(`#todo`)
        hideElement(`#form-todo`)
        hideElement('#wrap-main')

        hideShowElement(`#signup-form-btn`, `#login-form-container`, `#signup-form-container`)
        hideShowElement('#signin-form-btn', `#signup-form-container`, `#login-form-container`)

        //REGISTER USER//
        $(`#signup-form`).on('submit', (e) => {
            e.preventDefault()
            $(`#signup-form .auth-notifications`).empty()

            if ($(`#name-signup`).val() === '' || $(`#email-signup`).val() === '' || $(`#password-signup`).val() === '') {
                return authnotifications('Ooops!! all fields are required!')
            }

            $('#signup-btn').addClass('loading')

            $.ajax({
                method: 'post',
                url: `http://localhost:4000/user/register`,
                data: {
                    name: $(`#name-signup`).val(),
                    email: $(`#email-signup`).val(),
                    password: $(`#password-signup`).val()
                }
            })
                .done(user => {
                    $(`#signup-form .auth-notifications`).append(`
                <div class="ui success message">
                <p>${user.email} successfully registered!, please login to proceed</p>
                </div>
                `)
                    $(`#name-signup`).val('')
                    $(`#email-signup`).val('')
                    $(`#password-signup`).val('')
                })
                .fail(err => {
                    $(`#signup-form .auth-notifications`).append(`
                    <p>${err.message}</p>
                `)
                })
                .always(_ => {
                    $('#signup-btn').removeClass('loading')
                })
        })
        //================

        //LOGIN 
        $(`#login-form`).on('submit', e => {
            e.preventDefault()
            $(`#login-form .auth-notifications`).empty()
            if ($(`#email-login`).val() === '' || $(`#password-login`).val() === '') {
                return loginnotif('Ooops!! all fields are required!')
            }

            $('#signup-btn').addClass('loading')

            $.ajax({
                method: 'post',
                url: `http://localhost:4000/user/login`,
                data: {
                    email: $(`#email-login`).val(),
                    password: $(`#password-login`).val()
                }
            })
                .done(({ token, user }) => {
                    localStorage.setItem('token', token)
                    $(`#password-login`).val('')
                    $(`#email-login`).val('')
                    hideElement(`#signup-form-container`)
                    hideElement(`#login-form-container`)
                    showElement('#signout-btn')
                    showElement(`#todo`)
                    showElement(`#form-todo`)
                    getUser()
                    getTodo()

                })
                .fail(err => {
                    loginnotif(err.responseJSON.err)
                })
                .always(_ => {
                    $('#signup-btn').removeClass('loading')
                })
        })
    }
    
    //create tdo
    $(`#todo-form`).on('submit' , (e) => {
        e.preventDefault()
        if($(`#activity`).val() === '' || $(`#description`).val() === '' ||  $(`#due-date`).val() === ''){
            console.log('masuk')
            return formnotif(`Oops!! all fields are required`)   
        }

        $.ajax({
            method: 'post',
            url:  `http://localhost:4000/todo/create`,
            data: {
                activity: $(`#activity`).val(),
                description: $(`#description`).val(),
                due_date: $(`#due-date`).val()
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done( _ => {
            formmotifsuccess(`successesfully add to do list`)
            getTodo()
        })
        .fail( err => {
            console.log(err)
        })
        .always( _ => {
            $(`#activity`).val('')
            $(`#description`).val('')
            $(`#due-date`).val('')
            $(`#form-notifications`).val('')
        })

    })





})


function getMoment(date){
    // moment().format();
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return  "a few seconds ago";
}
function getWeather(){
    $.ajax({
        method: 'get',
        url:  `https://api.weatherbit.io/v2.0/current?lat=-6.260698&lon=106.781492&key=b8083e7c11894146b71be354946eddd8`
    })
    .done( weather => {
        console.log(weather.data[0])
        let data = weather.data[0]
        $(`#weather`).html(`
        
        
        <img src="https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt="">
        <div id=weather-content>
            <h4>${data.weather.description}</h4>
            <p>${data.city_name} ${data.country_code}<p>
            <p>${data.timezone}</p>
            <p>temperature : ${data.temp}°C</p>
        </div>
        `)
    })
    .fail( err => {
        console.log(err)
    })
}
function getdate(inputDate){
    const monthNames = ["","January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let year = new Date(inputDate).getFullYear()
    let month = new Date(inputDate).getMonth()
    let date = new Date(inputDate).getDate()
    return `${date}-${monthNames[month]}-${year}`
}
function authnotifications(msg) {
    $(`#signup-form .auth-notifications`).append(`
        <div class="ui error message error-sans">
        <p>${msg}</p>
        </div>`)
}
function loginnotif(msg) {
    $(`#login-form .auth-notifications`).append(`
    <div class="ui error message error-sans">
    <p>${msg}</p>
    </div>`)
}
function formnotif(msg) {
    console.log(msg)
    $(`#form-notifications`).html(`
        <div class="ui error message error-sans">
        <p>${msg}</p>
        </div>`)
}
function formmotifsuccess(msg){
    $(`#form-notifications`).html(`
        <div class="ui success message">
        <p>${msg}</p>
        </div>`)
}
function deleteSuccess(msg){
    $(`#deltesuccessnotif`).html(`
        <div class="ui success message">
        <p>${msg}</p>
        </div>`)
}
function deletefail(msg){
    $(`#deltesuccessnotif`).html(`
        <div class="ui error message">
        <p>${msg}</p>
        </div>`)
}
function getUser() {
    $.ajax({
        method: 'get',
        url: `http://localhost:4000/user`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(user => {
            $(`#user-profile`).html(
                `<div id="user-container">
                <div id="profile">
                <h2>Welcome ${user.name}</h2>
                <p id="signout-btn" onclick="signOut()">
                enough for today? sign out!
                </p>
                </div>
                <div id="weather"></div>
                `
            )
            getWeather()
        })
        .fail(err => {
            console.log(err)
        })
}
function deleteTodo(id){
    $.ajax({
        method: 'delete',
        url:  `http://localhost:4000/todo/delete`,
        data : {
            _id : id
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done( ({response , msg}) => {
        deleteSuccess(msg)
        getTodo()
    })
    .fail( err => {
        deletefail(err.msg)
    })
}
//get todo => include = delete todo , update status todod
function getTodo() {
    
    $.ajax({
        method: 'get',
        url:  `http://localhost:4000/todo/find`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done( todos => {
        $(`#todo`).empty() 
        todos.forEach(todo => {
            console.log(getMoment(todo.createdAt))
            $(`#todo`).append(`
            <div class="item">
                <i class="large github middle aligned icon ${(todo.status) ? "green" : "grey" }"></i>
                <div class="content">      
                <div class='head-todo'>
                    <p class="header">${todo.activity}</p>
                    <p class="date">${getMoment(todo.createdAt)}</p>
                </div>         
                    <div class="description">${todo.description}</div>
                    <div class="todo-link">
                        <a><span id="${todo._id}" style="color:#008080;  font-size:12px;">${!todo.status ? "undone":"done"}</span></a>
                        <a><span id="${todo._id}delete" style="color:#A0A0A0;" onclick="deleteTodo('${todo._id}')" class="delete-todo">delete</span></a>
                    </div>
                </div>
            </div>
            `)

            //HOVER EFFECT
            $(`#${todo._id}`).hover( () => {
                if(!todo.status)$(`#${todo._id}`).html("done")
                else $(`#${todo._id}`).html("undone")
            }, () => {
                if(!todo.status)$(`#${todo._id}`).html("undone")
                else $(`#${todo._id}`).html("done")
            })

            //CHANGE STATUS AJAX
            $(`#${todo._id}`).on('click', () => {
                !todo.status ? todo.status = true : todo.status = false
                $.ajax({
                    method: 'patch',
                    url:  `http://localhost:4000/todo/update`,
                    data: {
                        status: todo.status,
                        _id : todo._id
                    },
                    headers: {
                        token : localStorage.getItem('token')
                    }
                })
                .done( updated => {
                    getTodo()
                })
                .fail( err => {
                    console.log(err)
                })
            })
        });
    })
    .fail(err => {
        console.log(err)
    })
}