export class CartItem {
    id!: string;
    sku!: string;
    name!: string;
    priceList!: number;
    priceSell!: number;
    description!: string;
    stock!: number;
    category!: string;
    active!: boolean;
    dateCreation!: Date;
    imageUrl!: string;
    quantity!: number;
    subTotal!: number;
}