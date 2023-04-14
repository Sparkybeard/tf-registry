CREATE TABLE [dbo].[Provider] (
    [id]           INT             IDENTITY (1, 1) NOT NULL,
    [namespace]    NVARCHAR (1000) NOT NULL,
    [type]         NVARCHAR (1000) NOT NULL,
    [published_at] DATETIME2 (7)   NOT NULL
);
GO

ALTER TABLE [dbo].[Provider]
    ADD CONSTRAINT [Provider_published_at_df] DEFAULT (getdate()) FOR [published_at];
GO

ALTER TABLE [dbo].[Provider]
    ADD CONSTRAINT [Provider_pkey] PRIMARY KEY CLUSTERED ([id] ASC);
GO

