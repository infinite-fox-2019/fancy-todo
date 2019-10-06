const { Schema, model } = require("mongoose");
const { generateHash } = require("../helpers/bcryptjs")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"]
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      validate: [
        //validator email format
        {
          validator: function(val) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(val).toLowerCase());
          },
          message: "invalid email"
        },
        //validator unique email
        {
          validator: function(val) {
            return model("User", userSchema)
              .find({
                _id: {
                  $ne: this._id
                },
                email: val
              })
              .then(data => {
                if (data.length > 0) return false;
                else return true;
              })
              .catch(err => {
                throw err;
              });
          },
          message: "email already registered"
        }
      ]
    },
    password: {
      type: String,
      required: [true, "user password is required"]
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  this.email = this.email.toLowerCase();
  this.password = generateHash(this.password);
  next();
});

const User = model("User", userSchema);

module.exports = User;
