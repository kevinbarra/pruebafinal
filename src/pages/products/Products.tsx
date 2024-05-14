import { useEffect, useState } from 'react';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import PageTemplate from "@assets/PageTemplate";
import axios from 'axios'; // Ensure axios is installed
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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://backend-production-b113.up.railway.app/products');
                const productsData: Product[] = response.data;
                setProducts(productsData);
                const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
                setCategories(uniqueCategories);
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
            <Dropdown value={selectedCategory} options={categories} onChange={(e) => setSelectedCategory(e.value)} placeholder="Select a category" style={{ marginBottom: '1em' }} />
            <div className="card">
                {products.filter(product => !selectedCategory || product.category === selectedCategory).map(product => itemTemplate(product))}
                {showModal && selectedProduct && <ProductDetail product={selectedProduct} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Products;
