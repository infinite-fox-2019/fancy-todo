const axios = require("axios");
const ToDo = require("../models/ToDo")
const jwt = require("../helpers/jwt")

class ToDoController {
    static create (req, res) {
        let { date, activity, token } = req.body
        let auth = jwt.verifyToken(token)
        let { _id, email } = auth
        ToDo.create(
            {
                date,
                activity,
                User_Id: _id
            }
        )
        .then ( (result) => {
            res.status(200).json(
                {
                    msg: "Sukses"
                }
            )
        })
        .catch ( err => {
            res.status(404).json(err)
        })
    }

    static findAll (req, res) {
        let { token } = req.body
        let auth = jwt.verifyToken(token)
        let { _id, email } = auth
        ToDo.find(
            {
                User_Id: _id
            }
        )
        .populate("User_Id")
        .then ( results => {
            if (results) res.status(200).json(results)
            else res.status(404).json( { msg: "Data Tidak Ada"})
        })
        .catch ( err => {
            console.log(err);
        })
    }

    // static delete (req, res) {
    //     let { date, activity, token } = req.body
    //     let auth = jwt.verifyToken(token)
    //     let { _id, email } = auth
    //     ToDo.findOneAndUpdate(
    //         {
    //             _id
    //         }, {
    //             $pop: {

    //             }
    //         }
    //     )
    //     .then ()
    // }
}

module.exports = ToDoController