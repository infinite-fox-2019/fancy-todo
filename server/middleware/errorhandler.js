function errorHandler(err, req,res,next){
    console.log('masuk error handler')
    console.log(typeof err)
    console.log(err)
    // if(err.name === 'Validation error') {
      //helper kumpulin errornya []
      // res 400 
    // } else {

    // }
    // res.status(500).json(err)
  // if(err){
  //   return res.status(500).json(err)
  // }



}

module.exports = errorHandler