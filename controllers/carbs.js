const Carbs = require('../database/models/carbs');

exports.create = (req, res) => {

  req.body.email = req.session.user.email
  Carbs.create(req.body)
    .then((newcarbs) => {
      console.log(newcarbs);
      res.json({
        msg: 'success',
        redirect: '/home',
        data: newcarbs
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.json({
        msg: 'fail'
      });
    });
};

exports.getall = (req, res) => {

  Carbs.find({})
    .then((newcarbs) => {
      console.log(newcarbs);
      res.json({
        msg: 'success',
        redirect: '/home',
        data: newcarbs
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.json({
        msg: 'fail'
      });
    });
};

// (yyyy, mm, dd)
exports.get = (req, res) => {
  
  find( { $and: [ { "entryTime": { "$gte": req.body.startDate, "$lt": req.body.endDate } }, { "email": req.session.user.email } ] } )
    .then((newcarbs) => {
      console.log(newcarbs);
      res.json({
        msg: 'success',
        redirect: '/home',
        data: newcarbs
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.json({
        msg: 'fail'
      });
    });
};


exports.getLatestGlucoseLevel = (req, res) => {

    Carbs.find({"email": req.session.user.email}).sort({"entryTime": -1}).limit(1)
      .then((newcarbs) => {
        console.log(newcarbs);
        res.json({
          msg: 'success',
          redirect: '/home',
          data: newcarbs[0].glucoseLevelUnits
        });
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.json({
          msg: 'fail'
        });
      });
  };