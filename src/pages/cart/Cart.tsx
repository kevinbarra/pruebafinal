import React, { useEffect, useState } from 'react';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import PageTemplate from "@assets/PageTemplate";
import axios from 'axios'; 

type Order = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const Cart = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Cambiar a usar el puerto correcto (asumiendo que el servidor está en el puerto 3000)
                const response = await axios.get('http://localhost:3000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, []);

    const handleOrderSelect = (order: Order) => {
        // Logic to handle order selection, similar to product selection logic in Products.tsx
    };

    const itemTemplate = (order: Order) => (
        <Card className="mx-3 my-2">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={order.image} alt={order.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{order.name}</h2>
                    <p>${order.price}</p>
                    <div className="text-700">{order.description}</div>
                    <Rating value={order.rating} readOnly cancel={false} />
                    <Button label="View Details" icon="pi pi-eye" />
                </div>
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                {orders.map(order => itemTemplate(order))}
            </div>
        </PageTemplate>
    );
};

export default Cart;
