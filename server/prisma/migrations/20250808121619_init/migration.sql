-- CreateEnum
CREATE TYPE "public"."CandidateStatus" AS ENUM ('PENDING', 'INTERVIEW', 'REJECTED', 'HIRED');

-- CreateTable
CREATE TABLE "public"."candidatos" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "observations" TEXT,
    "status" "public"."CandidateStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidatos_email_key" ON "public"."candidatos"("email");
