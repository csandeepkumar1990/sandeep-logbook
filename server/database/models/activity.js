const { model, Schema } = require('mongoose');

// Activity Schema

const ActivitySchema = new Schema({
	user_id: Schema.ObjectId,
	email: String,
	activityType: String,
	activityDuration: Object,
	activityTime: { type: Date, default: Date.now },
	latestGlucoseLevelUnits: String,
	entryTime: { type: Date, default: Date.now }
});

const Activity = model('activity', ActivitySchema);

module.exports = Activity;
