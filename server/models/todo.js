const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TodoSchema = new Schema({
    title : String,
    description : String,
    status : Boolean,
    due_date : Date
})

const Todo = Mongoose.model('Todos',TodoSchema);

Todo.createCollection()
    .then(function(){
        console.log(`Success Create Todo Collection`)
    })
    .catch(console.log)

module.exports = Todo;