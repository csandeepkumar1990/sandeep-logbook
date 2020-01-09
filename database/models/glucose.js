const { model, Schema } = require('mongoose');

// Glucose Schema

const GlucoseSchema = new Schema({
	user_id: Schema.ObjectId,
    email: String,
    glucoseType: String,
    glucoseTime: { type: Date, default: Date.now },
	glucoseLevelUnits: String,
	entryTime: { type: Date, default: Date.now }
});

const Glucose = model('glucose', GlucoseSchema);

module.exports = Glucose;