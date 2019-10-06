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
                                    <h3><a href="#" class="detail">${el.title}</a></h3>
                                    <div class="body">
                                        <p>Start Date : ${new Date(el.start_date).toLocaleDateString()}</p>
                                        <p>End Date : ${new Date(el.end_date).toLocaleDateString()}</p>
                                        <p>Location : ${el.location}</p>
                                    </div>
                                </div>
                                <button>Join</button>
                            </div>
                    </div>`)
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
                    $('.my-events').prepend(`
                    <div class="card">
                            <img src="src/img/logo.png" alt="Logo">
                            <div class="text">
                                <div class="head">
                                    <h3><a href="#" class="detail">${el.title}</a></h3>
                                    <div class="body">
                                        <p>Start Date : ${new Date(el.start_date).toLocaleDateString()}</p>
                                        <p>End Date : ${new Date(el.end_date).toLocaleDateString()}</p>
                                        <p>Location : ${el.location}</p>
                                    </div>
                                </div>
                                <button>Detail</button>
                            </div>
                    </div>`)
                });
            }
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}

function eventById() {

}

function joinEvent() {

}