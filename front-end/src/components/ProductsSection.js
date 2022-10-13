import React, { useEffect, useState } from 'react';
import { requestData } from '../services/requests';
import ProductsCard from './ProductsCard';
import SubtotalBar from './SubtotalBar';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  const getProducts = (endpoint) => requestData(endpoint)
    .then((response) => setProducts(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    if (cartStorage === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
    }
    getProducts('/products');
  }, []);

  return (
    <div>
      { products.map(({
        id,
        name,
        price,
        urlImage,
      }) => (
        <ProductsCard
          key={ id }
          id={ id }
          name={ name }
          price={ price }
          urlImage={ urlImage }
        />
      )) }
      <SubtotalBar />
    </div>
  );
}
