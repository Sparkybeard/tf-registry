/*
  Warnings:

  - You are about to alter the column `asciiArmor` on the `GpgPublicKey` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(1000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[GpgPublicKey] ALTER COLUMN [asciiArmor] VARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
