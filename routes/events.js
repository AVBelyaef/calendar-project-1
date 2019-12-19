const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

const saltRounds = 10;

const parserDataFromBD = (response) => {
    const data = {};
    if (response.length !== 0) {
        for (let item of response){
            const yearFromItem = item.firstDate.getFullYear();
            const monthFromItem = item.firstDate.getMonth() + 1;
            const dayFromItem = item.firstDate.getDate();
            if (!(yearFromItem.toString() in data)) {
                data[yearFromItem] = {};
                // return(data);
            }
            if (!(monthFromItem.toString() in data[yearFromItem])) {
                data[yearFromItem][monthFromItem] = {};
                // return(data);
            }
            if (!(dayFromItem.toString() in data[yearFromItem][monthFromItem])) {
                data[yearFromItem][monthFromItem][dayFromItem] = [];
                // return(data);
            }
            const curentEvent = {
                startTime: "00:00",
                endTime: "24:00",
                text: item.activity
            };
            data[yearFromItem][monthFromItem][dayFromItem].push(curentEvent);
            // return(data);
        }
    }
    console.log(data);
    return data;
};

router.get('/events', async function(req, res, next) {
    // req.session.user = user;
    const events = await Event.find({user: '5dfb1a3d5dac8e46747241a3'});
    // parserDataFromBD(events);
    // res.send(parserDataFromBD(events));
    res.render('events', {eventsForCalendar: parserDataFromBD(events)});
    // console.log(parserDataFromBD(events));
    // console.log(typeof events[1].firstDate.getFullYear());
    // const userEvents = await Event.find({user: req.session.id}); /// Что мы получаем из кук?
    // res.render('events', {calendar: 'calendar', events: await userEvents}); /// TODO: Обновить календарь
});

router.get('/data', async function (req, res) {
    const events = await Event.find({user: '5dfb1a3d5dac8e46747241a3'});
    return res.json(parserDataFromBD(events));
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