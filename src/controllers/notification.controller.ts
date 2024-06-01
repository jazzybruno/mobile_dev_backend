import { Router } from "express";
import prisma from "../config/prisma";
import ApiResponse from "../utils/ApiResponse";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const notificationRouter = Router();

notificationRouter.get("/" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const notifications = await prisma.notification.findMany({include : { user : true }});
        res.status(200).json(new ApiResponse(notifications, "Notifications fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

notificationRouter.get("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const notification = await prisma.notification.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!notification)
            return res.status(404).json(new ApiResponse(null, "Notification not found", false));
        res.status(200).json(new ApiResponse(notification, "Notification fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

notificationRouter.post("/create" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const { title , message , userId } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            return res.status(404).json(new ApiResponse(null, "User not found", false));

        const notification = await prisma.notification.create({
            data: {
                title,
                message,
                user : {
                    connect : {
                        id : userId
                    }
                }
            }
        });
        res.status(201).json(new ApiResponse(notification, "Notification created successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


notificationRouter.put("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const { message , userId } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            return res.status(404).json(new ApiResponse(null, "User not found", false));

        const notification = await prisma.notification.update({
            where: {
                id: req.params.id,
            },
            data: {
                message,
                user : {
                    connect : {
                        id : userId
                    }
                }
            }
        });
        res.status(200).json(new ApiResponse(notification, "Notification updated successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

notificationRouter.delete("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const notification = await prisma.notification.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(new ApiResponse(notification, "Notification deleted successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

notificationRouter.get("/user/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Notification'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user)
            return res.status(404).json(new ApiResponse(null, "User not found", false));

        const notifications = await prisma.notification.findMany({
            where : {
                userId : req.params.id
            }
        });
        res.status(200).json(new ApiResponse(notifications, "Notifications fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
}
);

export default notificationRouter;