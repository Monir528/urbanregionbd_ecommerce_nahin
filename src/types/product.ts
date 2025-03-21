export interface Image {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export interface ProductDescription {
    productName: string;
    brand: string;
    review: string;
    price: string;
    videoLink: string;
    otherLink: string;
    category: string;
    description: string;
    variants: string;
    subcategory: string[];
    discount: string;
    extra: string;
    extraInfo: string;
    shortDescription: string;
    stock: boolean;
}

export interface Product {
    _id: string;
    description: ProductDescription;
    images: Image[];
}