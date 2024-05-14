import React from 'react';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

interface ProductDetailProps {
    product: Product | null;
    onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
    if (!product) {
        return (
            <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <h1>No product found</h1>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 flex align-items-center justify-content-center p-4">
            <div className="surface-card p-4 shadow-2 border-round" style={{ backgroundColor: 'white', maxWidth: '600px', width: '100%', margin: 'auto' }}>
                <div className="grid">
                    <div className="col-12 md:col-6">
                        <Image src={product.image} alt={product.name} preview width="100%" className="border-round" />
                    </div>
                    <div className="col-12 md:col-6 p-fluid">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="text-sm text-700 mt-2">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">${product.price}</p>
                        <p className="text-sm mt-2">Category: {product.category}</p>
                        <Rating value={product.rating} readOnly cancel={false} stars={5} className="mt-4" />
                        <div className="flex mt-4">
                            <Button label="Add to Cart" icon="pi pi-shopping-cart" className="mr-2 p-button-raised p-button-primary" />
                            <Button label="Close" icon="pi pi-times" className="p-button-outlined" onClick={onClose} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
