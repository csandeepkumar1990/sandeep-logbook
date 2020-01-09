const express = require('express');

const singUpHandler = require('./sign_up');
const loginHandler = require('./login');
const logoutHandler = require('./logout');
const { getUrl, cb } = require('./twitter_login');
const { tweetImgCb, tweetImgUrl, multerConfig } = require('./tweet_img');
const { auth, checkAuth } = require('./auth');
const insulin = require('./insulin');
const activity = require('./activity');
const carbs = require('./carbs');
const glucose = require('./glucose');
const exportData = require('./export');

const router = express.Router();

//Auth
router.post('/signup', singUpHandler);
router.post('/login', loginHandler);
router.get('/twitter-login', getUrl);
router.get('/twitter/cb', cb);
router.get('/check-auth', checkAuth);
router.get('/logout', auth, logoutHandler);
router.post('/tweet-img', auth, multerConfig.single('image'), tweetImgUrl);
router.get('/tweet-img/cb', auth, tweetImgCb);

//Insulin
router.post('/insulin', insulin.create);
router.post('/insulinGetByDate',auth, insulin.get);

//Activity
router.post('/activity', activity.create);
router.post('/activityGetByDate',auth, activity.get);

//Carbs
router.post('/carbs', carbs.create);
router.get('/carbs', carbs.getall);
router.post('/carbsGetByDate',auth, carbs.get);

//Glucose
router.post('/glucose', glucose.create);
router.get('/glucose', glucose.getall);
router.post('/glucoseGetByDate',auth, glucose.get);
router.get('/getLatestGlucoseLevel', glucose.getLatestGlucoseLevel);
router.post('/getLatestGlucoseLevelByTime', glucose.getLatestGlucoseLevelByTime);

//Chart
router.post('/getChartData', auth, insulin.getChartData);

//CSV
router.get('/exportHistory', exportData.exportHistory);
router.post('/export', exportData.export);

module.exports = router;
