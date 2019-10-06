function fetchUserTodos(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/users/todos',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .then(data => {
    // mangas.forEach(el => {
      // let card = `   
      // <div class="col-md-3 mt-5">
      // <input type="hidden" id="title-${el.mal_id}" value="${el.title}">
      // <input type="hidden" id="synopsis-${el.mal_id}" value="${el.synopsis}">
      // <input type="hidden" id="image-${el.mal_id}" value="${el.image_url}">
      // <input type="hidden" id="volumes-${el.mal_id}" value="${el.volumes}">
      // <input type="hidden" id="id-${el.mal_id}" value="${el.mal_id}">
      // <input type="hidden" id="chapters-${el.mal_id}" value="${el.chapters}">
      //   <div class="card" onclick='getDetail(${el.mal_id})'>
      //     <div style="width:100%; padding-top:100%; position:relative">
      //       <img
      //         src="${el.image_url}"
      //         class="fit"
      //         alt="card image"
      //       />
      //     </div>
      //     <div class="card-body" style="height: 120px">
      //       <p>
      //         <b>${el.title}</b>
      //       </p>
      //       <div class="summary">${el.synopsis}</div>
      //     </div>
      //   </div>

      // </div>`
      // $('#row-cards').append(card)
    // })
  })
  .catch(err =>{
    console.log(err);
  })
}

function getDetail(id) {
  $('#content-mangas-dash').hide()
  let title = $(`#title-${id}`).val()
  let synopsis = $(`#synopsis-${id}`).val()
  let image = $(`#image-${id}`).val()
  let volumes = $(`#volumes-${id}`).val()
  let chapters = $(`#chapters-${id}`).val()

  $("#content-mangas-detail").show();

  let isiDetailnyaManga = `
    <div class="card">
      <div style="width:100%; padding-top:100%; position:relative">
        <img
          src="${image}"
          class="fit"
          alt="card image"
        />
      </div>
      <div class="card-body" style="height: 120px">
        <p>
          <b>${title}</b>
        </p>
        <div class="summary">${synopsis}</div>
      </div>
    </div>
    <button class="btn btn-warning mt-3" onclick="getChart(${id})" data-toggle="modal" data-target="#chart">Show Chart</button>

    <div id="chart" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Comments Chart</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="image-chart">
          
          </div>
        </div>
      </div>

    </div>
  </div>


  `;

  $("#detailnya-manga").empty();
  $("#detailnya-manga").append(isiDetailnyaManga);

  let isiDaftarKomentar = `
    <div class="card" style="width:100%;">
      <div class="card-header">
        Comment Netizen
      </div>
      <div class="card-body" style="height: calc(100vh - 100px)">
        <div id="list-komentar"
          style="padding: 15px; overflow-y: scroll; width: 100%; height: calc(100vh - 300px)"
        >
          
        </div>
        <div id="kolom-komentar" style="width:100%; margin-top: 30px;">
            <div class="form-group">
               <input type="text" name="" id="createOp" style: "background: gray">
             </div>
            <div class="form-group">
               <button class="btn btn-primary" onclick="createOpinion(${id})">Submit</button>
            </div>
        </div>
      </div>
    </div>

  `;

  $("#daftar-komentar").empty();
  $("#daftar-komentar").append(isiDaftarKomentar);
  fetchComments(id)

  // let html = `
  // <div class="detail-manga">
  //   <div class="information">
  //       <img src="./assets/grey.jpg" height="200px" alt="" srcset="">
  //       <div class="descriptive">
  //         <h1>title</h1>
  //         <h4>sinopsis</h4>
  //         <h5>volumes</h5>
  //         <h5>chapters</h5>
  //       </div>
  //     </div>
  //     <div class="showComments">
  //       <h1>Our Member Opinions</h1>
  //       <div class="scrolldown">
  //         <div class="get-comments"></div>
  //       </div>
  //       <div class="diboxin">
  //         <h2>Tell your opinion</h2>
  //         <div class="create-opinion">
  //           <input type="text" name="" id="createOp">
  //           <button class="btn btn-warning" style="width:15%; height: '40px';" onclick="createOpinion(${id})">Submit</button>
  //         </div>
  //       </div>
  //       <div class="toggle-chart">

  //       </div>
  //     </div>
  //   </div>
  // `
  // $('#home-page').append(html)
  // $("#manga-dashboard").hide()
}


function fetchComments(id){
$.ajax({
  headers: { token: localStorage.getItem("token") },
  method: "get",
  url: "http://localhost:3000/comments/" + id
})
  .then(result => {
    result.comments.forEach(el => {
      $("#list-komentar").append(`
              <div class="card mb-3">
                <div class="card-body">
                  <p> ${el.comment} </p>
                  <small>${el.user.name}</small> <br/>
                   <small>${el.createdAt}</small>
                </div>
              </div>
           `);
    });
  })
  .catch(err => {
    console.log(next);
  });
}