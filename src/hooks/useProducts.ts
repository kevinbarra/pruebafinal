import { useState } from 'react';
import { useAPI } from './useAPI';

export const useProducts = () => {
    const { get, post, put, delet } = useAPI();
    const [products, setProducts] = useState([]);

    // Función para obtener productos
    const fetchProducts = async () => {
        const response = await get('/products');
        if (response) {
            setProducts(response);
        }
    };

    // Función para agregar un producto
    const addProduct = async (productData: never) => {
        const response = await post('/products', JSON.stringify(productData));
        if (response) {
            fetchProducts();
        }
    };

    // Función para actualizar un producto
    const updateProduct = async (productId: never, productData: any) => {
        const response = await put(`/products/${productId}`, JSON.stringify(productData));
        if (response) {
            fetchProducts();
        }
    };

    // Función para eliminar un producto
    const removeProduct = async (productId: never) => {
        const response = await delet(`/products/${productId}`);
        if (response) {
            fetchProducts();
        }
    };

    return { products, addProduct, updateProduct, removeProduct, fetchProducts };
};
