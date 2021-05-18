'use strict';
/* ******************************************* */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500.js');
const foodRoutes = require('./routes/food');
const clothesRoutes = require('./routes/clothes');
const logger = require('./middleware/logger.js');
const app = express();

/* ******************************************* */
app.get('/', home);
function home(req,res){
  res.send('welcome to server.js');
}
app.get('/bad', badReq);
function badReq(req, res) {
  throw new Error('Something went wrong !!!!!');
}

/* ******************************************* */
app.use(express.json());//post, put, patch
app.use(logger);
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/clothes', clothesRoutes);
app.use('*', notFoundHandler);
app.use(errorHandler);

/* ******************************************* */
function start (PORT){
  app.listen(PORT,()=>{
    console.log(`app is listening on PORT ${PORT}`);
  });
}

module.exports={
  app:app,
  start:start,
};