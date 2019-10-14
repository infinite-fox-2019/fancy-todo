const baseUrl = `http://localhost:3000`
$(document).ready(function () {
    showAllEvent()

    if (localStorage.getItem('token')) {
        $('.main').slideDown("slow")
        $('.landingPage').hide()
    } else {
        showAllEvent()
        $('.main').hide()
        $('.landingPage').slideDown("slow")
    }

    $('#toLogin').on('click', function (e) {
        e.preventDefault()
        $('.register-box').hide()
        $('.login-box').show()

    })

    $('#toRegister').on('click', function (e) {
        e.preventDefault()
        $('.register-box').show()
        $('.login-box').hide()
    })

    $('#btn-register').on('click', function (e) {
        e.preventDefault()
        register()
    })

    $('#btn-login').on('click', function (e) {
        e.preventDefault()
        login()
    })

    $('#createEvent').on('click', function (e) {
        e.preventDefault()
        createEvent()
    })

    $('#firstPage').on('click', function (e) {
        e.preventDefault()
        showAllEvent()
        $('.firstPage').slideDown(5000)
        $('.secondPage').hide()
        $('.thirdPage').hide()
    })

    $('#thirdPage').on('click', function (e) {
        e.preventDefault()
        showMyEvent()
        $('.firstPage').hide()
        $('.secondPage').hide()
        $('.thirdPage').slideDown("slow")
    })

    $('#add-event').on('click', function (e) {
        e.preventDefault()
        if ($(".form-add-event").first().is(":hidden")) {
            $(".form-add-event").slideDown("slow");
        } else {
            $(".form-add-event").slideUp("slow");
        }
    })

    $('#close-task').on('click', function (e) {
        e.preventDefault()
        $('.todo-detail').slideUp("slow")
    })

    $('#addtodoshow').on('click', function (e) {
        e.preventDefault()
        $(".form-add-todo").slideDown('slow')
    })

    $("#close-todo").on('click', function (e) {
        e.preventDefault()
        $(".form-add-todo").slideUp('slow')
    })

    $("#btn-createTodo").on('click', function (e) {
        e.preventDefault()
        createNewTodo()
    })

    $("#toDoing").on('click', function (e) {
        e.preventDefault()
        toDoing()
    })

    $("#toDone").on('click', function (e) {
        e.preventDefault()
        toDone()
    })

    $("#deleteTodo").on('click', function (e) {
        e.preventDefault()
        deleteTodo()
    })

})