const db = require('mongoose');
const faker = require('faker');
db.connect('mongodb+srv://testing:12344321@cluster0-zwpfy.mongodb.net/calendar?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('../models/user');
const Event = require('../models/event');

function getRandomActivity() {
    let activities = ['Маникюр', 'Педикюр', 'Эпиляция', 'Пилинг', 'Брови', 'Ресницы', 'Стрижка', 'Окрашивание', 'Гинеколог', 'Чистка зубов'];
    return activities[Math.floor(Math.random() * ((activities.length - 1) - 0 + 1)) + 0];
};

async function getRandomUserId() {
    try {
        const users = await User.find({});
        const randomUserId = await users[Math.floor(Math.random() * ((users.length - 1) - 0 + 1)) + 0]._id;
        return await randomUserId;
    } catch(e) {
        console.log(e);
    }
};

async function seedBase(eventsCount) {
    try {
        const user1 = await User.findById({_id: '5dfb40010252f6417aa47901'});
        await console.log(user1);
        for (let i = 0; i < eventsCount; i++) {
            let newEvent = new Event ({
                user: await user1,
                activity: getRandomActivity(),
                firstDate: faker.date.recent(),
                period: Math.floor(Math.random() * (30 - 1 + 1)) + 1,
                notifyBefore: Math.floor(Math.random() * (7 - 2 + 1)) + 2,
                specialist: true,
                cost: Math.floor(Math.random() * (3000 - 500 + 1)) + 500,
            });
            await newEvent.save()
        }

    } catch (e) {
        console.log(e)
    }
    await db.disconnect();
}

seedBase(20);