import mongoose, { Schema, Document } from 'mongoose';

// Define the Candidate schema
const candidateSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Changed from Number to String to handle leading zeros
        validate: {
            validator: (v: string): boolean => /^\d{10}$/.test(v), // Validation for exactly 10 digits
            message: (props: { value: string }) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    dob: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/di9yf5j0d/image/upload/v1695795823/om0qyogv6dejgjseakej.png'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },
    education: [{
        qualification: { type: String, required: true },
        specialization: { type: String, required: true },
        nameOfInstitution: { type: String, required: true },
        passoutYear: { type: Number, min: 1990, max: new Date().getFullYear(), required: true },
        passoutMonth: { 
            type: String, 
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 
            required: true 
        }
    }],
    experience: [{
        isFresher: { type: Boolean, required: true },
        jobRole: { type: String, required: function(this: { isFresher: boolean }) { return !this.isFresher; } },
        companyName: { type: String, required: function(this: { isFresher: boolean }) { return !this.isFresher; } },
        experienceDuration: { type: Number, min: 0, required: function(this: { isFresher: boolean }) { return !this.isFresher; } }
    }],
    skills: {
        type: [String],
        required: true
    }
});

// Define the Candidate model
export const Candidate = mongoose.model<Document & { user_id: mongoose.Schema.Types.ObjectId }>('Candidate', candidateSchema);

