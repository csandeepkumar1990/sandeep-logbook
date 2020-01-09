const { model, Schema } = require('mongoose');

// Carbs Schema

const CarbsSchema = new Schema({
	user_id: Schema.ObjectId,
	email: String,
	carbsType: String,
	carbsItem: String,
	carbsTime: { type: Date, default: Date.now },
	latestGlucoseLevelUnits: String,
	entryTime: { type: Date, default: Date.now }
});

const Carbs = model('carbs', CarbsSchema);

module.exports = Carbs;
