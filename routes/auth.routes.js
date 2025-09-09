import { Router } from "express";
import { signup } from "../controllers/auth.controllers.js";

const authRouter = Router();



authRouter.post("/signup", signup);

authRouter.post("/login", (req, res) => {
    res.send({ title: "Login a user" });
});

authRouter.post("/logout", (req, res) => {
    res.send({ title: "Logout a user" });
});

export default authRouter;
