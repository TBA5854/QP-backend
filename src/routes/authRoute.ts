import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { revokeAdmin, makeUserAdmin } from "../controllers/adminController.js";
import { authverify, isAdmin } from "../middleware/authMiddleware.js";
const router: Router = Router();

router.get('/logout', logout);
router.post('/login', login);
router.post('/signup', signup);
router.get('/adminify', authverify, isAdmin, makeUserAdmin);
router.get('/deadminify', authverify, isAdmin, revokeAdmin);

export default router;