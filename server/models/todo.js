const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TodoSchema = new Schema({
    title : String,
    description : String,
    status : {
        type : Boolean,
    },
    due_date : {
        type : String
    },
    createdAt : Date,
    UserId : {
        type : Schema.Types.ObjectId,
        required : true
    }
})

TodoSchema.pre('save',function(next){
    if(this.title.length<5 || this.description.length<5){
        next({status:403,msg:'title/description terlalu singkat'})
    }else {
        this.status = false;
        this.createdAt = new Date();
        next()
    }
})
const Todo = Mongoose.model('Todos',TodoSchema);

Todo.createCollection()
    .then(function(){
        console.log(`Success Create Todo Collection`)
    })
    .catch(console.log)

module.exports = Todo;