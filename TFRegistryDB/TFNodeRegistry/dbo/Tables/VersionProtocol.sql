CREATE TABLE [dbo].[VersionProtocol] (
    [id]         INT IDENTITY (1, 1) NOT NULL,
    [versionId]  INT NOT NULL,
    [protocolId] INT NOT NULL
);
GO

ALTER TABLE [dbo].[VersionProtocol]
    ADD CONSTRAINT [VersionProtocol_versionId_fkey] FOREIGN KEY ([versionId]) REFERENCES [dbo].[Version] ([id]) ON UPDATE CASCADE;
GO

ALTER TABLE [dbo].[VersionProtocol]
    ADD CONSTRAINT [VersionProtocol_protocolId_fkey] FOREIGN KEY ([protocolId]) REFERENCES [dbo].[Protocol] ([id]) ON UPDATE CASCADE;
GO

ALTER TABLE [dbo].[VersionProtocol]
    ADD CONSTRAINT [VersionProtocol_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

