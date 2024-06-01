// TypeScript types for Prisma models

export type CreateUser = {
    email: string;
    fullName: string;
    phoneNumber: string;
    password: string;
  };
  
  export type CreateItem = {
    name: string;
    priceInCents: number;
    imagePath: string;
    description: string;
    isAvailableForPurchase: boolean;
    restaurantId: string;
    itemType: ItemType;
  };
  
  export type CreateOrder = {
    userId: string;
    items: string[];
    totalPrice: number;
    status: Status;
  };
  
  export type CreateNotification = {
    title: string;
    message: string;
    userId: string;
  };
  
  export type createRestaurant = {
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
    phoneNumber: string;
  };
  
  // Assuming Status and ItemType are enums, they would be defined as follows:

    export enum Status {
        PENDING = "PENDING",
        COMPLETED = "COMPLETED",
        CANCELLED = "CANCELLED",
    }

    export enum ItemType {
        DRINK = "DRINK",
        DESSERT = "DESSERT",
        APPERTIZER = "APPERTIZER",
        MAIN = "MAIN",
        STARTER = "STARTER",
    }