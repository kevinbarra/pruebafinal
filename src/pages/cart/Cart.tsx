// Cart.tsx
import  { useEffect, useState } from 'react';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import PageTemplate from "@assets/PageTemplate";
import axios from 'axios';
import OrderDetail from './OrderDetail';


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
    const [Orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching Orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleOrderSelect = (Order: Order) => {
        setSelectedOrder(Order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const itemTemplate = (Order: Order) => (
        <Card className="mx-3 my-2" onClick={() => handleOrderSelect(Order)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Order.image} alt={Order.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{Order.name}</h2>
                    <p>${Order.price}</p>
                    <div className="text-700">{Order.description}</div>
                    <Rating value={Order.rating} readOnly cancel={false} />
                    <Button label="View Details" icon="pi pi-eye" />
                </div>
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                {Orders.map(Order => itemTemplate(Order))}
                {showModal && selectedOrder && <OrderDetail order={selectedOrder} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Cart;
