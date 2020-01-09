const Insulin = require('../database/models/insulin');
const Activity = require('../database/models/activity');
const Carbs = require('../database/models/carbs');
const Glucose = require('../database/models/glucose');

exports.create = (req, res) => {

  req.body.email = req.session.user.email
  Insulin.create(req.body)
  .then((newData) => {
    console.log("insulin data", newData)
    res.json({ msg: 'success', redirect: '/home', newData:newData });
  })
  .catch((dbErr) => {
    console.error(dbErr);
    res.json({ msg: 'fail'});
  });
};

exports.get = (req, res) => {
  Insulin.find( { $and: [ { "dosageTime": { "$gte": req.body.startDate, "$lt": req.body.endDate } }, { "email": req.session.user.email } ] } )
    .then((insulinData) => {
       console.log(insulinData);
      res.json({
        msg: 'success',
        redirect: '/home',
        data: insulinData
      });
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.json({
        msg: 'fail'
      });
    });
};




async function getTotalRecord(req) {

  let fromDate = new Date(req.body.startDate)
  let toDate = new Date(req.body.endDate)
  toDate.setDate(toDate.getDate() + 1)
  
  //making time as empty
  fromDate.setHours(0, 0, 0)
  toDate.setHours(0, 0, 0)

  console.log('from',fromDate)
  console.log('to',toDate)

 
  
  //Insulin
  let insulinRecord = await Insulin.find({ $and: [{ "dosageTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email }] })
  let insMap = insulinRecord.map(ins => {
    return { x: ins.dosageTime, y: ins.latestGlucoseLevelUnits || ""}
  })
  let insulinLabel = insulinRecord.map(ins => {
    return ins.dosageTime
  })

  console.log('insulinrecord ', insulinRecord);
  console.log('email ', req.session.user.email);
  
  //Activity
  let activityRecord = await Activity.find({ $and: [{ "activityTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email }] })
  let actMap = activityRecord.map(act => {
    return { x: act.activityTime, y: act.latestGlucoseLevelUnits || ""}
  })
  let activityLabel = activityRecord.map(act => {
    return act.activityTime
  })

  //Carbs
  let carbsRecord = await Carbs.find({ $and: [{ "carbsTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email }] })
  let carbsMap = carbsRecord.map(carbs => {
    return {x:carbs.carbsTime, y:carbs.latestGlucoseLevelUnits || ""}
  })
  let carbsLabel = carbsRecord.map(carbs => {
    return carbs.carbsTime
  })

  //Glucose
  let glucoseRecord = await Glucose.find({ $and: [{ "glucoseTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email }] })
  let glucoseMap = glucoseRecord.map(glucose => {
    return {x:glucose.glucoseTime, y:glucose.glucoseLevelUnits || ""}
  })
  let glucoseLabel = glucoseRecord.map(glucose => {
    return glucose.glucoseTime
  })

  return { startDate:fromDate, endDate:toDate, insMap, insulinLabel, actMap, activityLabel,  carbsMap, carbsLabel, glucoseMap, glucoseLabel }
}




exports.getChartData = async (req, res) => {
  let todayRecord = await getTotalRecord(req)
  res.json({
    msg: 'success', redirect: '/home',
    data: {
        insulin: todayRecord.insMap,
        insulinLabel: todayRecord.insulinLabel,
        activity: todayRecord.actMap,
        activityLabel: todayRecord.activityLabel,
        carbs: todayRecord.carbsMap,
        carbsLabel: todayRecord.carbsLabel,
        glucose: todayRecord.glucoseMap,
        glucoseLabel: todayRecord.glucoseLabel,
    },
    date: {
      startDate:todayRecord.startDate,
      endDate:todayRecord.endDate
    }
  })
}