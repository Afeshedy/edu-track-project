import mongoose from "mongoose";


/**
 * The model for the course
 * 
 * Fields:
 *    title: The cousre title
 *    description: the course description
 *    teacher: the teacher that owns the course
 *    studesnts: the students that are enrolled in the course
 */
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    description: {
        type: String,
        required: [true, 'course description is required'],
        trim: true,
        maxlength: 500
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Every course must have a teacher'],
        ref: 'User'
    },
}, 
 { timestamps: true }
);


courseSchema.index({ teacher: 1 });
courseSchema.index({ title: 'text', description: 'text' });


const Course = mongoose.model('Course', courseSchema);
export default Course;
 