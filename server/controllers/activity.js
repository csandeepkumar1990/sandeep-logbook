const Activity = require('../database/models/activity');

exports.create = (req, res) => {

  req.body.email = req.session.user.email
  Activity.create(req.body)
  .then((newActivity) => {
    console.log(newActivity)
    res.json({ msg: 'success', redirect: '/home' });
  })
  .catch((dbErr) => {
    console.error(dbErr);
    res.json({ msg: 'Opps! Failed to store information, please try later.'});
  });
};
 
exports.get = (req, res) => {
  
  Activity.find( { $and: [ { "entryTime": { "$gte": req.body.startDate, "$lt": req.body.endDate } }, { "email": req.session.user.email } ] } )
    .then((activityData) => {
      console.log(activityData);
      res.json({
        msg: 'success',
        redirect: '/home',
        data: activityData
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.json({
        msg: 'fail'
      });
    });
};

