import { Router } from "express";

import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../Controllers/Payment.js";

const router = Router();

router.get("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

export default router;