/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAddress]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `area` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "userAddress" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_userAddress_key" ON "Address"("userAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profileId_key" ON "Profile"("profileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
