import axios from 'axios';
import { useState } from 'react';

export const useOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5176/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return {
        orders,
        fetchOrders
    };
};
