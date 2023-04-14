CREATE TABLE [dbo].[GpgPublicKey] (
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [keyId]          NVARCHAR (1000) NOT NULL,
    [asciiArmor]     NVARCHAR (4000) NOT NULL,
    [trustSignature] NVARCHAR (1000) NOT NULL,
    [source]         NVARCHAR (1000) NOT NULL,
    [sourceUrl]      NVARCHAR (1000) NOT NULL,
    [providerId]     INT             NOT NULL
);
GO

ALTER TABLE [dbo].[GpgPublicKey]
    ADD CONSTRAINT [GpgPublicKey_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider] ([id]) ON UPDATE CASCADE;
GO

ALTER TABLE [dbo].[GpgPublicKey]
    ADD CONSTRAINT [GpgPublicKey_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

ALTER TABLE [dbo].[GpgPublicKey]
    ADD CONSTRAINT [GpgPublicKey_providerId_key] UNIQUE NONCLUSTERED ([providerId] ASC);
GO

