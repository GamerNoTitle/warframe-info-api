const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const init = require('./utils/init')

const indexRouter = require('./routes/index');
const mpRouter = require('./routes/mp');
const warframe = require('./routes/warframe');
const wm = require('./routes/warframeMarket');
const rm = require('./routes/rivenMarket');
const wiki = require('./routes/huijiwiki');
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//启动时任务
init.onstart().then(() =>{
  app.use('/', indexRouter);
  app.use('/mp', mpRouter);
  app.use('/wf', warframe);
  app.use('/wm', wm);
  app.use('/rm', rm);
  app.use('/wiki', wiki);
// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

})




module.exports = app;
