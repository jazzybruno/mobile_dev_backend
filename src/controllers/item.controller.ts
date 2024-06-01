import { Router } from "express";
import prisma from "../config/prisma";
import ApiResponse from "../utils/ApiResponse";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { CreateItem } from '../types/requests/requests.payload.type';

const itemRouter = Router();

itemRouter.get("/" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Item'] */
    
    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const items = await prisma.item.findMany();
        res.status(200).json(new ApiResponse(items, "Items fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

itemRouter.get("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Item'] */

     /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const item = await prisma.item.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!item)
            return res.status(404).json(new ApiResponse(null, "Item not found", false));
        res.status(200).json(new ApiResponse(item, "Item fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


itemRouter.post("/create" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Item'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    /* #swagger.parameters['createItem'] = {
        in: 'body',
        description: 'Item information',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/CreateItem" }
    } */

    try {
        const { name , priceInCents, imagePath , description , isAvailableForPurchase , restaurantId , itemType } = req.body as CreateItem;
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
        });
        if (!restaurant)
            return res.status(404).json(new ApiResponse(null, "Restaurant not found", false));

        const item = await prisma.item.create({
            data: {
                name,
                priceInCents,
                imagePath,
                description,
                isAvailableForPurchase,
                restaurant : {
                    connect : {
                        id : restaurantId
                    }
                },
                itemType
        },
    });

        res.status(201).json(new ApiResponse(item, "Item created successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


itemRouter.put("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Item'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    /* #swagger.parameters['updateItem'] = {
        in: 'body',
        description: 'Item information',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/CreateItem" }
    } */

    try {
        const { name , priceInCents, imagePath , description , isAvailableForPurchase , restaurantId } = req.body as CreateItem;
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
        });
        if (!restaurant)
            return res.status(404).json(new ApiResponse(null, "Restaurant not found", false));

        const item = await prisma.item.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
                priceInCents,
                imagePath,
                description,
                isAvailableForPurchase,
                restaurant : {
                    connect : {
                        id : restaurantId
                    }
                }
            },
        });

        res.status(200).json(new ApiResponse(item, "Item updated successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


itemRouter.delete("/:id" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Item'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {
        const item = await prisma.item.delete({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(new ApiResponse(item, "Item deleted successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


itemRouter.get("/restaurant/:restaurantId" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Item'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    try {
        const items = await prisma.item.findMany({
            where: {
                restaurantId: req.params.restaurantId,
            },
        });
        res.status(200).json(new ApiResponse(items, "Items fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
})

export default itemRouter;


