import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;
    console.log(cart);
    let totall = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
       totall = totall + product.price * product.quantity;
       shipping = shipping + product.shipping * product.quantity;
    }
    const tax = parseFloat((totall * 0.1).toFixed(2));
    const grandTotall = totall + shipping + tax;
    return (
        <div className='cart'>
             <h4>Order Summary</h4>
             <p>Selected items: {quantity}</p>
             <p>Totall Price: ${totall}</p>
             <p>Totall Shipping: ${shipping}</p>
             <p>Tax: ${tax}</p>
             <h5>Grand Totall: ${grandTotall.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;