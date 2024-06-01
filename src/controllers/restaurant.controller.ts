import { Router } from "express";
import prisma from "../config/prisma";
import ApiResponse from "../utils/ApiResponse";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { log } from "console";

const restaurantRouter = Router();

restaurantRouter.get("/" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Restaurant'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const restaurants = await prisma.restaurant.findMany();
        res.status(200).json(new ApiResponse(restaurants, "Restaurants fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

restaurantRouter.get("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Restaurant'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!restaurant)
            return res.status(404).json(new ApiResponse(null, "Restaurant not found", false));
        res.status(200).json(new ApiResponse(restaurant, "Restaurant fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


restaurantRouter.post("/create" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Restaurant'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        let { name, address, phoneNumber , imageUrl , rating } = req.body;
        rating = parseFloat(rating)
        const restaurant = await prisma.restaurant.create({
            data: {
                name,
                address,
                imageUrl,
                phoneNumber,
                rating
            },
        });
        res.status(201).json(new ApiResponse(restaurant, "Restaurant created successfully", true));
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
})

restaurantRouter.put("/update/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Restaurant'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const { name, address, phoneNumber , imageUrl , rating } = req.body;
        const restaurant = await prisma.restaurant.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
                address,
                imageUrl,
                phoneNumber,
                rating
            },
        });
        res.status(200).json(new ApiResponse(restaurant, "Restaurant updated successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

restaurantRouter.delete("/delete/:id", authenticationMiddleware ,  async (req, res) => {
    /* #swagger.tags = ['Restaurant'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    
    try {
        await prisma.restaurant.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(new ApiResponse(null, "Restaurant deleted successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

export default restaurantRouter;