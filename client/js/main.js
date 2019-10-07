$(document).ready(function () {
    $('#bro').text('hello')
    getEvents()
})

$(document).on('click', '.add-plan-btn', function () {
    let addressDetails = []
    if ($(this).attr('data-event-address1') !== 'null') {
        addressDetails.push($(this).attr('data-event-address1'))
    }
    if ($(this).attr('data-event-address2') !== 'null') {
        addressDetails.push($(this).attr('data-event-address2'))
    }
    if ($(this).attr('data-event-city') !== 'null') {
        addressDetails.push($(this).attr('data-event-city'))
    }
    if ($(this).attr('data-event-region') !== 'null') {
        addressDetails.push($(this).attr('data-event-name'))
    }
    if ($(this).attr('data-event-postal-code') !== 'null') {
        addressDetails.push($(this).attr('data-event-postal-code'))
    }
    if ($(this).attr('data-event-country') !== 'null') {
        addressDetails.push($(this).attr('data-event-country'))
    }
    let addressLine = addressDetails.join()
    $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/plans/',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                event: $(this).attr('data-event-name'),
                description: $(this).attr('data-event-description'),
                image: $(this).attr('data-event-thumbnail'),
                address: addressLine,
                time: $(this).attr('data-event-start')
            }
        })
        .done(response => {
            M.toast({
                html: "successfully added the plan",
                classes: 'green-toast'
            })
        })
        .fail(err => {
            M.toast({
                html: err.responseJSON.msg,
                classes: 'yellow-toast'
            })
        })
})

