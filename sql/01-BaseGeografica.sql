CREATE DATABASE [NerdStore]
GO

USE [NerdStore]
GO

/****** Object:  Sequence [dbo].[MinhaSequencia]    Script Date: 29-08-20 19:09:54 ******/
CREATE SEQUENCE [dbo].[MinhaSequencia] 
 AS [int]
 START WITH 1000
 INCREMENT BY 1
 MINVALUE -2147483648
 MAXVALUE 2147483647
 CACHE 
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[Id] [uniqueidentifier] NOT NULL,
	[PublicPlace] [varchar](200) NOT NULL,
	[Number] [varchar](50) NOT NULL,
	[Complement] [varchar](250) NULL,
	[Neighborhood] [varchar](100) NOT NULL,
	[Cep] [varchar](20) NOT NULL,
	[City] [varchar](100) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Banners]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banners](
	[Id] [uniqueidentifier] NOT NULL,
	[Image] [varchar](100) NULL,
	[AltImage] [varchar](100) NULL,
	[Title] [varchar](100) NULL,
	[SubTitle] [varchar](100) NULL,
	[Message] [varchar](100) NULL,
	[TimeSleep] [int] NOT NULL,
 CONSTRAINT [PK_Banners] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](200) NOT NULL,
	[Email] [varchar](254) NULL,
	[Cpf] [varchar](11) NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientCarts]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientCarts](
	[Id] [uniqueidentifier] NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
	[ValueTotal] [decimal](18, 2) NOT NULL,
	[VoucherUsed] [bit] NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[Percentage] [decimal](18, 2) NULL,
	[DiscountValue] [decimal](18, 2) NULL,
	[VoucherCode] [varchar](50) NULL,
	[DiscountType] [int] NULL,
 CONSTRAINT [PK_ClientCarts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientWishLists]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientWishLists](
	[Id] [uniqueidentifier] NOT NULL,
	[ClientWishListId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_ClientWishLists] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCarts]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCarts](
	[Id] [uniqueidentifier] NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](100) NULL,
	[Quantity] [int] NOT NULL,
	[Value] [decimal](18, 2) NOT NULL,
	[Image] [varchar](100) NULL,
	[CarrinhoId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_ItemCarts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemWishLists]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemWishLists](
	[Id] [uniqueidentifier] NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Name] [varchar](100) NULL,
	[Image] [varchar](100) NULL,
	[WishListId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_ItemWishLists] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderItems]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItems](
	[Id] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[ProductName] [varchar](250) NOT NULL,
	[Quantity] [int] NOT NULL,
	[ValueUnity] [decimal](18, 2) NOT NULL,
	[ProductImage] [varchar](100) NULL,
 CONSTRAINT [PK_OrderItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [uniqueidentifier] NOT NULL,
	[Code] [int] NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
	[VoucherId] [uniqueidentifier] NULL,
	[VoucherUsed] [bit] NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[ValueTotal] [decimal](18, 2) NOT NULL,
	[DataRegister] [datetime2](7) NOT NULL,
	[OrderStatus] [int] NOT NULL,
	[PublicPlace] [varchar](100) NULL,
	[Number] [varchar](100) NULL,
	[Complement] [varchar](100) NULL,
	[Neighborhood] [varchar](100) NULL,
	[Cep] [varchar](100) NULL,
	[City] [varchar](100) NULL,
	[State] [varchar](100) NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Id] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
	[PaymentType] [int] NOT NULL,
	[Value] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[Active] [bit] NOT NULL,
	[Value] [decimal](18, 2) NOT NULL,
	[DateRegister] [datetime2](7) NOT NULL,
	[Image] [varchar](250) NOT NULL,
	[QuantityStock] [int] NOT NULL,
	[Highlighted] [bit] NOT NULL,
	[ProductType] [int] NOT NULL,
	[ProductCategory] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[Id] [uniqueidentifier] NOT NULL,
	[Username] [nvarchar](max) NULL,
	[Token] [uniqueidentifier] NOT NULL,
	[ExpirationDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_RefreshTokens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SecurityKeys]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SecurityKeys](
	[Id] [uniqueidentifier] NOT NULL,
	[Parameters] [nvarchar](max) NULL,
	[KeyId] [nvarchar](max) NULL,
	[Type] [nvarchar](max) NULL,
	[Algorithm] [nvarchar](max) NULL,
	[CreationDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_SecurityKeys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[Id] [uniqueidentifier] NOT NULL,
	[AuthorizationCode] [varchar](100) NOT NULL,
	[FlagCard] [varchar](100) NOT NULL,
	[DateTransaction] [datetime2](7) NULL,
	[ValueTotal] [decimal](18, 2) NOT NULL,
	[CostTransaction] [decimal](18, 2) NOT NULL,
	[Status] [int] NOT NULL,
	[TID] [varchar](100) NOT NULL,
	[NSU] [varchar](100) NOT NULL,
	[PaymentId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vouchers]    Script Date: 01/03/2023 11:39:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vouchers](
	[Id] [uniqueidentifier] NOT NULL,
	[Code] [varchar](100) NOT NULL,
	[Percentage] [decimal](18, 2) NULL,
	[ValueDiscount] [decimal](18, 2) NULL,
	[Quantity] [int] NOT NULL,
	[DiscountType] [int] NOT NULL,
	[DataCreation] [datetime2](7) NOT NULL,
	[DataUse] [datetime2](7) NULL,
	[DataValidad] [datetime2](7) NOT NULL,
	[Active] [bit] NOT NULL,
	[Used] [bit] NOT NULL,
 CONSTRAINT [PK_Vouchers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Banners] ADD  DEFAULT ((0)) FOR [TimeSleep]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (NEXT VALUE FOR [MinhaSequencia]) FOR [Code]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Highlighted]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [ProductType]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [ProductCategory]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_Client_ClientId] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_Client_ClientId]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[ItemCarts]  WITH CHECK ADD  CONSTRAINT [FK_ItemCarts_ClientCarts_CarrinhoId] FOREIGN KEY([CarrinhoId])
