import React, { useEffect, useState } from 'react';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import PageTemplate from "@assets/PageTemplate";
import axios from 'axios'; // Asegúrate de que axios está instalado
import ProductDetail from "./productdetail";




type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const itemTemplate = (product: Product) => (
        <Card className="mx-3 my-2" onClick={() => handleProductSelect(product)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <div className="text-700">{product.description}</div>
                    <Rating value={product.rating} readOnly cancel={false} />
                    <Button label="Add to Cart" icon="pi pi-shopping-cart" />
                </div>
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                {products.map(product => itemTemplate(product))}
                {showModal && selectedProduct && <ProductDetail product={selectedProduct} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Products;
