/*
  Warnings:

  - You are about to drop the column `description` on the `teams` table. All the data in the column will be lost.
  - Made the column `due_date` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "goal" TEXT,
ADD COLUMN     "plan" TEXT;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "due_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
