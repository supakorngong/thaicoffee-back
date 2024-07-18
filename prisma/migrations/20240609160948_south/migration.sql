/*
  Warnings:

  - The values [south] on the enum `Product_region` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `region` ENUM('North', 'Mid', 'South', 'NorthEast') NOT NULL;
