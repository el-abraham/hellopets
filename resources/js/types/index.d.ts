export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    no_telp: string;
    role: string
}


export interface Product {
    id: number;
    price: number;
    name: string;
}

export interface Gallery {
    id: number;
    path: string;
    slug?: string;
    type: string;
}

export interface Shop {
    id: number;
    alamat: string;
    email: string;
    facilities: string[],
    name: string;
    no_telp: string;
    description: string;
}

export interface Transaction {
    id: number;
    from_date: number;
    to_date?: number;
    no_invoice: string;
    total: number;
    created_at: string;
    user?: User;
    product?: Product;
    shop?: Shop;
    review?: Review;
}

export interface Review {
    id: number;
    rating: number;
    user?: User;
    description: string;
}



export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
