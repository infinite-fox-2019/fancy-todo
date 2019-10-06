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
            res.status(201).json(
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
        // console.log("masuk findAll cntrl");
        // console.log(req.query);
        let { token } = req.query
        // console.log(token);
        
        let auth = jwt.verifyToken(token)
        let { _id, email } = auth
        // console.log(_id);
        
        ToDo.find(
            {
                User_Id: _id
            }
        )
        .then ( results => {
            if (results) res.status(200).json(results)
            else res.status(404).json( { msg: "Data Tidak Ada"})
        })
        .catch ( err => {
            console.log(err);
        })
    }

    static delete (req, res) {
        console.log("masuk delete cntrl")
        let { _id } = req.body
        console.log(_id)
        ToDo.findOneAndDelete(
            {
                _id
            }
        )
        .then ( (result) => {
            console.log("masuk delete cntrl result")
            res.status(200).json(result)
        })
        .catch ( err => {
            console.log("masuk delete cntrl err")
            res.status(404).json(
                {
                    msg: "data tidak ditemukan"
                }
            )
        })
    }

    static updateOne (req, res) {
        console.log("Masuk update cntrl")
        let { activity, date } = req.body
        let { _id } = req.body
        console.log(_id, activity, date)
        ToDo.findOneAndUpdate(
            {
                _id
            }, {
                activity,
                date
            }  
        )
        .then ( result => {
            console.log("masuk update cntrl result")
            res.status(200).json(result)
        })
        .catch ( err => {
            res.status(404),json(err)
        })
    }
}

module.exports = ToDoController