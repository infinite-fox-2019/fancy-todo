const Todo = require('../models/todo');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class TodoController {
    static create(req,res,next){
        let {token,date,title,description}= req.body;
        let decode = jwt.decode(token);
        let idUser = '';
        console.log(date,title,description)
        User.findOne({
            email : decode.email
        })
            .then(function(user){
                // console.log(user._id)
                idUser = user._id;
                if(date.length==0) throw({status:403,msg:'Wajib di pilih tanggal!'});
                else{
                    return Todo.create({
                        due_date : date,
                        title : title,
                        description :description,
                        UserId : idUser
                    })
                }
            })
            .then(function(data){
                console.log('kalau anda sampai sini harusnya sudah benar')
                res.status(201).json({msg:'Data Berhasil Disimpan',data:{
                    date,title,description
                }})
            })
            .catch(function(err){
                console.log('pasti masuk sini kenapa ya')
                next(err)
            })
    }
}


module.exports = TodoController;