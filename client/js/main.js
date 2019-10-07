$(document).ready(function () {
  $('.todo.default').empty()
  $('.todo.default').append(`
  <div class="headerTodo mx-5 my-4">
        <div class="api">
            <button class="btn btn-light btn-lg" onclick="getJoke()"  id="todoButtonCreate" data-toggle="modal"
            data-target="#ModalJoke">Get Jokes</button>
            <button id="todoButtonCreate" data-toggle="modal" class="btn btn-dark btn-lg"
                data-target="#ModalCreate">Create
                Todo</button>
        </div>
    </div>
    <div class="listtodo">
        <div class="undone c-black">
            <h1>Uncomplete</h1>
            <div class="undone-personal roboto"></div>

        </div>
        <div class="done c-black">
            <h1>Completed</h1>
            <div class="done-personal roboto">

            </div>
        </div>
    </div>
    `)

  $('.todo.myprojects').empty()
  $('.todo.myprojects').append(`
        <div class="headerProject my-5">
            <button class="btn btn-light btn-lg downgip" id="todoButtonCreate" data-toggle="modal"
            data-target="#ModalCreateProject">Create Group Project</button>
        </div>
        <div class="boxproject mb-5">
            <div class="listgroup p-4">
            </div>
        </div>
    `)
})