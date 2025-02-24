const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    userType: { type: String, enum: ['student'], required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    education: { type: [String], default: [] }, 
    projects: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
