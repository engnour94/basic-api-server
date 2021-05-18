'use strict';
module.exports = (err, req, res, next) => {
  res.status(500).json({
    error:err,
    status: 500,
    message: err.message,
    route: req.path,
  });
};