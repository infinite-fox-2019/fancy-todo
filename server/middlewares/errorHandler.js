const consola = require("consola")

function errorHandler(err, req, res, next) {
  
  consola.info({message: "error handler start", badge: "true"})
  let consoleMsg = err
  consola.error({ message: consoleMsg, badge: "true" });
  consola.info({ message: "error handler end", badge: "true" });


  if(err.name === "error checker") {
    res.status(500).json({
      message: ["error handler checked"]
    });
  } else if (err.name == "JsonWebTokenError") {
    res.status(401).json({
      message: ["authentication failed, please login"]
    });
  } else if (err.name == "ValidationError") {
    let msgValidation = [];
    for (r in err.errors) {
      msgValidation.push(err.errors[r].message);
    }

    res.status(400).json({
      message: msgValidation
    });
  } else if (err.name == "CastError") {
    return res.status(400).send({
      message: ["failed to cast a value, invalid request"]
    });
  } else if (err.statusCode == 404 && err.msg === undefined) {
    res.status(404).json({
      message: ["data not found"]
    });
  } else {
    let myErr = [err.msg];

    if (Array.isArray(err.msg)) {
      myErr = err.msg;
    }
    res.status(err.statusCode || 500).json({
      message: err.msg ? myErr : ["internal server error"]
    });
  }
}

module.exports = errorHandler;
