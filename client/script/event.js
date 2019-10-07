function createEvent() {
    let nameEvent = $('#nameEventIn').val()
    let locationEvent = $('#locationEventIn').val()
    let startEvent = $('#startEventIn').val()
    let endEvent = $('#endEventIn').val()

    Swal.fire({
        title: `Creating New Event...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();
    $.ajax({
        url: `${baseUrl}/events`,
        method: `post`,
        data: {
            name: nameEvent,
            location: locationEvent,
            start: startEvent,
            end: endEvent
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showAllEvent()
            showMyEvent()
            $(".form-add-event").slideUp("slow");
            Swal.close()
            Swal.fire('Success!', "Your Event is Created!", 'success')
        })
        .fail(err => {
            console.log(err)
            let msg = "Fail to Login";
            Swal.fire("Error!", msg, "error");
        })
}

function showAllEvent() {
    $.ajax({
        url: `${baseUrl}/events`,
        method: `get`
    })
        .done(events => {
            $('.board').empty()
            if (events.length == 0) {
                $('.board').append(`
                <h1> There's No Event </h1>
                `)
            } else {
                events.forEach(el => {
                    $('.board').append(`
                    <div class="card">
                            <img src="src/img/logo.png" alt="Logo">
                            <div class="text">
                                <div class="head">
                                    <h3><a href="#" class="detail${el._id}">${el.title}</a></h3>
                                    <div class="body">
                                        <p>Start Date : ${new Date(el.start_date).toLocaleDateString()}</p>
                                        <p>End Date : ${new Date(el.end_date).toLocaleDateString()}</p>
                                        <p>Location : ${el.location}</p>
                                    </div>
                                </div>
                                <button id="join" class="btn-join${el._id}">JOIN</button>
                            </div>
                    </div>`)
                    $(`.detail${el._id}`).click(() => {
                        let members = el.member
                        $('#title-event').html(el.title)
                        $('#start-date-event').html(new Date(el.start_date).toLocaleDateString())
                        $('#end-date-event').html(new Date(el.end_date).toLocaleDateString())
                        $('#location-event').html(el.location)
                        $('#join-event').attr('class', `join-event${el._id}`)
                        members.forEach(member => {
                            $('#member-event').append(`
                            <li>${member.name}</li>
                            `)

                            if (member._id == localStorage.getItem('id')) {
                                $(`.join-event${el._id}`).attr('disabled', true)
                            }
                        })

                        findTodo()
                        findDoing()
                        findDone()
                        $('.firstPage').hide()
                        $('.secondPage').show()
                        $('.thirdPage').hide()
                    })

                    el.member.forEach(member => {
                        if (member._id == localStorage.getItem('id')) {
                            $(`.btn-join${el._id}`).attr('disabled', true)
                        }
                    })

                    $(`.btn-join${el._id}`).on('click', function (e) {
                        e.preventDefault()
                        joinEvent(el._id)
                    })
                });
            }

        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}

function showMyEvent() {
    $.ajax({
        url: `${baseUrl}/users/${localStorage.getItem('id')}`,
        method: `get`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(({ eventId }) => {
            $('.my-events').empty()
            if (eventId.length == 0) {
                $('.my-events').append(`
                <h1> There's No Event </h1>
                `)
            } else {
                eventId.forEach(el => {
                    console.log()
                    $('.my-events').prepend(`
                    <div class="card">
                            <img src="src/img/logo.png" alt="Logo">
                            <div class="text">
                                <div class="head">
                                    <h3><a href="#" class="detail${el._id}">${el.title}</a></h3>
                                    <div class="body">
                                        <p>Start Date : ${new Date(el.start_date).toLocaleDateString()}</p>
                                        <p>End Date : ${new Date(el.end_date).toLocaleDateString()}</p>
                                        <p>Location : ${el.location}</p>
                                    </div>
                                </div>
                                <button>Detail</button>
                            </div>
                    </div>`)
                    $(`.detail${el._id}`).on('click', function (e) {
                        e.preventDefault()
                        let members = el.member
                        localStorage.setItem('eventId', el._id)
                        $('#title-event').html(el.title)
                        $('#start-date-event').html(new Date(el.start_date).toLocaleDateString())
                        $('#end-date-event').html(new Date(el.end_date).toLocaleDateString())
                        $('#location-event').html(el.location)
                        members.forEach(member => {
                            $('#member-event').append(`
                            <li>${member.name}</li>
                            `)

                            if (member._id == localStorage.getItem('id')) {
                                $('#join-event').attr('disabled', true)
                            }
                        })
                        findTodo()
                        findDoing()
                        findDone()
                        $('.firstPage').hide()
                        $('.secondPage').show()
                        $('.thirdPage').hide()
                    })

                });
            }
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}



function joinEvent(id) {
    $.ajax({
        url: `${baseUrl}/events/${id}`,
        method: 'patch',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            console.log(response)
            showAllEvent()
        })
        .fail(err => {
            console.log(err)
        })
}