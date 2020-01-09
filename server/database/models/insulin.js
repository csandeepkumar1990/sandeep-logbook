const { model, Schema } = require('mongoose');

// Insulin Schema

const InsulinSchema = new Schema({
	user_id: Schema.ObjectId,
	email: String,
	dosageType: String,
	dosageTime: { type: Date, default: Date.now },
	dosageUnits: String,
	latestGlucoseLevelUnits: String,
	entryTime: { type: Date, default: Date.now }
});

const Insulin = model('insulin', InsulinSchema);

module.exports = Insulin;
