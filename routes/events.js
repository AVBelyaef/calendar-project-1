const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

const saltRounds = 10;

router.get('/events', async function(req, res, next) {
    try {
// ToDo: найти пользователей по статьям
        const users = await User.find()
        const events = await Event.find({user: req.session.user._id}); /// Что мы получаем из кук? TODO: Отфильтровать по месяцу, категориям,
        res.render('events', {events}); /// TODO: Обновить календарь
        // const events = await Event.find({user: req.session.user._id}); /// Что мы получаем из кук? TODO: Отфильтровать по месяцу, категориям,
        console.log(events)
        res.render('events', {events: events, title: 'Твои активности'}); /// TODO: Обновить календарь
    } catch(e) {
        console.log(e)
    }
});

router.get('/events/new', async function(req, res, next) {
    try {
        res.render('editor', {
            title: 'Новая задача',
            header: 'Новая задача',
            method: 'post',
            action: 'Создать',
        });
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

router.get('/events/:id', async function(req, res, next) {
    try {
        const event = await Event.findById(req.params.id);
        // function specialist(e) {
        //     if (e === true) return 'Да';
        //     else return 'Нет'
        // }
        console.log(event);
        console.log(event.period);
        res.render('editor', {
            title: 'Редактировать задачу',
            header: 'Редактировать задачу',
            method: 'post',
            action: 'Редактировать',
            event: event,
            activity: event.activity,
            firstDate: event.firstDate,
            period: event.period,
            notifyBefore: event.notifyBefore,
            specialist: event.specialist,
            cost: event.cost,
            put: 'put',
            id: req.params.id,
        });
    } catch(e) {
        console.log(e);
    }
});

router.put('/events/:id', async function(req, res, next) {
    console.log('>>> PUT');
    if (req.session.user) {
        const entry = await Event.findById(req.params.id);
        // entry.user = req.session.user._id;
        console.log(entry);
        entry.activity = req.body.activity;
        entry.firstDate = req.body.firstDate;
        entry.period = Number(req.body.period);
        entry.notifyBefore = Number(req.body.notifyBefore);
        entry.specialist = req.body.specialist;
        entry.cost = Number(req.body.cost);
        await entry.save();
        res.redirect(`/events`);
    } else {
        res.render('error', {message: 'Unauthorized operation'})
    }
});

router.delete('/events/:id', async function(req, res, next) {
    try {
        if (req.session.user) {
            await Event.deleteOne({'_id': req.params.id});
            res.end();
        } else {
            res.render('error', {message: 'Unauthorized operation'})
        }
    } catch(e) {
        console.log(e);
    }
});

const parserDataFromBD = (response) => {
    const data = {};
    if (response.length !== 0) {
        for (let item of response){
            const yearFromItem = item.firstDate.getFullYear();
            const monthFromItem = item.firstDate.getMonth() + 1;
            const dayFromItem = item.firstDate.getDate();

            if (!(yearFromItem.toString() in data)) {
                data[yearFromItem] = {};
            }
            if (!(monthFromItem.toString() in data[yearFromItem])) {
                data[yearFromItem][monthFromItem] = {};
            }
            if (!(dayFromItem.toString() in data[yearFromItem][monthFromItem])) {
                data[yearFromItem][monthFromItem][dayFromItem] = [];
            }
            const curentEvent = {
                startTime: "00:00",
                endTime: "24:00",
                text: item.activity
            };
            data[yearFromItem][monthFromItem][dayFromItem].push(curentEvent);
        }
    }
    console.log(data);
    return data;
};

router.get('/data', async function (req, res, next) {
    const events = await Event.find({user: req.session.user._id});
    console.log(events);
    return res.json(parserDataFromBD(events));
});

module.exports = router;