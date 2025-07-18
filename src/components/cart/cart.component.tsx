'use client';

import { useCartStore } from "@/src/stores/cart.store";

export default function CartComponent() {
    const {toggle} = useCartStore();
    return (
        <div>
            <div className="fixed top-0 left-0 z-50 w-1/2 h-full bg-black opacity-50">
            </div>
            <div className="fixed top-0 left-0 z-50 w-1/2 h-full bg-white">
                <div className="flex justify-end">
                    <button className="p-4" onClick={toggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}