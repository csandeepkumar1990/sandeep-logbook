const { Parser } = require('json2csv');

const Insulin = require('../database/models/insulin');
const Activity = require('../database/models/activity');
const Carbs = require('../database/models/carbs');
const Glucose = require('../database/models/glucose');

const fields = [{
    label: 'Date',
    value: 'csvTime'
  },{
    label: 'Email',
    value: 'email'
  },{
    label: 'Dosage Type',
    value: 'dosageType'
  },{
    label: 'Dosage Units',
    value: 'dosageUnits'
  },{
    label: 'Activity Type',
    value: 'activityType'
  },{
    label: 'Activity Duration',
    value: 'activityDuration'
  },{
    label: 'Carbs Type',
    value: 'carbsType'
  },{
    label: 'Carbs Item',
    value: 'carbsItem'
  },{
    label: 'Glucose Type',
    value: 'glucoseType'
  },{
    label: 'Glucose Level Units',
    value: 'glucoseLevelUnits'
  }];

  const json2csvParser = new Parser({ fields, quote: '' });


  exports.exportHistory = async (req, res) => {

    let insulinRecord = await Insulin.find({});
    let activityRecord = await Activity.find({});
    let carbsRecord = await Carbs.find({});
    let glucoseRecord = await Glucose.find({});
    
    console.log(insulinRecord);
    console.log(activityRecord);
    console.log(carbsRecord);
    console.log(glucoseRecord);

    let map = new Map();

    exports.addInsulinElementsToMap(insulinRecord, map);
    exports.addActivityElementsToMap(activityRecord, map);
    exports.addCarbsElementsToMap(carbsRecord, map);
    exports.addGlucoseElementsToMap(glucoseRecord, map);
    
    var mapAsc = new Map([...map.entries()].sort());
    let mapToArray = Array.from(mapAsc.values());

    const csv = await json2csvParser.parse(mapToArray);
    // res.setHeader('Content-disposition', 'attachment; filename=diabetes-logbook-history.csv');
    // res.set('Content-Type', 'text/csv');
    // res.status(200).send(csv);
    res.json({
      msg: 'success',
      redirect: '/home',
      data: csv
    });
  };

  exports.export = async (req, res) => {

    let fromDate = new Date(req.body.startDate)
    let toDate = new Date(req.body.endDate)
    toDate.setDate(toDate.getDate() + 1)
    
    //making time as empty
    fromDate.setHours(0, 0, 0)
    toDate.setHours(0, 0, 0)
  
    console.log('from',fromDate)
    console.log('to',toDate)

    let insulinRecord = await Insulin.find( { $and: [ { "dosageTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email } ] });
    let activityRecord = await Activity.find( { $and: [ { "activityTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email } ] });
    let carbsRecord = await Carbs.find( { $and: [ { "carbsTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email } ] });
    let glucoseRecord = await Glucose.find( { $and: [ { "glucoseTime": { "$gte": fromDate, "$lt": toDate } }, { "email": req.session.user.email } ] });
    
    console.log(insulinRecord);
    console.log(activityRecord);
    console.log(carbsRecord);
    console.log(glucoseRecord);

    let map = new Map();

    exports.addInsulinElementsToMap(insulinRecord, map);
    exports.addActivityElementsToMap(activityRecord, map);
    exports.addCarbsElementsToMap(carbsRecord, map);
    exports.addGlucoseElementsToMap(glucoseRecord, map);
    
    var mapAsc = new Map([...map.entries()].sort());
    let mapToArray = Array.from(mapAsc.values());

    const csv = await json2csvParser.parse(mapToArray);
    // res.setHeader('Content-disposition', 'attachment; filename=diabetes-logbook.csv');
    // res.set('Content-Type', 'text/csv');
    // res.status(200).send(csv);
    res.json({
      msg: 'success',
      redirect: '/home',
      data: csv
    });
  };

  exports.addInsulinElementsToMap = function(insulinRecord, map) {
    for(let i =0; i< insulinRecord.length; i++){
        var element = insulinRecord[i];
        var d = element.dosageTime;
        var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        console.log("DATE : " , datestring);
        element.csvTime = datestring;
        if(map.has(datestring)){
            var getElement = map.get(datestring);
            getElement.dosageType = element.dosageType;
            getElement.dosageUnits = element.dosageUnits;
            map.set(datestring, getElement);
        }else {
          map.set(datestring, element);
        }
      }
  };

  exports.addActivityElementsToMap = function(activityRecord, map) {
    for(let i =0; i< activityRecord.length; i++){
        var element = activityRecord[i];
        var d = element.activityTime;
        var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        console.log("DATE : " , datestring);
        element.csvTime = datestring;
        if(map.has(datestring)){
            var getElement = map.get(datestring);
            getElement.activityType = element.activityType;
            getElement.activityDuration = element.activityDuration;
            map.set(datestring, getElement);
        }else {
          map.set(datestring, element);
        }
      }
  };

  exports.addCarbsElementsToMap = function(carbsRecord, map) {
    for(let i =0; i< carbsRecord.length; i++){
        var element = carbsRecord[i];
        var d = element.carbsTime;
        var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        console.log("DATE : " , datestring);
        element.csvTime = datestring;
        if(map.has(datestring)){
            var getElement = map.get(datestring);
            getElement.carbsType = element.carbsType;
            getElement.carbsItem = element.carbsItem;
            map.set(datestring, getElement);
        }else {
          map.set(datestring, element);
        }
      }
  };

  exports.addGlucoseElementsToMap = function(glucoseRecord, map) {
    for(let i =0; i< glucoseRecord.length; i++){
        var element = glucoseRecord[i];
        var d = element.glucoseTime;
        var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        console.log("DATE : " , datestring);
        element.csvTime = datestring;
        if(map.has(datestring)){
            var getElement = map.get(datestring);
            getElement.glucoseType = element.glucoseType;
            getElement.glucoseLevelUnits = element.glucoseLevelUnits;
            map.set(datestring, getElement);
        }else {
          map.set(datestring, element);
        }
      }
  };