REFERENCES [dbo].[ClientCarts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemCarts] CHECK CONSTRAINT [FK_ItemCarts_ClientCarts_CarrinhoId]
GO
ALTER TABLE [dbo].[ItemWishLists]  WITH CHECK ADD  CONSTRAINT [FK_ItemWishLists_ClientWishLists_WishListId] FOREIGN KEY([WishListId])
REFERENCES [dbo].[ClientWishLists] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemWishLists] CHECK CONSTRAINT [FK_ItemWishLists_ClientWishLists_WishListId]
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD  CONSTRAINT [FK_OrderItems_Orders_OrderId] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([Id])
GO
ALTER TABLE [dbo].[OrderItems] CHECK CONSTRAINT [FK_OrderItems_Orders_OrderId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Vouchers_VoucherId] FOREIGN KEY([VoucherId])
REFERENCES [dbo].[Vouchers] ([Id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Vouchers_VoucherId]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Payments_PaymentId] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[Payments] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Payments_PaymentId]
GO

GO
INSERT [dbo].[Banners] ([Id], [Image], [AltImage], [Title], [SubTitle], [Message], [TimeSleep]) VALUES (N'db25d95d-4e07-4446-b1ed-0427d18240e4', N'banner-04.jpg', N'Banner-01', N'Sla', N'Sla2', N'Compre Mais', 800)
INSERT [dbo].[Banners] ([Id], [Image], [AltImage], [Title], [SubTitle], [Message], [TimeSleep]) VALUES (N'c5643885-ed22-4abd-a29e-4b8962fada59', N'banner-05.jpg', N'Banner-01', N'Sla', N'Sla2', N'Compre Mais', 1200)
INSERT [dbo].[Banners] ([Id], [Image], [AltImage], [Title], [SubTitle], [Message], [TimeSleep]) VALUES (N'17ac1dd1-92bd-40c9-b508-722c2c32db20', N'banner-06.jpg', N'Banner-01', N'Sla', N'Sla2', N'Compre Mais', 8000)
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'153d45fb-47c6-4df1-9fb0-07a7a404cd90', N'O incrível livro do Gildo', N'Em um dia de inspiração, Gildo, com o apoio da irmã Laurinha, do pai, da mãe e dos amigos, começa a escrever um livro – uma incrível narrativa assustadora sobre monstros!', 1, CAST(26.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'livrodegildo.jpg', 1000, 1, 1, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7d67df76-2d4e-4a47-a19c-08eb80a9060b', N'Fire TV Stick Lite', N'Streaming em Full HD com Alexa | Com Controle Remoto Lite por Voz com Alexa (sem controles de TV.', 1, CAST(230.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'firestick.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7d67da76-2f4e-4a47-a1bc-08eb81a9060b', N'Xiaomi Redmi Note 11 Graphite', N'Smartphone Xiaomi Redmi Note 11 Dual 128gb 6gb Ram - Graphite Gray/cinza - Global Tela AMOLED Mergulhe em um mundo de maravilhas A tela retroiluminada oferece o que há de mais moderno em brilho, contraste, calibração de cores e resolução.', 1, CAST(2230.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'note11graphit.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'798f73f3-fcf8-48df-ae4f-0be18af00064', N'Teclado e Mouse sem fio Logitech MK540', N'Teclado em Layout ABNT2 Experiência de digitação instantaneamente familiar.', 1, CAST(199.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'mk540.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'3ec63bb1-e853-4cd9-afe5-0c798142b809', N'Wacom CTL4100 - Mesa Digitalizadora Intuos Creative, Preto', N'Crie o que quiser, do jeito que quiser; uma mesa digitalizadora projetada inteiramente em torno de sua paixão Uma parceria natural; a primeira coisa que você perceberá ao utilizar a Wacom Intuos é como ela é natural.', 1, CAST(303.63 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'CTL4100.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'da53ec70-e529-4839-af97-0e9e29cc143f', N'Fone de Ouvido QCY T20', N'Reproduza som de alta qualidade sem a confusão de fios com o diafragma composto LCP de 13 mm.', 1, CAST(159.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'QCYT20.png', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'99e06236-9e39-4eb7-87de-12e50f73c4bd', N'Samsung Galaxy A03s Câmera Tripla', N'Mais tela, mais espaço para jogar Expanda seu campo de visão com a tela Infinity-V de 6,5 polegadas do Galaxy A03s para não perder nada. E com a tecnologia HD +, seu conteúdo fica com muito mais foco, nitidez e claridade. Conforto para os olhos e as mãos. O Galaxy A03s combina cores clássicas com um acabamento suave ao toque.', 1, CAST(2340.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'A03s.webp', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'4e2df8c9-dd42-4353-a42a-1b8094f88c67', N'Echo Dot (3ª Geração): Smart Speaker com Alexa', N'O Echo Dot é o nosso smart speaker de maior sucesso. Controlado por voz com Alexa, ele é perfeito para qualquer ambiente. Você pode pedir músicas, notícias, informações e muito mais. Além de ligar para amigos e familiares e controlar dispositivos compatíveis de casa inteligente com sua voz.', 1, CAST(331.55 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'EchoAlexa1.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'1548d2a2-c892-4e90-943d-1cdc6e5d319e', N'Antena Analógica/Digital Interna Smart View 4K HDR', N'Alto desempenho e ótima recepção de sinal com ganho de 4 dB. Recepção otimizada em 360° omnidirecional que garante perfeita sintonia de canais. Imagem Full HD 1080p e som totalmente digital.', 1, CAST(13.21 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AntenaAnalógicadigital.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'76a739ec-6301-4f32-9c5c-1f76dbbc499c', N'Smart TV LED 32" HD Samsung UN32T4300AGXZD - Wifi, HDMI, USB', N'Tela: Resolução HD e 1,366 x 768 pixels, HDR, Frequência da tela 60, PQI (Picture Quality Index) 900, Painel 100% RGB.', 1, CAST(1299.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'UN32T4300AGXZD.webp', 1000, 1, 3, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'ba8cf31a-b8b6-40b4-8067-21f3f9a6a58e', N'Console Nintendo Switch + Controle Pro', N'O Nintendo switch foi desenvolvido para fazer parte da sua vida, transformando-se de um console doméstico em um console portátil num piscar de olhos.', 1, CAST(2616.39 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'ConsoleNintendoSwitch.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'506ed45c-4b44-4b31-9e5d-28802d0447d9', N'Smart TV LED 55" 4K UHD Samsung UN55AU7700', N'Smart TV LED 55" 4K UHD Samsung UN55AU7700 com Processador Crystal 4K, Tela sem limites, Visual Livre de Cabos, Alexa built in, Controle Único.', 1, CAST(2799.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'UN55AU7700.webp', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'870229fd-1aab-4d68-8cd3-2a095205887f', N'The Sims 4 - PC/Mac', N'Crie símbolos exclusivos: uma variedade de simulações é sua para personalizar, cada uma com aparências distintas, personalidades dinâmicas e aspirações inspiradoras.', 1, CAST(393.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Thesims4.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'40c45ec6-2a72-427e-b599-2a6f7e688b6f', N'Controle Dualsense - Midnight Black', N'O controle sem fio DualSense oferece resposta tátil, efeitos de gatilho adaptáveis e um microfone embutido, tudo em um design icônico e confortável.', 1, CAST(395.91 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Midnight Black.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'1072fb24-30f8-4d57-b748-2b5087265f28', N'Fone de ouvido Bluetooth sem fio Tranya X1', N'[Tempo de reprodução de 66 horas e carregamento sem fio] Cada fone de ouvido tem até 6 horas de tempo de audição. Você terá mais de 66 horas de reprodução combinada com um estojo de carregamento sem fio com capacidade de bateria de 1200mAh.', 1, CAST(209.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'TranyaX1.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'757704ad-091e-4175-8dae-2b748c077ab5', N'PlayStation®4 + God of War Ragnarök', N'PlayStation4 - Jogos incríveis e entretenimiento sem fim. Os jogos mais incríveis estão no PS4, com 1TB de armazenamento. O console PS4 oferece excelente poder de jogabilidade, entretenimento incrível tecnologia HDR vibrante.', 1, CAST(2999.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'PlayStationGodRagnarök.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'eb8c56bd-a683-4d41-b584-323913f96b6f', N'Lady Killers: Assassinas em Série: As mulheres mais letais da história', N'Quando pensamos em assassinos em série, pensamos em homens. Mais precisamente, em homens matando mulheres inocentes, vítimas de um apetite atroz por sangue e uma vontade irrefreável de carnificina.', 1, CAST(39.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'LadyKillers.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'0c1e31d9-2764-469c-a422-33b3f0008cec', N'Smart TV LED 43" Full HD AOC ROKU TV FHD 43S5195/78G', N'A Smart TV AOC Roku 43S5195/78 chegou para inovar o conceito de TVs inteligentes.', 1, CAST(1595.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'43S519578G.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'27b46034-593a-4455-b17a-365ed8ee32c8', N'É Assim que Acaba', N'Considerado o livro do ano, que virou febre no TikTok e sozinho já acumulou mais de um milhão de exemplares vendidos no Brasil. É assim que acaba é o romance mais pessoal da carreira de Colleen Hoover, discutindo temas como violência doméstica e abuso psicológico de forma sensível e direta. ', 1, CAST(29.88 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AssimqueAcaba.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'083b2688-0879-4c5c-a52e-36fff69c85cd', N'The Last of Us Part II - PlayStation 4', N'Cinco anos depois da jornada perigosa pelos Estados Unidos pós-pandêmicos, Ellie e Joel se estabelecem em Jackson, Wyoming.', 1, CAST(119.50 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Thelast.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'b8547b81-396a-4960-8f6f-3da17b01cc09', N'WRC 9 (PS5) - PlayStation 5)', N'Pela primeira vez reunidos em um kit, Um de nós está mentindo e Um de nós é o próximo são os dois thrillers best-sellers de Karen M. McManus.', 1, CAST(431.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'WRC9.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'cbe1f77b-17b6-44c4-8f0c-3ddf09ffc981', N'Echo Dot (4ª Geração): Smart Speaker com Alexa', N'Conheça o Echo Dot (4ª Geração): nosso smart speaker com Alexa de maior sucesso ainda melhor. O novo design de áudio com direcionamento frontal (1 speaker de 1,6") garante mais graves e um som completo.', 1, CAST(379.05 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'EchoDot4Geração.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'0e7a4408-828c-4dd3-8367-435816ac96d2', N'Mouse Pad Professional Gaming, Havit', N'Mouse Pad de tamanho grande, edindo 900 x 300 x 3 mm faz com que forneça maior área utilizável para cobrir teclado, mouse e coisas na área de trabalho ao jogar.', 1, CAST(48.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'MouseHavit.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'0c9d8743-e504-445f-8036-454d9e9eaf8e', N'USB C HUB 5 em 1', N'O hub USB-C multiporta expande uma porta USB-C para uma variedade de 5 portas, incluindo USB 3.0, USB 2.0, porta Ethernet RJ45 e leitor de cartão SD/TF. Crie um espaço de trabalho fino e elegante, especialmente adequado para MacBook Pro e Air e laptops com interface Type-C completa. Não se preocupe mais com a falta de portas de notebook.', 1, CAST(103.69 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'USBCHUB5.png', 1000, 1, 5, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'82367526-f0d8-4f46-a3ce-4aba593ebc35', N'Console Xbox Series X', N'Apresentamos o xbox series x, nosso console mais rápido e poderoso de todos os tempos; jogue milhares de títulos de quatro gerações de consoles- todos os jogos têm melhor aparência e são melhor executados no xbox series x.', 1, CAST(4159.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'ConsoleX.webp', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'197e2fd2-6832-45a5-b068-4ff0206cd94a', N'Fone de Ouvido Bluetooth QCY HT05 Melobuds ANC', N'Os fones de ouvido com cancelamento de ruído ativo com 6 microfones e tecnologia de áudio Qualcomm cVc desligam 90% dos ruídos de fundo. Deixe sua voz ser ouvida claramente durante chamadas telefônicas, bate-papos por vídeo e nos ambientes mais barulhentos.', 1, CAST(199.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'QCYHT05.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'1db3f2e1-41e3-4e4a-ad4c-50d5a661e3d9', N'Cabo Micro USB, nylon trançado, para dispositivo Android e acessórios', N'Revestido em nylon trançado e com conectores de alumínio anodizado, mais resistentes que os tradicionais.', 1, CAST(24.21 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'nylons.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'ae88c3a8-6a87-4e5c-8be0-5195f5405a94', N'Smart TV LED 50" 4K UHD LG 50UQ8050PSB', N'2022 Smart TV LG 50" 4K UHD 50UQ8050 WiFi Bluetooth HDR Nvidia GEFORCE NOW ThinQ Smart Magic Google Alexa.', 1, CAST(2469.05 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'50UQ8050PSB.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'1fa98cc8-18ea-4865-887a-51a10d0e2f5d', N'Xiaomi Redmi Note 8 4RAM 64GB', N'Smartphone Xiaomi Redmi note 8 64GB 4GB RAM Azul Versión Global, Sistema operacional: MIUI 10 (Base no sistema operacional Android 9), RAM: 4GB ROM: 64GB, Tela 6.3.', 1, CAST(1130.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'XiaomRedmiNote4RAM.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6a85078d-2cdd-4c30-993a-54a0a8ddc0da', N'REDMI NOTE 11 GRAPHITE', N'Descrição MARCA : Xiaomi MODELO: Redmi Note 11 COR: Graphite Gray MEMÓRIA INTERNA : 128GB MEMÓRIA RAM: 4GB PROCESSADOR CPU: Qualcomm Snapdragon 680 (6 nm), Octa Core de 2.40GHz SISTEMA OPERACIONAL: Android 11 + MIUI Global 13 TELA: Dot Display de 6.6" Full HD+.', 1, CAST(3215.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'REDMNOTE11GRAPHITE.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'48da6567-bf59-4543-80cf-55874d1f3ac9', N'Smartwatch Relogio Smart Watch', N'tela de toque total de alta definição IPS de 1,7 polegadas, proporcionando toque de alta qualidade e experiência visual. O aplicativo contém mais de uma variedade de mostradores de relógio para você escolher.', 1, CAST(109.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'SmartwatchRelogioSmartWatch.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'08be7728-7bef-477a-8328-5756bcce1031', N'Os sete maridos de Evelyn Hugo', N'Com todo o esplendor que só a Hollywood do século passado pode oferecer, esta é uma narrativa inesquecível sobre os sacrifícios que fazemos por amor, o perigo dos segredos e o preço da fama.', 1, CAST(29.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'EvelynHugo.webp', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'4eaacf94-4851-4cfe-953d-593c5ca4640f', N'Até o verão terminar', N'Uma vida de dor e abandono fizeram de Beyah uma pessoa cética, desconfiada e boa em guardar segredos. Mas, até o verão terminar, ela terá que rever tudo o que acredita. Da mesma autora dos sucessos É assim que acaba, Layla e Verity.', 1, CAST(29.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'ateterminar.jpg', 1000, 1, 1, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'82332943-eafb-48ff-9fca-597cff88a817', N'Tudo é eventual', N'Stephen King escreve na introdução desta coletânea que “há poucos prazeres tão fantásticos quanto sentar em minha poltrona preferida numa noite fria, com uma xícara de chá quente ao lado, escutando o vento lá fora e lendo um bom conto que posso terminar de uma sentada”.', 1, CAST(39.38 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Tudoeventual.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'e3ee9fe5-1b93-4ef2-bb55-5acf1ce7fef0', N'Road 96 - PlayStation 5', N'Faça uma carona no seu caminho para a liberdade nesta viagem rodoviária maluca gerada processualmente feita por criadores independentes renomados. A estrada de ninguém é a mesma!', 1, CAST(288.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Road96 .jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'94017e66-08a9-4183-a83a-5bbc14227434', N'Fone de Ouvido Stage Hero6 TWS', N'Os fones de ouvido sem fio Stage hero6 empregam cancelamento de ruído híbrido ativo, drivers superdimensionados de 10 mm.', 1, CAST(199.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'stageHero6.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'ea8e0b4b-7bdc-4c8b-affc-5d659b0aeb53', N'Fones de Ouvido Sem Fio Bluetooth Fones de Ouvido 48', N'TELA DIGITAL DE LED DUPLA E 36 HORAS DE JOGO: A tela de LED mostra a energia restante no estojo de carregamento, que vem com uma carga extra de 650mAh para até 36 horas de tempo de audição.', 1, CAST(169.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'FonesdeOuvidosem.webp', 1000, 1, 5, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7ea937a3-7f76-4476-bdbb-5d7e76e5969b', N'Suporte para Notebook, OCTOO', N'Mais conforto ao trabalhar com o notebook ou tablet! O suporte ergono^mico Uptable soluciona o grande problema do desconforto ao trabalhar em uma superfi´cie plana. Produto premiado pelo Idea Brasil em inovac¸a~o e design.', 1, CAST(48.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'OCTOO.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'78163be3-63c4-4959-8937-5ebfb4764272', N'Apple iPhone 11 (64 GB) Branco', N'Tela LCD Liquid Retina HD de 6,1 polegadas, Resistente a água e pó (até 30 minutos à profundidade máxima de 2 metros, IP68).', 1, CAST(2600.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AppleiPhone1164 GB.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'78162be3-61c4-4959-89d7-5ebfb476427e', N'Cadeira Gamer TGT Heron', N'A Cadeira Gamer TGT HERON proporciona alto conforto e qualidade para as melhores horas do seu dia! Tudo isso aliado a um ótimo custo benefício.', 1, CAST(600.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'GTHeron.webp', 1000, 1, 2, 3)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6ecaaa6b-ad9f-422c-b3bb-6013ec27b4bb', N'God of War Ragnarök - Edição Standard - PlayStation 4', N'Embarque em uma jornada épica e comovente onde Kratos e Atreus lutam entre o desejo de manterem-se unidos ou separar-se.', 1, CAST(345.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'godofwar.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6ecaaa6b-ad9f-422c-b3bb-6013ec27c4bb', N'Console PlayStation®5 + Horizon Forbidden West', N'PlayStation®5: O console PS5™ oferece novas possibilidades de jogabilidade que você nunca imaginou. Reproduza jogos para PS5 e PS4 em Blu-ray Disc.', 1, CAST(3500.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'playstation5.webp', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'9996b725-4c46-4b42-9dc6-60a5a3a83e77', N'Marvels Avengers - PlayStation 5', N'Monte sua equipe com os heróis mais poderosos da Terra, incorpore seus poderes e viva seus sonhos de super-herói. Marvels Avengers é um jogo épico de ação e aventura em terceira pessoa que combina uma história original cinematográfica com jogabilidade individual e cooperativo. Funcionalidades do Jogo Incorpore seus poderes', 1, CAST(158.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Marvelsavengers.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'682d52be-96da-4d6c-839b-60a82d935dd3', N'Apple iPhone 12 (128 GB) RED', N'Tela Super Retina XDR de 6,1 polegadas Ceramic Shield. Mais resistente do que qualquer vidro de smartphone A14 Bionic, o processador mais rápido de sempre num smartphone.', 1, CAST(2750.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AppleiPhone12RED.webp', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'913aac35-7f55-4ee6-ba42-679e9bd0f055', N'Console PlayStation®5 + FIFA 23', N'O console PS5 oferece novas possibilidades de jogabilidade que você nunca imaginou. Reproduza jogos para PS5 e PS4 em Blu-ray Disc. Além disso, você também pode baixar jogos digitais para PS5 e PS4 pela PlayStation Store.', 1, CAST(4319.91 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'playStatioFIFA23.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'65289fe7-00a7-4f97-b202-696c9e1ea93b', N'Headphone Fone de Ouvido Havit HV-H2002d', N'Com revestimento de liga fosco e superfície de plástico com revestimento de piano, é à prova de desgaste, resistente a arranhões e atualizado.', 1, CAST(205.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'HV-H2002d.jpg', 1000, 1, 5, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'8aac6806-fbaf-405b-84a5-6a86bfc697e7', N'Essencialismo: A disciplinada busca por menos', N'Se você se sente sobrecarregado e ao mesmo tempo subutilizado, ocupado mas pouco produtivo, e se o seu tempo parece servir apenas aos interesses dos outros, você precisa conhecer o essencialismo.', 1, CAST(34.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Essencialismo.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'ef5d09f0-e1ed-4d54-9e4d-6a941ef89883', N'PHILIPS Fone de ouvido sem fio TWS', N'Fone de ouvido sem fio TWS bluetooth com microfone e energia para 18 horas totais na cor preto TAT1235BK/97', 1, CAST(171.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'PHILIPSfone.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'52dd696b-0882-4a73-9525-6af55dd416a4', N'Console Xbox Series S', N'Xbox series s, nosso xbox menor e mais elegante de todos os tempos; com taxas de quadros mais altas, tempos de carregamento mais rápidos e mundos mais ricos e dinâmicos.', 1, CAST(2340.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'xboxseries.webp', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7b2bd16b-089c-4f4e-981f-6bea1295d729', N'RK ROYAL KLUDGE Teclado mecânico RK84 RGB 75%', N'Estes são três modos: acredite ou não, este é a primeira geração de teclados sem fio RGB de três modos no mercado. Modo sem fio com Bluetooth 5.0 estável, dongle de 2,4 GHz sem complicações e modo com fio USB-C não define limites sobre a conexão do seu teclado.', 1, CAST(764.15 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'RK84RGB.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'2cc3f29d-592d-4497-b179-6c65cf9ee773', N'O livro dos porquês', N'As crianças vivem mesmo no mundo dos porquês. E com toda a razão: não deve ser nada fácil ter um mundo inteiro para decifrar sem fazer muitas perguntas.', 1, CAST(39.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Olivrodosporques.webp', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'8340af38-426d-4ba7-a301-6e7bedbb3298', N'O lado feio do amor', N'Quando começou a se envolver com Miles, Tate prometeu não se apaixonar. Mas vai descobrir que nenhuma regra é capaz de controlar o amor e o desejo...Da autora-fenômeno Colleen Hoover, que acumula best-sellers, visualizações no TikTok e milhares de leitores apaixonados no mundo todo.', 1, CAST(36.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Oladofeiodoamr.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'9729905c-36ae-43df-b102-6edf4de86b5c', N'Controle Dualshock 4 - PlayStation 4 - Preto', N'Tem produtos em oferta nas diversas categorias no site da Amazon, mas se o que você quer é a melhor oportunidade para comprar um Controle Dualshock 4 para o PlayStation 4, essa é a hora certa.', 1, CAST(299.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'ControleDualshock4Preto.webp', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'92625484-f977-48e7-99e9-710934883c90', N'Headset Gamer Rgb G Pro H1+ 7.1', N'Conector: USB Cor: Cinza Impedncia: 32ohms10% Sensibilidade: 108db3db Dimensões: 190x225x108mm Resposta Frequência: 20hz20khz.', 1, CAST(215.37 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'HeadsetGamerRgb.webp', 1000, 1, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'b9792fd4-8cde-4e0f-9706-72c51dad861d', N'Suporte Articulado de Mesa com Pistão a Gás', N'Total flexibilidade para movimentos, sem esforço e sem a utilização de ferramentas Pistão a gás e juntas desenvolvidos para fornecer movimentos suaves e estáveis.', 1, CAST(199.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'SuportearticuladoGas.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'4015ed5a-84a6-4b99-856e-760a4e41dbc5', N'Mouse Classic Box Óptico Full Black USB', N'Desconto adicional levando 10 ou mais itens de supermercado. Com assinatura Prime: 15% off em 10 itens do Super. Sem assinatura Prime: 10% off em 10 itens do Super. Escolha entre itens iguais ou diferentes.', 1, CAST(3500.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'MouseFullBlackUSB.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6a6a67d2-a647-4702-a6a0-7a5f731ec28b', N'Motorola Moto G41 128GB', N'Imagens surreais com câmera tripla e estabilização óptica, Product type: CELLULAR_PHONE Eletrónicos e Tecnologia, Categorias: Celulares e Comunicação, Celulares e Smartphones.', 1, CAST(3500.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'MotorolaMotoG41128GB.webp', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'3c3522a0-cf0c-46d5-98e8-7bad1e095685', N'PHILIPS Smart TV 32" HD Android 32PHG6917/78', N'Android TV: Acesso à milhares de apps na Google Playstore, como Globoplay, HBO Max, Star+, Spotify, etc. Os apps Netflix, Youtube, Prime Video e Disney+ já vem pre-instalados.', 1, CAST(1299.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'32PHG691778.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'53cf3435-0ddd-4347-811c-7d1fccfb035e', N'In Nightmare (PS5)', N'Fechando seu coração à realidade, nosso protagonista cai em um sono profundo e desperta em um mundo dos sonhos pesadelo.', 1, CAST(184.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'InNightmar.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'be25ca83-a6e3-4a0a-acb2-7e493281b889', N'Headset Gamer HyperX Cloud Stinger Core PS4/Xbox One/Nintendo Switch', N'Tem produtos em oferta nas diversas categorias no site da Amazon, mas se o que você quer é a melhor oportunidade para comprar um headset Gamer HyperX, essa é a hora certa.', 1, CAST(179.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'PS4XboxOneNintendo Switch.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'1957930c-73e1-463f-84ca-7eace9547202', N'USB Microfone Kit Microfone Bm800 USB Condensador Estúdio Profissional', N'A qualidade do microfone USB é melhor que os microfones comuns, portanto, não pode ser substituída por cabos XLR comuns.!!!', 1, CAST(179.50 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'MicrofoneBm800.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'3c37ce50-0463-4b80-bc0f-7f5a471260c3', N'Kit Um de nós (acompanha marcadores)', N'Pela primeira vez reunidos em um kit, Um de nós está mentindo e Um de nós é o próximo são os dois thrillers best-sellers de Karen M. McManus. Acompanha dois marcadores de páginas dos livros.', 1, CAST(39.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'kitdeumnos.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'c30861aa-228d-4a13-9a03-82ccfeaae932', N'Smart TV LED 32" HD Semp 32R5500', N'Roku TV LED 32” SEMP R5500 HD Wifi dual band , 3 HDMI, 1 USB, com controle por aplicativo.', 1, CAST(1198.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'32R5500.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'd511d034-6745-4642-adfb-82d39da2888a', N'O Jardim Secreto', N'As histórias mais mágicas são capazes de atravessar as barreiras do tempo e encantar leitores de diferentes gerações.', 1, CAST(43.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'OJardimSecreto.jpg', 1000, 0, 1, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'66219f60-dd36-443c-8327-8534e8e9a346', N'Caneta Pencil WB Para iPad com Palm Rejection', N'PALM REJECTION: Você consegue usar seu iPad sem se preocupar em apoiar as mãos em cima da tela. Oferece uma sensação natural de escrita e interação rápida e sem precisar forçar a ponta sobre a tela, oferecendo mais precisão e controle.', 1, CAST(174.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'CanetaRejection.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7b06fc4e-3d72-4787-8cba-865e7f65f8c7', N'Teclado sem fio Logitech MX Keys', N'Digitação e posicionamento com teclas inteligentes: digite nas teclas moldadas para a ponta dos dedos, com ditado de voz para texto, ativação e desativação do som e teclas de emoji.', 1, CAST(695.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'LogitechMXKeys.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'b2b00442-7ce3-46e6-ad87-86c5a145b1aa', N'Heartstopper: Dois garotos, um encontro', N'O primeiro volume da adorada série em quadrinhos finalmente chega ao Brasil. A HQ que inspirou a série original da Netflix!', 1, CAST(38.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'garotosumencontro.jpg', 1000, 1, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'841ea77c-7125-4468-81e7-89b113fc470d', N'JBL, Fone de Ouvido Bluetooth, Tune 510BT', N'SOM INCONFUNDÍVEL. Possuem o renomado som JBL Pure Bass, que pode ser encontrado nas mais famosas casas de show ao redor do mundo.', 1, CAST(199.95 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Tune 510BT.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'e54bb978-467a-49c9-a11a-8b2de1dd55f8', N'Apple iPhone 13 (128 GB) Luz das estrelas', N'Tela Super Retina XDR de 6,1 polegadas O modo cinematic adiciona profundidade de campo rasa e muda o foco automaticamente em seus vídeos Sistema avançado de câmera dupla com câmeras Wide e Ultra Wide de 12MP; Estilos fotográficos, Smart HDR 4, modo noturno, gravação 4K Dolby Vision HDR.', 1, CAST(3320.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AppleiPhone13Ludasestrelas.webp', 1000, 1, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'694dbd45-61d5-4329-a00a-8c260bad7e49', N'Deus fez tudo em mim', N'Proteja seu filho com a verdade da Palavra de Deus Deus Fez Tudo em Mim aborda, de forma sábia e simples, um assunto que toda família precisa pensar nos dias de hoje para prevenção do abuso sexual infantil. .', 1, CAST(31.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Deusezudomim.webp', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'191ddd3e-acd4-4c3b-ae74-8e473993c5da', N'Smart Lâmpada Wi-Fi Positivo Casa Inteligente', N'Lâmpada Smart de Fácil instalação, basta colocar a sua Smart Lâmpada Wi-Fi em um bocal padrão, baixar o App Positivo Casa Inteligente, conectar ao Wi-Fi 2.4Ghz e começar a usar.', 1, CAST(150.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'lampadainteligente.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'18e4cd86-9544-4c9d-a700-8e9c3634b66f', N'Apple iPhone 11 (64 GB) Branco', N'Tela LCD Liquid Retina HD de 6,1 polegadas, Resistente a água e pó (até 30 minutos à profundidade máxima de 2 metros, IP68).', 1, CAST(2600.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'AppleiPhon11 Branco.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'3acf6691-d104-46e2-b05e-90b4d24be6a1', N'Nintendo Switch Lite Turquesa - Versão Nacional', N'Apresentamos o Nintendo Switch Lite, uma nova versão do console Nintendo Switch que foi otimizado para o jogo pessoal e portátil, O Nintendo Switch Lite é um console Nintendo Switch leve e pequeno, a um ótimo preço.', 1, CAST(1479.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'NintendoSwitchLiteturquesa.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6da456f2-f5f1-4f88-8be1-9128ef65c92e', N'PHILIPS Android TV 50" 4K 50PUG7406/78', N'Android TV 4K HDR: Máximo de conteúdo com a Android TV aliado à uma experiência em 4K HDR com qualidade de imagem Philips Comando de Voz no Controle Remoto: Com o Google Assistente, transmita qualquer comando de voz à TV.', 1, CAST(2149.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'50PUG740678.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'9302d636-bbfe-4eb3-b338-942ce43462bb', N'Wacom One CTL472 - Mesa Digitalizadora', N'Edição de fotos? Desde recortes complicados até ajustes de cores delicadas, tudo fica muito mais fácil.', 1, CAST(279.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'CTL472Mesa.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'53bcc8d2-07f0-4d43-9281-96734913494b', N'Wreckfest - Xbox One', N'Break the rules and take full-contact racing to the limit with wreck fest! Expect epic crashes, neck-to-neck fights over the finish line and brand-new ways for metal to bend.', 1, CAST(285.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'WreckfesXboxOne.jpg', 1000, 1, 2, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'057277bd-b3f2-420f-92bd-97954c11268e', N'Metal Gear Solid V: The Definitive Experience', N'Gamers who have never played a Metal Gear Solid game, and veterans alike, will gain familiarity with the radical new game design and unparalleled style of presentation.', 1, CAST(135.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'DefinitiveExperience.jpg', 1000, 1, 2, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6364d101-3522-4619-873d-9da67f6b102e', N'Cem anos de solidão', N'Edição comemorativa em capa dura da principal obra de Gabriel García Márquez, em homenagem aos 50 anos de publicação. Romance fundamental na história da literatura, Cem anos de solidão apresenta uma das mais fascinantes aventuras literárias do século XX.', 1, CAST(89.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Cemanosolidão.jpg', 1000, 1, 1, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'048b5794-3c34-417b-b52d-9fcbb128a228', N'eurynom telescopio astronomico', N'ncluindo duas lentes oculares (6 mm e 20 mm), nosso telescópio F50360M possui ótica de vidro totalmente revestida e revestimentos de alta transmissão, que criam uma qualidade de imagem mais brilhante e com maior poder de ampliação.', 1, CAST(159.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'eurynom.jpg', 1000, 1, 3, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'78d056e0-6e09-4d95-ad54-a38b7fcc19c5', N'Xiaomi Redmi A1 32gb 2gb Black - Preto', N'De acordo com informações do site oficial da Xiaomi, o Redmi A1 é equipado com uma tela IPS LCD HD+ de 6,52 polegadas (taxa de atualização de 120Hz), processador MediaTek Helio A22, memória RAM de 2GB, armazenamento interno de 32 GB.', 1, CAST(780.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'XiaomiRedmiA1.webp', 1000, 1, 4, 3)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'0f475f0c-af8e-454d-aeec-a5d78461f7a1', N'Mochila para Notebook Lenovo', N'O teclado multi-dispositivo BluetoothR LogitechR K380 traz o conforto e a conveniencia da digitacao para seu desktop, smartphone, tablet e muito mais.', 1, CAST(227.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Mochila.webp', 1000, 1, 5, 3)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'da393887-2cec-4fa3-85f0-a9f5e42a2e65', N'Controle sem Fio Xbox - Shock Blue', N'Capture e compartilhe com facilidade conteúdo como capturas de tela, gravações e mais com o novo botão Compartilhar.', 1, CAST(450.90 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Shock Blue.jpg', 1000, 1, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'52420dc3-6e19-4f43-b4da-aaacd68749b4', N'Smart TV LED 50" 4K UHD Samsung 50BU8000', N'Tamanho da tela 50 Polegadas Tecnologia de conectividade USB Marca SAMSUNG Resolução 4K Tipo de alto-falante Soundbar Método de controle Remoto.', 1, CAST(2599.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'50BU8000.jpg', 1000, 0, 3, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6c816967-b241-4e40-8033-b14edfb83dec', N'Xiaomi POCO X4 Pro 5G', N'Com sua tela AMOLED de 6,67 polegadas, o POCO X4 Pro 5G oferece uma taxa de atualização de 120 Hz e uma taxa de amostragem de toque de 360 ??Hz para uma experiência extremamente suave e realista.', 1, CAST(3450.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'XiaomipOCO4Pr5G.jpg', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'30db20ac-e963-4e0a-a54d-b700002b689c', N'Console Nintendo Switch - Azul Neon e Vermelho Neon', N'Adquira o console de videogames que lhe possibilita jogar seus jogos favoritos, onde você quiser e da maneira que preferir; inclui o console Nintendo switch e a base do Nintendo switch pretos e os controles joy-con esquerdo e direito em cinza; também inclui tudo o que você precisa para começar.', 1, CAST(2118.50 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'SwitchermelhoNeon.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'8e975d9b-65b7-4db8-87df-c099c9e1bb8c', N'Mouse Gamer Razer Deathadder V2 Mini Chroma', N'Sensor óptico de resolução real de 8 500 dpi Switches óptico de mouse razer.', 1, CAST(139.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Mouserazer.webp', 1000, 1, 2, 3)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'2ff8ef39-2833-4ad4-ae16-cec14e385b61', N'Tranya S2 Smartwatch, Relógio inteligente IPX68', N'Graças a um sensor de saúde 3 em 1, o relógio inteligente Tranya S2 pode fornecer rastreamento de saúde geral, permitindo rastrear com precisão a frequência cardíaca de 24 horas.', 1, CAST(215.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'IPX68.webp', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'f5af510d-bf53-46da-b7cf-d2396df517fe', N'Mulheres que correm com os lobos: Mitos e histórias do arquétipo da Mulher Selvagem', N'Os lobos foram pintados com um pincel negro nos contos de fada e até hoje assustam meninas indefesas. Mas nem sempre eles foram vistos como criaturas terríveis e violentas.', 1, CAST(39.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Mulhereslobos.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'6211d84c-6b29-448e-951c-d4c2092a452c', N'As obras revolucionárias de George Orwell', N'George Orwell é um dos escritores mais importantes do século XX. Foi autor de romances, ensaios, críticas e artigos jornalísticos, com textos de fácil compreensão, inteligentes e críticos, apontando as injustiças sociais.', 1, CAST(30.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'georgeOrwell.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'0fb86057-3f17-48e1-8c9c-d99f048b2d44', N'Echo Dot (4ª Geração): Smart Speaker com Alexa', N'Conheça o Echo Dot (4ª Geração): nosso smart speaker com Alexa de maior sucesso ainda melhor. O novo design de áudio com direcionamento frontal (1 speaker de 1,6") garante mais graves e um som completo.', 1, CAST(379.05 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'EchoDot4Geração.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'8b7afa0a-ae5b-4efe-a8ec-dde3d1e866b4', N'Motorola Edge 30 5G 256GB 8GB', N'Foco instantâneo em todos os pixels, OIS e gravação em HDR10 e Alta resolução nas câmeras principal e híbrida (ultra-wide e macro) com sensores de 50 MP OIS e 50 MP.', 1, CAST(4350.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'MotorolaEdge30 G 56GB8GB.webp', 1000, 0, 4, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'b4d33fd9-7ceb-4a15-aaf7-df32ceae1d12', N'É assim que começa', N'Preparem os corações. Lily e Atlas estão de volta na aguardada sequência de É assim que acaba. É assim que começa chega para consagrar novamente Colleen Hoover como a autora mais vendida do Brasil.', 1, CAST(33.15 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'eassimqcomeca.jpg', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'b6b7dcc8-880e-45e6-8a5d-e20ea21c70ed', N'Todas as suas (im)perfeições', N'Uma inesquecível história da rainha do drama Colleen Hoover, Todas as suas (im)perfeições fala sobre um casamento conturbado e uma promessa esquecida que pode ser capaz de salvá-lo.', 1, CAST(29.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Todasassuas(im)perfe.webp', 1000, 0, 1, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'28a71a4a-26b4-4ef7-8f00-e432c9b95db0', N'Grand Theft Auto V Pc', N'Grand Theft Auto V also comes with Grand Theft Auto Online, the Dynamic and ever evolving Grand Theft Auto universe for multiple players,', 1, CAST(292.89 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Grandthelf.jpg', 1000, 0, 2, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'15201719-c8cf-4855-b707-ebaecb9034b5', N'Xiaomi POCO M5s Dual SIM de 128GB / 6GB', N'Marca: Xiaomi MODELO POCO M5s (Global) COR Cinza MEMÓRIA INTERNA 128GB MEMÓRIA RAM 6GB + 2GB de Memória Virtual (Opcional) PROCESSADOR CPU MediaTek Helio G95 Octa Core (Dual Core de 2.05GHz + Hexa Core de 2.0GHz) GPU ARM Mali-G76 MC4 SISTEMA OPERACIONAL Android 12 + MIUI Global 13 TELA Dot Display de 6.43" Full HD+.', 1, CAST(2350.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'XiaomiPOCOM5s.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'884c2b9b-f922-4cbe-9f53-ed70223826c3', N'Suporte de Mesa para Celular Ajustável', N'após mais de 20.000 vezes de testes de dobra e rotação, o suporte do tablet ainda pode manter o dispositivo estável de 8 libras. Dobre duas vezes, dobre após o uso, faça o volume menor e de alta estabilidade, você pode colocá-lo em sua bols.', 1, CAST(26.95 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Suportedemsacelular.jpg', 1000, 0, 5, 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'8604a437-1441-4af5-88f4-f840e6c30b3f', N' Xiaomi Redmi Note 8 PRO Cinza Mineral', N'Sistema Operacional Android, CâmeraQuad (64MP + 8MP + 2MP + 2MP) Resolução9238 x 6928 pixel; RecursosAutofocus; Detecção Facial; Estabilização de Imagem; Flash Du.', 1, CAST(1699.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'XiaomirdmiNote8PRO.jpg', 1000, 1, 4, 1)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'83fd4240-10ed-485e-801a-fb4c3ca804da', N'Controle sem Fio Xbox - Shock Blue', N'Capture e compartilhe com facilidade conteúdo como capturas de tela, gravações e mais com o novo botão Compartilhar.', 1, CAST(450.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'Shockblue.jpg', 1000, 1, 2, 2)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'7fde649b-253e-4205-9d30-fb93cc93170b', N'Console Nintendo Switch Oled - Branco', N'Obtenha o sistema de jogos que permite que você jogue os jogos que você quiser, onde quer que esteja, do jeito que quiser.', 1, CAST(2483.91 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'SwitchOledBranco.webp', 1000, 1, 2, 3)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'08eb32d8-b49d-43a9-9b1d-fe405ee26bca', N'Naruto to Boruto: Shinobi Striker', N'The Naruto franchise is back with a brand new experience in Naruto to Boruto: Shinobi Striker! This new game lets gamers battle as a team of 4 to compete against other teams online!', 1, CAST(136.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'ShinobiStriker.webp', 1000, 1, 2, 3)
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock], [Highlighted], [ProductType], [ProductCategory]) VALUES (N'43d25977-bede-4d67-962b-fe7ea7cc6a06', N'Box Sherlock Holmes', N'Em 1887, o escritor escocês sir Arthur Conan Doyle criou Sherlock Holmes, o infalível detetive a quem os agentes da Scotland Yard recorriam para solucionar os mistérios mais intrigantes da Inglaterra vitoriana.', 1, CAST(84.99 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'BoxsherlockHolmes.jpg', 1000, 1, 1, 4)
GO
INSERT [dbo].[Vouchers] ([Id], [Code], [Percentage], [ValueDiscount], [Quantity], [DiscountType], [DataCreation], [DataUse], [DataValidad], [Active], [Used]) VALUES (N'97825b4c-53af-41cb-84a4-402a30365dd1', N'NS-500OFF', NULL, CAST(500.00 AS Decimal(18, 2)), 200, 1, CAST(N'2022-12-12T00:00:00.0000000' AS DateTime2), NULL, CAST(N'2021-12-12T00:00:00.0000000' AS DateTime2), 1, 0)
INSERT [dbo].[Vouchers] ([Id], [Code], [Percentage], [ValueDiscount], [Quantity], [DiscountType], [DataCreation], [DataUse], [DataValidad], [Active], [Used]) VALUES (N'612a7cc2-12b5-4a53-ae30-41c651835a97', N'NS-300OFF', NULL, CAST(300.00 AS Decimal(18, 2)), 118, 1, CAST(N'2022-12-12T00:00:00.0000000' AS DateTime2), NULL, CAST(N'2026-10-12T00:00:00.0000000' AS DateTime2), 1, 0)
INSERT [dbo].[Vouchers] ([Id], [Code], [Percentage], [ValueDiscount], [Quantity], [DiscountType], [DataCreation], [DataUse], [DataValidad], [Active], [Used]) VALUES (N'9e4285c3-c79d-45a1-aa53-cff9530acc3a', N'NS-50OFF', CAST(50.00 AS Decimal(18, 2)), NULL, 48, 0, CAST(N'2022-12-12T00:00:00.0000000' AS DateTime2), NULL, CAST(N'2025-12-12T00:00:00.0000000' AS DateTime2), 1, 0)
GO
