const express = require('express');
const Particle = require('../models/Particle');
const Patient = require('../models/patient');

const router = express.Router();

// Create a new particle entry
router.post('/particles', async (req, res) => {
    try {
        const { deviceSerialNumber, dataType, datavalue } = req.body;

        // Validate required fields
        if (!deviceSerialNumber || !dataType || datavalue == null) {
            return res.status(400).json({ error: 'Every field is required.' });
        }

        // Check if the device is registered to any patient
        const registeredPatient = await Patient.findOne({ deviceSerialNumber });
        if (!registeredPatient) {
            return res.status(400).json({ error: 'Device not registered to any patient.' });
        }

        // Create a new particle document
        const newParticle = new Particle({
            deviceSerialNumber,
            dataType,
            datavalue
        });

        // Save to the database
        const savedParticle = await newParticle.save();
        res.status(201).json(savedParticle);
    } catch (error) {
        console.error('Error saving particle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
