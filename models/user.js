const db = require('mongoose');

const userSchema = db.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
});

module.exports= db.model('User', userSchema);