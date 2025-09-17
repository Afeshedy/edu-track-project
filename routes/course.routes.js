import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { createCourse, deleteCourse, getCourse, getCourses, updateCousre } from "../controllers/course.controllers.js";
import Course from "../models/course.model.js";

export const courseRouter = Router()

courseRouter.get('/', getCourses);

courseRouter.get('/:id', authorize, getCourse);

courseRouter.post('/', authorize, createCourse);

courseRouter.put('/:id',authorize, updateCousre);

courseRouter.delete('/:id', authorize, deleteCourse);

courseRouter.get("/", getCourses);