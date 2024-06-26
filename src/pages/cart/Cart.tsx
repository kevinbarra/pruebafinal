// Cart.tsx
import { useEffect, useState } from 'react';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
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
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://backend-production-b113.up.railway.app/orders');
                const ordersData: Order[] = response.data;  // Assert that response.data is an array of Order
                setOrders(ordersData);
                // Use a Set to filter out unique categories and then convert it back to an array
                const categorySet = new Set<string>();  // Specify the type of elements in the Set
                ordersData.forEach(order => {
                    categorySet.add(order.category);
                });
                setCategories(Array.from(categorySet));  // Convert Set to Array
            } catch (error) {
                console.error('Error fetching Orders:', error);
            }
        };
        fetchOrders();
    }, []);
    

    const handleOrderSelect = (order: Order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const itemTemplate = (order: Order) => (
        <Card className="mx-3 my-2" onClick={() => handleOrderSelect(order)}>
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
            <Dropdown value={selectedCategory} options={categories} onChange={(e) => setSelectedCategory(e.value)} placeholder="Select a category" />
            <div className="card">
                {orders.filter(order => !selectedCategory || order.category === selectedCategory).map(order => itemTemplate(order))}
                {showModal && selectedOrder && <OrderDetail order={selectedOrder} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Cart;
