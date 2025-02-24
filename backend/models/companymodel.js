const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    userType: { type: String, enum: ['company'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    website: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
