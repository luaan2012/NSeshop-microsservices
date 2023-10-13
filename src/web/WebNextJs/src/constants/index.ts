export const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
  {
    title: "Products",
    links: ["Templates", "UI Kits", "Icons", "Mockups"],
  },
];

export const NAVBAR = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Loja",
    href: "/store",
    current: false,
  },
  {
    name: "Dashboard",
    href: "/myAccount/dashboard",
    current: false,
  },
  {
    name: "Contato",
    href: "/contact",
    current: false,
  },
];

export const BFF = "https://api-bff.portfolioluan.shop/"
export const CLIENT = "https://api-client.portfolioluan.shop/"
export const CATALOG = "https://api-catalog.portfolioluan.shop/"
export const IDENTITY = "https://api-identity.portfolioluan.shop/"

export const BANNERS = CATALOG + "banners";
export const LISTPRODUCTS = CATALOG + "catalog/products/list";
export const LISTPRODUCTSHIGHLIGHTS = CATALOG + "catalog/products/highlighted";
export const LISTPRODUCTSPAGINATION = CATALOG + "catalog/products";
export const SIGNUP = IDENTITY +"api/auth/new-account";
export const SIGNIN = IDENTITY +"api/auth/authentication";
export const ADDITEM = BFF + "shops/cart/items";
export const CARTQUANTITY = BFF + "shops/cart-quantity";
export const CART = BFF + "shops/cart";
export const SENDORDER = BFF + "shops/order/addOrder";
export const GETLASTORDER = BFF + "shops/order/last";
export const LISTORDERS = BFF + "shops/order/list-client";
export const GETADDRESS = CLIENT + "client/address";
export const ADDADDRESS = CLIENT + "client/address";
export const EDITADDRESS = CLIENT + "client/edit-address";
export const GETCEP = (cep: string): string => `https://viacep.com.br/ws/${cep}/json/`;
export const REMOVEITEM = (id: string): string => CLIENT +  `shops/cart/items/${id}`;
export const UPDATEITEM = (id: string): string => CLIENT +  `shops/cart/items/${id}`;
export const PRODUCTDETAILS = (id: string): string => CATALOG + `catalog/products/${id}`;
export const PRODUCTSDETAILS = (ids: string): string => CATALOG + `catalog/products/${ids}`;

export const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const FILE_SIZE_MAX_LIMIT = 2 * 1024 * 1024;

export const IMAGE_INPUT_CLASS = `block h-[58px] w-full rounded-r-lg text-sm text-slate-500
file:mr-4 file:rounded-full file:border-0
file:bg-violet-50 file:py-1 file:px-4 file:text-sm
file:font-semibold file:text-violet-700 hover:file:bg-violet-100`;

export const SHIPPING = 45;

export const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];
