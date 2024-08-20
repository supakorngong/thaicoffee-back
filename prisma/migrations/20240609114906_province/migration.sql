/*
  Warnings:

  - Added the required column `province` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `province` VARCHAR(191) NOT NULL;
