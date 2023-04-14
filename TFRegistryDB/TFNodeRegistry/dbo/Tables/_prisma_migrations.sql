CREATE TABLE [dbo].[_prisma_migrations] (
    [id]                  VARCHAR (36)       NOT NULL,
    [checksum]            VARCHAR (64)       NOT NULL,
    [finished_at]         DATETIMEOFFSET (7) NULL,
    [migration_name]      NVARCHAR (250)     NOT NULL,
    [logs]                NVARCHAR (MAX)     NULL,
    [rolled_back_at]      DATETIMEOFFSET (7) NULL,
    [started_at]          DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    [applied_steps_count] INT                DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);
GO

