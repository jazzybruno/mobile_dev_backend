import { Router } from "express";
import prisma from "../config/prisma";
import ApiResponse from "../utils/ApiResponse";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import itemRouter from "./item.controller";
import { CreateOrder } from "../types/requests/requests.payload.type";

const orderRouter = Router();

orderRouter.get("/" , authenticationMiddleware , async (req, res) => {
    /* #swagger.tags = ['Order'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */


    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(new ApiResponse(orders, "Orders fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

orderRouter.get("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Order'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!order)
            return res.status(404).json(new ApiResponse(null, "Order not found", false));
        res.status(200).json(new ApiResponse(order, "Order fetched successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});

orderRouter.post("/create" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Order'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    /* #swagger.parameters['createOrder'] = {
        in: 'body',
        description: 'Order information',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/CreateOrder" }
    } */

    try {
        const { userId , totalPrice , status , items } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            return res.status(404).json(new ApiResponse(null, "User not found", false));
        
        const itemsExist = await prisma.item.findMany({
            where : {
                id : {
                    in : items.map((item : any) => item.itemId)
                }
            }
        });

        if(itemsExist.length !== items.length)
            return res.status(404).json(new ApiResponse(null, "Items not found", false));

        const order = await prisma.order.create({
            data: {
                totalPrice,
                status,
                user : {
                    connect : {
                        id : userId
                    }
                },
                items: {
                    connect : items.map((item : any) => {
                        return {
                            id : item.itemId
                        }
                    })
            }
        }});
        res.status(201).json(new ApiResponse(order, "Order created successfully", true));
    }
    catch (error: any) {
        res.status(500).json(new ApiResponse(null, "Internal server error", false, error?.message));
    }
});


orderRouter.put("/:id" , authenticationMiddleware, async (req, res) => {
    /* #swagger.tags = ['Order'] */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */

    try {
        const { userId , totalPrice , status , items } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            return res.status(404).json(new ApiResponse(null, "User not found", false));
        
        const itemsExist = await prisma.item.findMany({
            where : {
                id : {
                    in : items.map((item : any) => item.itemId)
                }
            }
        });

        if(itemsExist.length !== items.length)
            return res.status(404).json(new ApiResponse(null, "Items not found", false));

        const order = await prisma.order.update({
            where: {
                id: req.params.id,
            },
            data: {
                totalPrice,
                status,
                user : {
                    connect : {
                        id : userId
                    }
                },
                items: {
                    set : items.map((item : any) => {
                        return {
                            id : item.itemId
                        }
                    })
                }
            }
        });
        res.status(200).json(new ApiResponse(order, "Order updated successfully", true));
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

export default orderRouter;