-- AddForeignKey
ALTER TABLE "role_requests" ADD CONSTRAINT "role_requests_nip_fkey" FOREIGN KEY ("nip") REFERENCES "companies"("nip") ON DELETE SET NULL ON UPDATE CASCADE;
