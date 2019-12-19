const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

const saltRounds = 10;

router.get('/login', (req, res) => {
  res.render('login', { message: req.query.message });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect('/events');
  } else {
    let message = 'Вы не авторизованы, пожалуйста, проверьте свою электронную почту или логин!';
    res.redirect(`/login?message=${message}`);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup', {message: req.query.message});
});

router.post('/signup', async (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = new User(
    {
      email: email,
      password: await bcrypt.hash(password, saltRounds),
      name: name,
      gender: gender,
      dob: Date(),
    }
  );
  const dbusername = await User.findOne({ name });
  const dbemail = await User.findOne({ email });
  if (dbusername && dbusername.name === name) {
    let message = 'Имя пользователя уже используется, выберите другое имя';
    res.redirect(`/entries/signup?message=${message}`)
  } else if (dbemail && dbemail.email === email) {
    let message = 'Email уже используется, пожалуйста, выберите другой';
    res.redirect(`/entries/signup?message=${message}`)
  } else {
    await user.save();
    req.session.user = user;
    res.redirect('/entries');
  }
});
//
//
// router.get('/logout', async (req, res, next) => {
//   if (req.session.user) {
//     try {
//       await req.session.destroy();
//       res.clearCookie("user_sid");
//       res.redirect("/");
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     res.redirect("/login");
//   }
// });


module.exports = router;