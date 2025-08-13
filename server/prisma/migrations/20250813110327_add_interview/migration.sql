-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interview_candidateId_scheduledAt_idx" ON "public"."Interview"("candidateId", "scheduledAt");

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
