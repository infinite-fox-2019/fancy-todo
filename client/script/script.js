$(document).ready(function () {
    $('#logout').on('click', function (e) {
        e.preventDefault()
        $('.main').hide()
        $('.landingPage').slideDown("slow")
    })

    $('#btn-login').on('click', function (e) {
        e.preventDefault()
        $('.main').slideDown("slow")
        $('.landingPage').hide()
    })

    $('#firstPage').on('click', function (e) {
        e.preventDefault()
        $('.firstPage').slideDown(5000)
        $('.secondPage').hide()
        $('.thirdPage').hide()
    })

    $('.detail').on('click', function (e) {
        e.preventDefault()
        $('.firstPage').hide()
        $('.secondPage').show()
        $('.thirdPage').hide()
    })

    $('#thirdPage').on('click', function (e) {
        e.preventDefault()
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

    $('#task').on('click', function (e) {
        e.preventDefault()
        $('.todo-detail').slideDown("slow")
    })

    $('#close-task').on('click', function (e) {
        e.preventDefault()
        $('.todo-detail').slideUp("slow")
    })

})