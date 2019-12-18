const db = require('mongoose');

const eventSchema = db.Schema({
    user: {type: db.Schema.ObjectId, ref: 'User'},
    activity: {type: String, required: true},
    firstDate: {type: Date, required: true},
    period: {type: Number, required: true},
    notifyBefore: {type: Number, required: true},
    specialist: {type: Boolean, required: true},
    cost: Number,
});

module.exports= db.model('Event', eventSchema);