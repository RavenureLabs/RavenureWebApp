import { getUserCart } from "@/src/controllers/cart.controller";
import { getSettings } from "@/src/controllers/settings.controller";
import { productService } from "@/src/lib/services";
import { CartType } from "@/src/models/cart.model";
import { ProductType } from "@/src/models/product.model";
import { Settings } from "@/src/models/settings.model";

const weepay = require('weepay-nodejs');

export async function POST(request: Request) {

    const data = await request.json();

    const {
        OrderId,
        description,
        callBackUrl,
        customerId,
        customerName,
        customerSurname,
        gsmNumber,
        email,
    } = data;

    const ip = await getIp();

    const cart: CartType = (await (await getUserCart(email)).json()).cart;

    const products = cart.items.map((item: any) => {
        console.log(item);
        return {
            name: item.productId.name["tr"],
            productPrice: item.productId.price,
            itemType: "VIRTUAL",
            productId: item.productId._id.toString(),
        };
    })

    let total = 0;
    if (cart?.items && cart.items.length > 0) {
        const prices = await Promise.all(
            cart.items.map(async (item) => {
                return ((item.productId as any)?.price || 0) * item.quantity;
            })
        );
        total = prices.reduce((acc, price) => acc + price, 0);
    }

    const settings: Settings = await (await getSettings(2)).json();
    weepay.configure({
        bayiId: settings.payment.weepay.merchantId || "",
        apiKey: process.env.WEEPAY_API_KEY!,
        secretKey: process.env.WEEPAY_SECRET_KEY!,
        baseUrl: "https://test-api.weepay.co"
    })

    const requestBody = {
    data: {
        orderId: OrderId,
        ipAddress: ip,
        paidPrice: total,
        currency: "TL",
        locale: "tr",
        description: description,
        callBackUrl: callBackUrl
    },
    customer: {
        customerId: customerId,
        customerName: customerName,
        customerSurname: customerSurname,
        gsmNumber: gsmNumber,
        email: email,
    },
    products: products
}

weepay.formInitialize(requestBody).then(function (res: any) {
    if (res.status == "success") {
        window.location.href = res.paymentPageUrl;
    } else {
        console.log(res.message)
    }
});

}

const getIp = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
};