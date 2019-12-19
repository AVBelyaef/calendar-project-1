const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

const saltRounds = 10;

router.get('/events', async function(req, res, next) {
    req.session.user = user;
    const userEvents = await Event.find({user: req.session.id}); /// Что мы получаем из кук?
    res.render('events', {calendar: 'calendar', events: await userEvents}); /// TODO: Обновить календарь
});

router.post('/events', async function(req, res, next) {
    if (req.session.user) {
        const newEntry = new Entry({
            user: req.session.user,
            activity: req.body.activity,
            firstDate: req.body.firstDate,
            period: req.body.period,
            notifyBefore: req.body.notifyBefore,
            specialist: req.body.specialist,
            cost: req.body.cost,
        });
        await newEntry.save();
        res.redirect(`/events`);
    } else {
        res.render('error', {message: 'Unauthorized operation'})
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

router.delete('/events:id', async function(req, res, next) {
if (req.session.user) {
    await Entry.deleteOne({'_id': req.params.id});
    res.redirect('/events');
    } else {
    res.render('error', {message: 'Unauthorized operation'})
    }
});

module.exports = router;