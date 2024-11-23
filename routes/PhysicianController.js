var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Import the Physician model
const Physician = require('../models/physician');

// Register Physician API route
router.post('/register', function (req, res) {
    const { email, password, name, gender, phone, specialization, qualifications } = req.body;

    // Check if the email already exists
    Physician.findOne({ email }, function (err, existingPhysician) {
        if (err) {
            return res.status(500).send(err);
        }

        if (existingPhysician) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Hash the password before saving
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return res.status(500).send(err);
            }

            bcrypt.hash(password, salt, function (err, passwordHash) {
                if (err) {
                    return res.status(500).send(err);
                }

                const physician = new Physician({
                    email,
                    passwordHash,
                    name,
                    gender,
                    phone,
                    specialization,
                    qualifications
                });

                physician.save(function (err, newPhysician) {
                    if (err) {
                        return res.status(400).send(err);
                    } else {
                        const msgStr = `New physician with ID: (${email}) has been registered.`;
                        res.status(201).json({ message: msgStr });
                        console.log(msgStr);
                    }
                });
            });
        });
    });
});



router.get("/test", function(req, res){
    res.send('Welcome to the Healthcare API: Physician');
});

module.exports = router;