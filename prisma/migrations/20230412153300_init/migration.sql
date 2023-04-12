BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Provider] (
    [id] INT NOT NULL IDENTITY(1,1),
    [namespace] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [published_at] DATETIME2 NOT NULL CONSTRAINT [Provider_published_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Provider_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Version] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [providerId] INT NOT NULL,
    CONSTRAINT [Version_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Version_providerId_key] UNIQUE NONCLUSTERED ([providerId])
);

-- CreateTable
CREATE TABLE [dbo].[VersionProtocol] (
    [id] INT NOT NULL IDENTITY(1,1),
    [versionId] INT NOT NULL,
    [protocolId] INT NOT NULL,
    CONSTRAINT [VersionProtocol_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Protocol] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Protocol_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Platform] (
    [id] INT NOT NULL IDENTITY(1,1),
    [os] NVARCHAR(1000) NOT NULL,
    [arch] NVARCHAR(1000) NOT NULL,
    [shasum] NVARCHAR(1000) NOT NULL,
    [filename] NVARCHAR(1000) NOT NULL,
    [providerId] INT NOT NULL,
    CONSTRAINT [Platform_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GpgPublicKey] (
    [id] INT NOT NULL IDENTITY(1,1),
    [keyId] NVARCHAR(1000) NOT NULL,
    [asciiArmor] NVARCHAR(1000) NOT NULL,
    [trustSignature] NVARCHAR(1000) NOT NULL,
    [source] NVARCHAR(1000) NOT NULL,
    [sourceUrl] NVARCHAR(1000) NOT NULL,
    [providerId] INT NOT NULL,
    CONSTRAINT [GpgPublicKey_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [GpgPublicKey_providerId_key] UNIQUE NONCLUSTERED ([providerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Version] ADD CONSTRAINT [Version_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VersionProtocol] ADD CONSTRAINT [VersionProtocol_versionId_fkey] FOREIGN KEY ([versionId]) REFERENCES [dbo].[Version]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VersionProtocol] ADD CONSTRAINT [VersionProtocol_protocolId_fkey] FOREIGN KEY ([protocolId]) REFERENCES [dbo].[Protocol]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Platform] ADD CONSTRAINT [Platform_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Version]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GpgPublicKey] ADD CONSTRAINT [GpgPublicKey_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
