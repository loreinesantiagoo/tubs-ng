  export interface ProductsConfig {
    product_name: string;
    id: string;
  }

  export interface Cart {
    name: string;
    content: string[];
    saved?: string;
  }
