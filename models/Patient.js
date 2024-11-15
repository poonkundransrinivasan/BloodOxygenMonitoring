const db = require("../db");


const patientSchema = new db.Schema({
    email: { type: String, required: true, unique: true }, // Email address of the patient
    passwordHash:   {type: String, required: true},
    lastAccess:     { type: Date, default: Date.now },
    name: { type: String, required: true },               // Full name of the patient
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender of the patient
    dob: { type: Date, required: true },              // Age of the patient
    address: {
        street: { type: String, required: true },        // Street address
        city: { type: String, required: true },          // City
        state: { type: String, required: true },         // State
        zip: { type: String, required: true }            // ZIP/Postal code
    },
    phone: { type: String, required: true },             // Phone number
    emergencyContact: {                                  // Emergency contact information
        name: { type: String, required: true },          // Name of the contact person
        relation: { type: String, required: true },      // Relation to the patient
        phone: { type: String, required: true }          // Phone number
    },
    primaryDoctor: { type: String }
});

const Patient = db.models.Patient || db.model('Patient', patientSchema);


module.exports = Patient