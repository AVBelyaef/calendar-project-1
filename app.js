const express = require('express');
const useMiddleware = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');
const eventsRouter = require('./routes/events');
require('./middleware/db-connect');


const app = express();
useMiddleware(app);

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(authenticationRouter);
app.use(eventsRouter);


useErrorHandlers(app);
module.exports = app;
