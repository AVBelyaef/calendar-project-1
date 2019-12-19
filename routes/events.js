const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

const saltRounds = 10;

// router.get('/events', async function(req, res, next) {
//     req.session.user = user;
//     const userEvents = await Event.find({user: req.session.id}); /// Что мы получаем из кук? TODO: Отфильтровать по месяцу, категориям,
//     res.render('events', {calendar: 'calendar', events: await userEvents}); /// TODO: Обновить календарь
// });

router.get('/events', async function(req, res, next) {
    try {
        // const date1 = Date.
        const findDate = await Event.find({activity: 'Маникюр'});
        await console.log(findDate[0].firstDate);
        const date1 = await findDate[0].firstDate;
        await console.log(date1.getDate());
        const events = await Event.find({user: req.session.user._id}); /// Что мы получаем из кук? TODO: Отфильтровать по месяцу, категориям,
        res.render('events', {events}); /// TODO: Обновить календарь
    } catch(e) {
        console.log(e)
    }
});

router.get('/events/new', async function(req, res, next) {
    try {
        res.render('editor');
    } catch(e) {
        console.log(e);
    }
});

router.post('/events', async function(req, res, next) {
    try {
        if (req.session.user) {
            const newEvent = new Event({
                user: req.session.user._id,
                activity: req.body.activity,
                firstDate: req.body.firstDate,
                period: Number(req.body.period),
                notifyBefore: Number(req.body.notifyBefore),
                specialist: req.body.specialist,
                cost: Number(req.body.cost),
            });
            await newEvent.save();
            res.redirect(`/events`);
        } else {
            res.render('error', {message: 'Unauthorized operation'})
        }
    } catch(e) {
        console.log(e)
    }
});

router.get('/events:id', function(req, res, next) {
    res.render('event');
});

router.put('/events:id', async function(req, res, next) {
    if (req.session.user) {
        const entry = await Event.findById(req.params.id);
        entry.user = req.session.user;
        entry.activity = req.body.activity;
        entry.firstDate = req.body.firstDate;
        entry.period = req.body.period;
        entry.notifyBefore = req.body.notifyBefore;
        entry.specialist = req.body.specialist;
        entry.cost = req.body.cost;
        await entry.save();
        res.redirect(`/events`);
    } else {
        res.render('error', {message: 'Unauthorized operation'})
    }
});

router.delete('/events/:id', async function(req, res, next) {
    try {
        if (req.session.user) {
            await Event.deleteOne({'_id': req.params._id});
            res.redirect('/events');
        } else {
            res.render('error', {message: 'Unauthorized operation'})
        }
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;