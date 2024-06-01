import { Router } from "express";
import notificationRouter from "./controllers/notification.controller";
import orderRouter from "./controllers/order.controller";
import restaurantRouter from "./controllers/restaurant.controller";
import AuthRouter from "./controllers/auth.controller";
import userRouter from "./controllers/user.controller";
import itemRouter from "./controllers/item.controller";

const router = Router();

router.use("/api/auth", AuthRouter);
router.use("/api/user", userRouter);
router.use("/api/restaurant", restaurantRouter);
router.use("/api/order", orderRouter);
router.use("/api/notification", notificationRouter);
router.use("/api/item", itemRouter);

export default router;
