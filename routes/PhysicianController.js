var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";
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

router.post("/login", function(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the physicianf by email
    Physician.findOne({ email }, function(err, physician) {
        if (err) {
            return res.status(500).json({ message: "Error while fetching physician data.", error: err });
        }

        if (!physician) {
            return res.status(404).json({ message: "Email and password are required." });
        }

        // Compare the provided password with the hashed password
        bcrypt.compare(password, physician.passwordHash, function(err, isMatch) {
            if (err) {
                return res.status(500).json({ message: "Error", error: err });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password." });
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: physician._id, email: physician.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful.",
                token,
                physician: {
                    id: physician._id,
                    name: physician.name,
                    email: physician.email,
                    gender: physician.gender,
                    dob: physician.dob,
                    phone: physician.phone
                }
            });
        });
    });
});



router.get("/test", function(req, res){
    res.send('Welcome to the Healthcare API: Physician');
});

module.exports = router;