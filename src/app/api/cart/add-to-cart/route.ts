import { currentUser } from "@/src/lib/auth/currentUser";
import Cart, { CartType } from "@/src/models/cart.model";

export async function POST(request: Request) {
    try {
        const { productId } = await request.json();
        if (!productId) {
            return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
        }
        // Assuming you have a function to get the current user
        const user = await currentUser();
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        // Here you would add the product to the user's cart in your database
        const cart = await Cart.findOne({ userId: user._id.toString() });
        if (!cart) {
            // If no cart exists, create a new one
            const newCart = await Cart.create({ userId: user._id.toString(), products: [productId] });
            return new Response(JSON.stringify({ cart: newCart }), { status: 200 });
        }
        // If a cart already exists, add the product to it
        cart.items.push({ productId, quantity: 1 });
        await cart.save();
        return new Response(JSON.stringify({ cart }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }
}