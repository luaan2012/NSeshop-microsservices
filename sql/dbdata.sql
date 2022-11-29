USE [NerdStore]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 28/11/2022 15:35:27 ******/
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
/****** Object:  Table [dbo].[Anddress]    Script Date: 28/11/2022 15:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Anddress](
	[Id] [uniqueidentifier] NOT NULL,
	[PublicPlace] [varchar](200) NOT NULL,
	[Number] [varchar](50) NOT NULL,
	[Complement] [varchar](250) NULL,
	[Neighborhood] [varchar](100) NOT NULL,
	[Cep] [varchar](20) NOT NULL,
	[City] [varchar](100) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Anddress] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[Client]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[ClientCarts]    Script Date: 28/11/2022 15:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientCarts](
	[Id] [uniqueidentifier] NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
	[ValueTotal] [decimal](18, 2) NOT NULL,
	[UsedVoucher] [bit] NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[Percentage] [decimal](18, 2) NULL,
	[DiscountValue] [decimal](18, 2) NULL,
	[VoucherCodigo] [varchar](50) NULL,
	[DiscountType] [int] NULL,
 CONSTRAINT [PK_ClientCarts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCarts]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[Products]    Script Date: 28/11/2022 15:35:28 ******/
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
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 28/11/2022 15:35:28 ******/
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
/****** Object:  Table [dbo].[SecurityKeys]    Script Date: 28/11/2022 15:35:28 ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221117201654_initial', N'6.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221117201713_initial', N'6.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221117201744_initial', N'6.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221121163416_initial', N'6.0.0')
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'2421074d-b98e-4946-8e21-dc7f61bf4c69', N'user@example.com', N'USER@EXAMPLE.COM', N'user@example.com', N'USER@EXAMPLE.COM', 1, N'AQAAAAEAACcQAAAAEM9YnJ/Xaj6XTsTYID4DCfHW7cEFTTP1RBTwIJaxglAT//YoZ0QbSCUMV1xhyOwgOw==', N'3WHUL5ZDAAP6AOMGXKPNVM5M2ZFSJQAE', N'5ba3685c-bf16-4718-b7ef-9333254b244a', NULL, 0, 0, NULL, 1, 0)
GO
INSERT [dbo].[Client] ([Id], [Name], [Email], [Cpf], [Deleted]) VALUES (N'2421074d-b98e-4946-8e21-dc7f61bf4c69', N'string', N'user@example.com', N'23502210837', 0)
GO
INSERT [dbo].[ClientCarts] ([Id], [ClientId], [ValueTotal], [UsedVoucher], [Discount], [Percentage], [DiscountValue], [VoucherCodigo], [DiscountType]) VALUES (N'5141cfd3-d902-4813-aa39-ede6d46626c6', N'00000000-0000-0000-0000-000000000000', CAST(3000.00 AS Decimal(18, 2)), 0, CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[ItemCarts] ([Id], [ProductId], [Name], [Quantity], [Value], [Image], [CarrinhoId]) VALUES (N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'7d67df76-2d4e-4a47-a19c-08eb80a9060b', N'Fire TV Stick Lite', 5, CAST(600.00 AS Decimal(18, 2)), N'camiseta2.jpg', N'5141cfd3-d902-4813-aa39-ede6d46626c6')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'7d67df76-2d4e-4a47-a19c-08eb80a9060b', N'Fire TV Stick Lite', N'Streaming em Full HD com Alexa | Com Controle Remoto Lite por Voz com Alexa (sem controles de TV.', 1, CAST(230.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'camiseta2.jpg', 100)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'78162be3-61c4-4959-89d7-5ebfb476427e', N'Cadeira Gamer TGT Heron', N'A Cadeira Gamer TGT HERON proporciona alto conforto e qualidade para as melhores horas do seu dia! Tudo isso aliado a um ótimo custo benefício.', 1, CAST(600.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'caneca4.jpg', 100)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'6ecaaa6b-ad9f-422c-b3bb-6013ec27b4bb', N'God of War Ragnarök - Edição Standard - PlayStation 4', N'Embarque em uma jornada épica e comovente onde Kratos e Atreus lutam entre o desejo de manterem-se unidos ou separar-se.', 1, CAST(345.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'camiseta4.jpg', 150)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'6ecaaa6b-ad9f-422c-b3bb-6013ec27c4bb', N'Console PlayStation®5 + Horizon Forbidden West', N'PlayStation®5: O console PS5™ oferece novas possibilidades de jogabilidade que você nunca imaginou. Reproduza jogos para PS5 e PS4 em Blu-ray Disc.', 1, CAST(3500.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'camiseta3.jpg', 7)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'52dd696b-0882-4a73-9525-6af55dd416a4', N'Console Xbox Series S', N'Xbox series s, nosso xbox menor e mais elegante de todos os tempos; com taxas de quadros mais altas, tempos de carregamento mais rápidos e mundos mais ricos e dinâmicos.', 1, CAST(2340.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'caneca1.jpg', 0)
INSERT [dbo].[Products] ([Id], [Name], [Description], [Active], [Value], [DateRegister], [Image], [QuantityStock]) VALUES (N'191ddd3e-acd4-4c3b-ae74-8e473993c5da', N'Smart Lâmpada Wi-Fi Positivo Casa Inteligente', N'Lâmpada Smart de Fácil instalação, basta colocar a sua Smart Lâmpada Wi-Fi em um bocal padrão, baixar o App Positivo Casa Inteligente, conectar ao Wi-Fi 2.4Ghz e começar a usar.', 1, CAST(150.00 AS Decimal(18, 2)), CAST(N'2019-07-19T00:00:00.0000000' AS DateTime2), N'caneca2.jpg', 1)
GO
INSERT [dbo].[RefreshTokens] ([Id], [Username], [Token], [ExpirationDate]) VALUES (N'27951454-7c09-40a4-8404-d405ab8d36fe', N'user@example.com', N'2933fe46-eb5d-4d7b-aa66-5f4c3bcb0dad', CAST(N'2022-11-22T04:47:19.3952280' AS DateTime2))
GO
INSERT [dbo].[SecurityKeys] ([Id], [Parameters], [KeyId], [Type], [Algorithm], [CreationDate]) VALUES (N'8a401c6d-e969-4d21-832e-e0cc5095f182', N'{"AdditionalData":{},"Alg":"ES256","Crv":"P-256","D":"v2VJqjCpDzkx1S0I_vYW7k4If_SzOz8ABHR2wsJoDIk","KeyId":"R7riyhcZPM2Q4XbYtpeEMA","KeyOps":[],"Kid":"R7riyhcZPM2Q4XbYtpeEMA","Kty":"EC","Use":"sig","X":"if84QHIZwedWkpiRwvf1VuEw7qwcfC51IUkSz29ZcRo","X5c":[],"Y":"e_-K10GriBEnbAFebz0vwLxAJSGT9fm5WpK4UcFjOzQ","KeySize":256,"HasPrivateKey":true,"CryptoProviderFactory":{"CryptoProviderCache":{},"CacheSignatureProviders":true,"SignatureProviderObjectPoolCacheSize":16}}', N'R7riyhcZPM2Q4XbYtpeEMA', N'EC', N'ES256', CAST(N'2022-11-17T17:23:25.6587292' AS DateTime2))
GO
ALTER TABLE [dbo].[Anddress]  WITH CHECK ADD  CONSTRAINT [FK_Anddress_Client_ClientId] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[Anddress] CHECK CONSTRAINT [FK_Anddress_Client_ClientId]
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
