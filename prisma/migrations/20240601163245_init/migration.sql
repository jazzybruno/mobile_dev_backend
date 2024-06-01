/*
  Warnings:

  - Added the required column `itemType` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('APPERTIZER', 'STARTER', 'MAIN', 'DRINK', 'DESSERT');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemType" "ItemType" NOT NULL;
