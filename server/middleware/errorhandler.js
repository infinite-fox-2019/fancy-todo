function errorHandler(req,res,next,err){
    console.log('masuk error handler')
    console.log(typeof err)
    console.log(err)
  // if(err){
  //   return res.status(500).json(err)
  // }



}

module.exports = errorHandler