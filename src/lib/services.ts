import { CategoryService, CommentService, ProductService, ReferanceService } from "./api";

export const productService = new ProductService();
export const categoryService = new CategoryService();
export const commentService = new CommentService();
export const referanceService = new ReferanceService();