CREATE TABLE [dbo].[Protocol] (
    [id]   INT             IDENTITY (1, 1) NOT NULL,
    [name] NVARCHAR (1000) NOT NULL
);
GO

ALTER TABLE [dbo].[Protocol]
    ADD CONSTRAINT [Protocol_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

