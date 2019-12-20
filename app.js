const express = require('express');
const useMiddleware = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');
const eventsRouter = require('./routes/events');
require('./middleware/db-connect');


const app = express();
useMiddleware(app);

app.use(function (req, res, next) {
    app.locals.isAuth = !!req.session.user;
    if (req.session.user) {app.locals.name = req.session.user.name}
    next()
});

// Allows you to use PUT, DELETE with forms.
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(authenticationRouter);
app.use(eventsRouter);


useErrorHandlers(app);
module.exports = app;
