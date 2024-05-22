import { Router } from "express";
import { otpVerify } from "../controller/auth.controller.js";

const router = Router();

router.post("/otp-verify", otpVerify);

export default router;
