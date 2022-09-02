import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import {addToDb, getStoredcart} from '../../utilities/fakedb';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    
    useEffect( () =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect( () =>{
        const addedCart = getStoredcart();
        const savedCart = [];
        for(const id in addedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const  quantity = addedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart); 
    },[products])
    const handleAddToCart = (selectedProduct) =>{
        let newCart = [];
        const exits = cart.find(product => product.id === selectedProduct.id);
        if(!exits){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...rest,exits];
        }
       
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    return (
        <div className='shop'>
            <div className="products-container">
               {
                   products.map(product => <Product
                     key={product.id}
                     product={product}
                     handleAddToCart={handleAddToCart}
                     ></Product>)
               }
            </div>
            <div className="cart-container">
              <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;