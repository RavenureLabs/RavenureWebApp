import { CartService, CategoryService, CommentService, EmbedService, LicenseService, OrderService, ProductService, ReferanceService, UserLoginLogService, UserService } from "./api";

export const productService = new ProductService();
export const categoryService = new CategoryService();
export const commentService = new CommentService();
export const referanceService = new ReferanceService();
export const userService = new UserService();
export const embedService = new EmbedService();
export const orderService = new OrderService();
export const cartService = new CartService();
export const userLogService = new UserLoginLogService();
export const licenseService = new LicenseService();