CREATE TABLE [dbo].[Version] (
    [id]         INT             IDENTITY (1, 1) NOT NULL,
    [name]       NVARCHAR (1000) NOT NULL,
    [providerId] INT             NOT NULL
);
GO

ALTER TABLE [dbo].[Version]
    ADD CONSTRAINT [Version_providerId_key] UNIQUE NONCLUSTERED ([providerId] ASC);
GO

ALTER TABLE [dbo].[Version]
    ADD CONSTRAINT [Version_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

ALTER TABLE [dbo].[Version]
    ADD CONSTRAINT [Version_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider] ([id]) ON UPDATE CASCADE;
GO

