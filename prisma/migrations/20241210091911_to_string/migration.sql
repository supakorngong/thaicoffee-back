/*
  Warnings:

  - Added the required column `transaction_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `evidence` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `transaction_id` VARCHAR(191) NOT NULL;

UPDATE `Order`
SET id = CAST(id AS CHAR)
WHERE id IS NOT NULL;


