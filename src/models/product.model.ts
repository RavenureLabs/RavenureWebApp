export type Product = {
    id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    author: string;
    reviews: {
        rating: number;
        count: number;
    }
    category: string;
    salesCount: number;
    createdAt: string;
    updatedAt?: string;
    stock?: number;
    isFeatured?: boolean;
    isActive?: boolean;
}