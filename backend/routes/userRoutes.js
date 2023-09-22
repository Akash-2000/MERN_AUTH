import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/usercontroller.js";
import { protect } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;
