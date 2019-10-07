function fetchProjects() {
  axios({
    method: 'get',
    url: baseUrl + '/projects',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      $('.listgroup').empty()
      let myid = localStorage.getItem('_id')
      // console.log(data);
      let html
      data.forEach(el => {
        if (el.owner._id === myid) {

          html = `
                    <div class="owned d-flex-col px-3 py-4">
                        <h2>${el.name}</h2>
                        <div class="py-3">
                        <h6><i class="fas fa-crown gold"></i> ${el.owner.name}(owned)</h6>
                        <p><i class="fas fa-users green"></i> ${el.members.length + 1}</p>
                        </div>
                        <div>
                        <button class="btn btn-dark opengroup" onclick="getProjectTodos('${el._id}')">Open</button>
                        <button class="btn btn-dark showpeoples" onclick="getPeoples('${el._id}')" id="todoButtonCreate" data-toggle="modal"
                        data-target="#ModalAddMember">Add Member</button>
                        </div>
                        <div class="btn-del-pro">
                        <button class="btn btn-maroon deleteGroup align-self-center" onclick="deleteProject('${el._id}')">Delete Project</button>
                        </div>
                    </div>
                    `
          // console.log('here')
        }
        else {
          html = `
                    <div class="group d-flex-col p-3">
                        <h2>${el.name}</h2>
                        <div class="py-3">
                        <h6><i class="fas fa-crown gold"></i> ${el.owner.name}</h6>
                        <p><i class="fas fa-users green"></i> ${el.members.length + 1}</p>
                        </div>
                        <div>
                        <button class="btn btn-dark opengroup" onclick="getProjectTodos('${el._id}')">Open</button>
                        <button class="btn btn-maroon outGroup" onclick="leaveProject('${el._id}')">Leave Project</button>
                        </div
                    </div>
                    `
        }
        $('.listgroup').append(html)
      })
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
    // console.log(err);
    })
}

function deleteProject(id) {
  axios({
    method: 'delete',
    url: baseUrl + '/projects/' + id,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(() => {
      fetchProjects()
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err);
    })
}

function leaveProject(id) {
  // console.log('let me go');
  axios({
    method: 'patch',
    url: baseUrl + '/projects/' + id + '/remove',
    data: {
      member: localStorage.getItem('_id')
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(() => {
      fetchProjects()
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err);
    })
}
let addToProject;
let peoples;
function getPeoples(id) {
  axios({
    method: 'get',
    url: baseUrl + '/projects/' + id + '/user',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      peoples = data.listuser
      addToProject = id
      peoples.forEach(el => {

        $('.res-search').append(`
                    <div class="picker my-2 p-2" onclick="addMe('${el._id}')">
                    <h5>${el.name}</h5>
                    <p>${el.email}</p>
                    </div>
                    `)

      })
      // console.log(data);
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err);
    })

}

$(document).ready(function () {
  $('#input-serach-name').keyup(function (event) {
    $('.res-search').empty()
    let search = $('#input-serach-name').val()
    // console.log(search)
    peoples.forEach(el => {
      if (el.name.includes(search) || el.email.includes(search)) {
        $('.res-search').append(`
        <div class="picker my-2 p-2" onclick="addMe('${el._id}')">
        <h5>${el.name}</h5>
        <p>${el.email}</p>
        <input type="hidden" value="${el._id}">
        </div>
        `)
      }
    })
    // console.log(peoples);
  })

  $('.createMe').click(function () {
    createProject()
    $('.close.closeMe').click()
    // backToProjects()
    $('#myProjects').click()
  })
})

function addMe(id) {
  axios({
    method: 'patch',
    url: baseUrl + '/projects/' + addToProject + '/add',
    data: {
      members: [id]
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(() => {
      // console.log('some swall')
      peoples.forEach((el, i) => {
        if (el._id === id) {
          peoples.splice(i, 1)
          $('#input-serach-name').keyup()
        }
      })
      // console.log(peoples);
    })
    .catch(err =>{
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
    })
}

function createProject() {
  let test = $('#input-projectname').val()
  // console.log(test);
  // console.log(baseUrl);
  axios({
    method: 'post',
    url: baseUrl + '/projects',
    data: {
      name: test
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(result => {
      fetchProjects()
      // console.log(result.data);
    })
    .catch(err => {
      let text = err.response.data.msg.join('<br>')
      Swal.fire({
      title: 'Error!',
      html: text,
      type: 'error',
      confirmButtonText: 'Oke'
    })
    })
  $('#input-projectname').val('')
}