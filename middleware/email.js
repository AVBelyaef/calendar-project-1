const Event = require('../models/event');
const User = require('../models/user');
const nodemailer = require("nodemailer");

setInterval(async function sendMails() {

  // let dateTomorrow = new Date();
  // let date = new Date();
  // dateTomorrow.setDate(dateTomorrow.getDate() + 2);
  // const events = await Event.find({ firstDate: { $gte: date, $lte: dateTomorrow } })
  // const usersArr = await User.find().select({ _id: 0, email: 1 }).where('_id').in(ids);
  // const email = usersArr.map(e => e.email);
  // console.log(email);
  const email = ['avbelyaef@ya.ru', 'bshurik-nn@yandex.ru']

  // email.forEach(async (e) => {
  for (let i = 0; i < email.length; i ++) {

    setTimeout(async function () {
      let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'beautysalonbeauty', // generated ethereal user
          pass: '9507beauty9507' // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
        from: '"Beauty sait 👻" <beautysalonbeauty@yandex.ru>', // sender address
        to: email[i], // list of receivers
        subject: "Напоминание ✔", // Subject line
        text: "Hello world!!!", // plain text body
        html: "<b>Напоминание</b>" // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }, 1000)
  }
}, 30000);

// main().catch(console.error);
