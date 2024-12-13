const db = require("../db");

const particleSchema = new db.Schema({
    deviceSerialNumber: {type: String, required: true},
    dataType: {type: String, enum: ['spo2', 'hr'], required: true},
    datavalue: {type: Number},
    publishedOn: {type: Date, default: Date.now}
});

const Particle = db.models.Particle || db.model('Particle', particleSchema);

module.exports = Particle;