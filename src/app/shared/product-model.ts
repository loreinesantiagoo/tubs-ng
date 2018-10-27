
export class Product {
    date_added: Date;
    productName: string;
    quantity: number;
    cost_price: number;
    unit_price: number;
    product_image?: string;
}

export class EditProduct {
    date_edited: Date;
    productName: string;
    quantity: number;
    cost_price: number;
    unit_price: number;
    product_image?: string;
}
