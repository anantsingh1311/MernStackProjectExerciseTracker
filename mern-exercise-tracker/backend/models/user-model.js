const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for password, first create the password field in your DB schema, then install bcryptjs using npm install
const bcrypt = require("bcryptjs");

//The Way data is saved to the database
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        select: false
    }
}, {
    timestamps: true,
});
userSchema.pre("save", async function(){

//     Prevents rehashing the password every time the user document is updated.
// Without this, even updating something like email would re-hash an already-hashed password and break login.
    if(!this.isModified("password")) return;
    
// Generates a salt for hashing.
// 10 is the cost factor (rounds).
// Higher = more secure but slower.
// 10–12 is standard for production.
//Salt protects against:
// Rainbow table attacks
// Identical passwords producing identical hashes
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    
});
// userSchema.pre("save", async function(next){
//     if (!this.isModified("password")) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     next();
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
