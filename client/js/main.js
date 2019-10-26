// const host = 'http://192.168.0.100:3000'
const host = 'https://c-todo.crowfx.xyz/'

// * Axios Config
const ajax = axios.create({
    baseURL: host,
    timeout: 10000,
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

function fetchContent() {
    Swal.fire({
        title: "Fetching contents",
        showConfirmButton: false,
        onOpen() {
            Swal.showLoading()
        }
    })

    function getTodos() {
        return ajax.get('/todos')
    }

    function getProjects() {
        return ajax.get('/projects')
    }
    axios.all([getTodos(), getProjects()])
        .then(axios.spread(function ({ data: todos }, { data: projects }) {
            $('#fill-todos').empty()
            if (!todos.length) { $('#fill-todos').append(emptyTodo()) }
            else {
                todos.forEach(el => $('#fill-todos').append(constructTodo(el)))
            }
            $('#fill-projects').empty()
            if (!projects.length) { $('#fill-projects').append(emptyProject()) }
            else {
                projects.forEach(el => $('#fill-projects').append(constructProject(el)))
            }
            Swal.close()
        }))
        .catch(({ response: { data: error } }) => Swal.fire({
            type: 'error',
            Title: 'Failed to get content',
            text: error
        }))
}

function copyToClipboard(element, message = 'Text copied to clipboard') {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    toastr.success(message)
}