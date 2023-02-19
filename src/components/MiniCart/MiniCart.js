import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';

import EmptyCart from '../../assets/img/EmptyCart.jpeg';
import { CartItem } from '../CartItem/CartItem';
import StripeCheckout from 'react-stripe-checkout';

export const MiniCart = ({name}) => {

    const [subTotal, setSubTotal] = useState(0);
    const navigate = useNavigate();
    const cartItems = useSelector(store => store.cart.items);
    useEffect(() => {
        const calculatedTotal =  _.reduce(cartItems, (sum, {price, quantity}) => {
            sum = sum + ((price * quantity) / 100)
            return sum;
        }, 0)
        setSubTotal(calculatedTotal.toFixed(2));
    }, [cartItems])

    return (
        <>
            <div className="mini-cart">
                {
                    (!cartItems?.length) 
                    ? <div className='empty-cart'>
                        <span>Cart Empty</span>
                        <img src={EmptyCart} />
                        <p>Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
                    </div> 
                    : <div className='non-empty-cart'>
                        <div className="cart-header">
                            <span>Cart</span>
                            <span>from <strong style={{color: '#5d8ed5', fontSize: '18px'}}>{name}</strong></span>
                            <span>{cartItems?.length} ITEM</span>
                        </div>
                        <div className="cart-details">
                            {
                                cartItems?.map(cartItem => (
                                    <CartItem {...cartItem} key={cartItem.id} />
                                ))
                            }
                            <div className="sub-total">
                                <span>Subtotal</span>
                                <span>₹ {subTotal}</span>
                            </div>
                            <div className='cart-footer'>
                                <span>Extra charges may apply</span>
                                <button className="checkout-btn" onClick={() => navigate('/checkout')}>Checkout</button>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}