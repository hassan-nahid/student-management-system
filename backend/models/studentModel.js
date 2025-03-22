import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
});

const guardianDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    relation: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
        unique: true, // Assuming roll numbers are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    courseEnrolled: {
        type: String,
        required: true,
    },
    class: {  
        type: String,
        required: true,
    },
    session: { 
        type: String,
        required: true,
    },
    guardianDetails: {
        type: guardianDetailsSchema,
        required: true,
    },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
