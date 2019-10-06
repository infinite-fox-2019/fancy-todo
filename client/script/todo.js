
function toDoList(){
  Swal.fire({
    title: `Fetching data from server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

  $.ajax({
    method: 'get',
    url: `${baseURL}/todo/findall`,
    headers: {
      accesstoken: localStorage.getItem('token')
    }
  })
  .done((response) => {
    findAllToDo(response)  
    Swal.close()
  })
  .fail(err=>{
    console.log(err);
  })
}

function findAllToDo(toDoData){
  let list = toDoData.data
  if(list.length == 0 ){
    $('.list-group').append(`<h4>nothing to do list</h4>`)
  } else {
    list.forEach(element => {
      $('.list-group').append(
        `<h5 class="card-title">${element.event}</h5>
          <a href="#" class="list-group-item list-group-item-action  list-group-item-info">
          <h4>${element.name}</h4>
          <p>${element.description}</p>
        </a>`
      )
    });
  }
}

function formToDo(){
  $('#formModal').append(`
  <!-- modal -->
  <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">To Do List</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
              <form id="contactForm" name="contact" role="form">
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="inputState">Events This Week</label>
                      <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>			
                    </div>	
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" name="name" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="message">Description</label>
                      <textarea name="message" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="date">Due Date</label>
                      <input type="date" id="date" class="form-control">
                    </div>					
                  </div>
                  <div class="modal-footer">					
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <input type="submit" class="btn btn-success" id="submit">
                  </div>
                </form>
          </div>
          
          <!-- modalbody -->
          
        </div>
      </div>
    </div>
  `)
}


function createToDo(){
  let name = $('#nametodo').val()
  let description = $('#description').val()
  let dueDate = $('#duedate').val()

  $.ajax({
    method: 'post',
    url: `${baseURL}/todo/create`,
    headers: {
      accesstoken: localStorage.getItem('token')
    },
    data: {
      name, description, dueDate
    }
  })
}