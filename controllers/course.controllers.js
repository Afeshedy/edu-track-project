import e from "express";
import Course from "../models/course.model.js";


/**
 * Api endpoint to Create a new course
 */
export const createCourse = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (req.user.role !== "Teacher") {
            let error = new Error("Only teachers can create courses");
            error.statusCode = 403;
            throw error;
        }

        const course = await Course.create({
            title,
            description,
            teacher: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course
        });
    } catch (error) {
        next(error);
    }
}


/**
 * Api endpoint to Get all courses
 */
export const getCourses = async(req, res, next) => {
    try {
        const Courses = await Course.find().populate('teacher', 'name email');
        res.status(200).json({success: true, data: Courses});
    } catch (error) {
        next(error);
    }
};


/**
 * Api endpoint to Get a particular course
 */
export const getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name email');
        if (!course) {
            let error = new Error("Course not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        next(error);
    }
};


/**
 * Api endpoint to Update a course
 */
export const updateCousre = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            let error = new Error("Course not found");
            error.statusCode = 404;
            throw error;
        }

        if (course.teacher.toString() !== req.params._id.toString()){
            let error = new Error('Not authorised');
            error.statusCode = 401
        };


        const Updates = {
            title: req.body.title,
            description: req.body.description,
        };

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { new: true, runValidators: true }
        );

        res.status(201).json({ success: true, data: updatedCourse });
    } catch (error) {
        
    }
};

/**
 * Api endpoint to Delete a course
 */

export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            let error = new Error("Course not found");
            error.statusCode = 404;
            throw error;
        };

        if (course.teacher.toString() !== req.params._id.toString()){
            let error = new Error('Not authorised');
            error.statusCode = 401
            throw error;
        };

        await course.deleteOne();

        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        next(error);
    }
};

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;
