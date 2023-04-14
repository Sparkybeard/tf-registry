CREATE TABLE [dbo].[Platform] (
    [id]         INT             IDENTITY (1, 1) NOT NULL,
    [os]         NVARCHAR (1000) NOT NULL,
    [arch]       NVARCHAR (1000) NOT NULL,
    [shasum]     NVARCHAR (1000) NOT NULL,
    [filename]   NVARCHAR (1000) NOT NULL,
    [providerId] INT             NOT NULL
);
GO

ALTER TABLE [dbo].[Platform]
    ADD CONSTRAINT [Platform_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Version] ([id]) ON UPDATE CASCADE;
GO

ALTER TABLE [dbo].[Platform]
    ADD CONSTRAINT [Platform_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

