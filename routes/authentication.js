const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

const saltRounds = 10;

router.get('/login', (req, res) => {
  res.render('authentication/login', { message: req.query.message });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect('/events');
  } else {
    let message = 'Вы не авторизованы, пожалуйста, проверьте свою электронную почту или пароль!';
    res.redirect(`/login?message=${message}`);
  }
});

router.get('/signup', (req, res) => {
  res.render('authentication/signup', {message: req.query.message});
});

router.post('/signup', async (req, res) => {
  console.log(req.body)
  const { name, email, password, gender, dob } = req.body;
  const user = new User(
    {
      email: email,
      password: await bcrypt.hash(password, saltRounds),
      name: name,
      gender: gender,
      dob: new Date(dob),
    }
  );

  const dbemail = await User.findOne({ email });
  if (dbemail && dbemail.email === email) {
    let message = 'Email уже используется, пожалуйста, выберите другой';
    res.redirect(`/entries/signup?message=${message}`)
  } else {
    await user.save();
    req.session.user = user;
    res.redirect('/events');
  }
});


router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});


module.exports = router;