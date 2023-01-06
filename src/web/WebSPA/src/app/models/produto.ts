export interface Produto {
    name: string,
    description: string,
    image: string,
    quantity: number,
    value: number,
    active: boolean,
    highlighted: boolean,
    productType: number,
    dateRegister: Date,
    id: string,
    notifications: string
    productCategory: number
}
