import { CategoryService, CommentService, EmbedService, ProductService, ReferanceService, UserService } from "./api";

export const productService = new ProductService();
export const categoryService = new CategoryService();
export const commentService = new CommentService();
export const referanceService = new ReferanceService();
export const userService = new UserService();
export const embedService = new EmbedService();