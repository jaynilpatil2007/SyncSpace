import { Router } from "express";
import { signup, login, logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(verifyJWT, logout);

router.route("/check").get(verifyJWT, (req, res) => {
    res.status(200).json(req.user);
});

export default router;