import { CategoryService, CommentService, ProductService } from "./api";

export const productService = new ProductService();
export const categoryService = new CategoryService();
export const commentService = new CommentService();