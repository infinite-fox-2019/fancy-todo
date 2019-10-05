const host = 'http://192.168.0.100:3000'
// const host = 'http://localhost:3000'

// * Axios Config
const ajax = axios.create({
    baseURL: host,
    timeout: 2000,
    headers: { token: localStorage.getItem('token') }
})

// * Toastr Config
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right", "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


// * Running Startups
$(document).ready(function () {
    verifyUser()
})



// * Home Tabs
function showTodos() {
    $('#tab-todo').addClass('active')
    $('#tab-project').removeClass('active')
    $('.group-todo').show()
    $('.group-project').hide()
}

function showProjects() {
    $('#tab-project').addClass('active')
    $('#tab-todo').removeClass('active')
    $('.group-project').show()
    $('.group-todo').hide()
}

