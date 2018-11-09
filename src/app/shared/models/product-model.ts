export class Product {
    id?: string;
    date_added: Date;
    productName: string;
    quantity: number;
    cost_price: number;
    unit_price: number;
    product_image?: string;
}

export class EditProduct {
    id?: string;
    date_edited: Date;
    productName: any;
    quantity: any;
    cost_price: any;
    unit_price: any;
    product_image?: any;
}