function getEvents() {
    $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/eventbrite'
        })
        .done(events => {
            //console.log(events)
            for (let i = 0; i < events.data.length; i++) {
                let address1 = ""
                let address2 = ""
                let city = ""
                let region = ""
                let postalCode = ""
                let country = ""
                if (!events.data[i].venue.address.address_1) {
                    address1 = 'null'
                } else {
                    address1 = events.data[i].venue.address.address_1
                }
                if (!events.data[i].venue.address.address_2) {
                    address2 = 'null'
                } else {
                    address2 = events.data[i].venue.address.address_2
                }
                if (!events.data[i].venue.address.city) {
                    city = 'null'
                } else {
                    city = events.data[i].venue.address.city
                }
                if (!events.data[i].venue.address.region) {
                    region = 'null'
                } else {
                    region = events.data[i].venue.address.region
                }
                if (!events.data[i].venue.address.postal_code) {
                    postalCode = 'null'
                } else {
                    postalCode = events.data[i].venue.address.postal_code
                }
                if (!events.data[i].venue.address.country) {
                    country = 'null'
                } else {
                    country = events.data[i].venue.address.country
                }
                $('#card-list').append(
                    `<div class="col s4">
            <div class="card medium">
                <div class="card-image">
                    <img src="${events.data[i].logo.url}">
                </div>
                <div class="card-content">
                    <span class="card-title">${events.data[i].name.text}</span>
                    <p>${events.data[i].summary}</p>
                </div>
                <div class="card-action">
                    <a class="add-plan-btn" id="${events.data[i].id}"
                    data-event-name="${events.data[i].name.text}"
                    data-event-description="${events.data[i].summary}"
                    data-event-start="${events.data[i].start.utc}"
                    data-event-thumbnail="${events.data[i].logo.url}"
                    data-event-address1="${address1}"
                    data-event-address2="${address2}"
                    data-event-city="${city}"
                    data-event-region="${region}"
                    data-event-postal-code="${postalCode}"
                    data-event-country="${country}"
                    href="#">ADD</a>
                </div>
            </div>
        </div>`
                )
            }
        })
        .fail(err => {
            console.log(err)
        })

    function getPlans() {
        $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/plans',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                console.log('get plans triggerd')
                console.log(response.plans)
                for (let i = 0; i < response.plans.length; i++) {
                    $('#plans-list').append(
                        `<div id="${response.plans[i]._id}-card" class="col s4">
                            <div class="card medium">
                                <div class="card-image">
                                    <img src="${response.plans[i].image}">
                                </div>
                                <div class="card-content">
                                    <span class="card-title">${response.plans[i].event}</span>
                                    <p>${response.plans[i].description}</p>
                                </div>
                                <div class="card-action">
                                    <a class="add-plan-to-itinerary-btn" data-id="${response.plans[i]._id}"href="#">ADD TO ITINERARY</a>
                                    <a class="delete-plan-btn" data-id="${response.plans[i]._id}"href="#">REMOVE</a>
                                </div>
                            </div>
                        </div>`
                    )
                }
            })
            .fail(err => {
                console.log(err)
                M.toast({
                    html: err.responseJSON.msg,
                    classes: 'yellow-toast'
                })
            })
    }

    function getItineraries() {
        $('#itineraries-list').empty()
        $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/itineraries',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                console.log('get itineraries triggerd')
                console.log(response.itineraries)
                for (let i = 0; i < response.itineraries.length; i++) {
                    $('#itineraries-list').append(
                        `<li class="collection-item">
                            <ul class="itinerary">
                                <li class="itinerary-header"><h3>${response.itineraries[i].name}</h3></li>
                                <li class="itinerary-header"><h4>${response.itineraries[i].description}</h4></li>
                                <li class="collection-item itinerary-plan"><div>Plan 1<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
                                <li class="collection-item itinerary-plan"><div>Plan 2<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
                                <li class="collection-item itinerary-plan"><div>Plan 3<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
                                <li class="collection-item itinerary-plan"><div>Plan 4<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
                                <a class="delete-itinerary-btn" href="#">REMOVE</a>
                            </ul?
                        </li>`
                    )
                }
            })
            .fail(err => {
                console.log(err)
                M.toast({
                    html: err.responseJSON.msg,
                    classes: 'yellow-toast'
                })
            })
    }

    $(document).off('click', '.delete-plan-btn').on('click', '.delete-plan-btn', function (e) {
        e.preventDefault()
        console.log($(this).attr('data-id'))
        $.ajax({
                method: 'DELETE',
                url: `http://localhost:3000/plans/${$(this).attr('data-id')}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(_ => {
                M.toast({
                    html: "successfully removed the plan",
                    classes: 'green-toast'
                })
                $(`#${$(this).attr('data-id')}-card`).remove()
            })
            .fail(err => {
                M.toast({
                    html: err.responseJSON.msg,
                    classes: 'yellow-toast'
                })
            })
    })

    $('#my-plans-link').unbind('click').bind('click', function (e) {
        e.preventDefault()
        $('#plans-list').empty()
        console.log('wou')
        $('#homepage').hide()
        $('#my-itineraries-page').hide()
        $('#my-plans-page').show()
        getPlans()
    })

    $('#homepage').click(function (e) {
        e.preventDefault()
        $('#homepage').show()
        $('#my-plans-page').hide()
        $('#my-itineraries-page').hide()
        getEvents()
    })

    $('#my-itineraries-link').unbind('click').bind('click', function (e) {
        e.preventDefault()
        $('#itineraries-list').empty()
        console.log('itineraries list triggered')
        $('#homepage').hide()
        $('#my-plans-page').hide()
        $('#my-itineraries-page').show()
        getItineraries()
    })

    //Add itinerary on submit button click
    $("#itinerary-form-submit-button").click(function (e) {
        e.preventDefault()
        console.log('bee gees')
        /* var formData = new FormData();
        formData.append('name', $('#itinerary-name-form').val());
        formData.append('description', $('#itinerary-description-form').val());
        console.log(formData.name) */
        $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/itineraries',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name: $('#itinerary-name-form').val(),
                    description: $('#itinerary-description-form').val()
                },
            })
            .done(response => {
                console.log(response)
                M.toast({
                    html: "successfully added the itinerary",
                    classes: 'green-toast'
                })
                getItineraries()
            })
            .fail(err => {
                M.toast({
                    html: err.responseJSON.msg,
                    classes: 'yellow-toast'
                })
            })
    })
}