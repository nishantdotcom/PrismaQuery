/*
  Warnings:

  - Added the required column `hoobydesc` to the `Hobby` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Hobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hobby" ADD COLUMN     "hoobydesc" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Hobby" ADD CONSTRAINT "Hobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
