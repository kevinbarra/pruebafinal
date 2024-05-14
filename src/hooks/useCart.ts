import { useState } from 'react';
import {useAPI} from "@hooks/useAPI.ts";

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

export const useCart = () => {
    const { get } = useAPI();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: CartItem) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === product.id);
            if (exist) {
                // Update the quantity
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new item
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const fetchCart = async () => {
        const response = await get('/cart');
        if (response) {
            setCartItems(response);
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };



    return { cartItems,fetchCart, addToCart, removeFromCart };
};
