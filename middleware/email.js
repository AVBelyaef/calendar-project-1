"use strict";
const Event = require('../models/event');
const User = require('../models/user');
// const moment = require('moment');
const nodemailer = require("nodemailer");


async function sendMail() {
  let dateTomorrow = new Date();
  let aaa = new Date();
  let dateNow = new Date();
  let date = new Date();
  date.setDate(date.getDate() - 1);
  dateTomorrow.setDate(date.getDate() + 1);
  aaa.setDate(date.getDate() + 5);
  const events = await Event.find({ firstDate: { $gte: date, $lte: dateTomorrow } })
  // const events = await Event.find({ firstDate: { $gte: '2019-12-01', $lte: '2019-12-20' } })
  await console.log(events)
// ToDo: найти пользователей по статьям
  const users = await User.find()
  // ToDo: достать все почты

  // ToDo: разослать всем письма


// async..await is not allowed in global scope, must use a wrapper
//   await function main() {

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
      to: "bshurik-nn@ya.ru", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  // }


}

// 1 000 мс * 60 секунд * 60 минут * 24 часа = 86 400 000 секунд
main().catch(console.error);

