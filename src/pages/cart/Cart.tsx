import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from "primereact/card";
import PageTemplate from "@assets/PageTemplate";
import { useCart } from '@hooks/useCart.ts';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, fetchCart } = useCart(); // Destructuring to get cartItems directly

    useEffect(() => {
        fetchCart(); // Fetch products from the server on component mount
    }, [fetchCart]);

    const itemTemplate = (product: Product) => (
        <Card title={product.name} subTitle={`$${product.price}`} className="mx-3 my-2" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <div>
                <div className="text-700">{product.description}</div>
                <Rating value={product.rating} readOnly cancel={false} />
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
            </div>
        </Card>
    );


    return (
        <PageTemplate needBack2Top>
            <div className="card">
                <DataScroller value={cartItems} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
            </div>
        </PageTemplate>
    );
};

export default Cart;
