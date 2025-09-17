import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Student id is required']
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, 'Course id is required']
    },
    
    enrolledAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['active', 'dropped'],
        default: 'active'
    }

}, { timestamps: true }

);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
