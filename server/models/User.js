const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt")
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        unique: [true, 'Email sudah terdaftar'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address. Must include "@" and "." '],
        required: [true, "Email harus diisi"]
    },
    password: {
        type: String,
        unique: [true, 'Email sudah terdaftar'],
        required: [true, "Email harus diisi"],
        minlength: [6, "Password harus lebih dari 6 karakter"],
        maxlength:[100, "Password harus kurang dari 100 karakter"]
    }
});

user.pre("save", function() {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model("User", user);

// User.save(function(error) {
//     assert.equal(error.errors["email"].message,
//       );
//     assert.equal(error.errors["password"].message,
//       'Password harus lebih dari 6 karakter');
//   });

module.exports = User;
