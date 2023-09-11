const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

//* Schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, "Invalid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
}, { timestamps: true });

//* MiddleWare

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set((value) => this.confirmPassword = value);

//* Compare Passwords
UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords must match')
    } 
    next();
})

//* Hashing Password
UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema);