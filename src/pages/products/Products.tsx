import { useEffect, useState } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from "primereact/card";
import PageTemplate from "@assets/PageTemplate";
import { useProducts } from '@hooks/useProducts';
import ProductDetail from "@pages/products/productdetail";

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
    const { product, fetchProducts } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const itemTemplate = (product) => (
        <Card className="mx-3 my-2"  onClick={() => handleProductSelect(product)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <div>
                        <div className="text-700">{product.description}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                        <Button label="Add to Cart" icon="pi pi-shopping-cart" />
                    </div>
                </div>
            </div>
        </Card>
    );


    return (
        <PageTemplate needBack2Top>
            <div className="card">
                <DataScroller value={product} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
                {showModal && <ProductDetail product={selectedProduct} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Products;
