const mongoose = require('mongoose');

const ingestionSchema = new mongoose.Schema({
  deviceID: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

const Ingestion = mongoose.model('Ingestion', ingestionSchema);

module.exports = Ingestion;
