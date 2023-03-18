import * as _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ToastContainer} from 'react-toastify';


import {IMG_CDN_URL} from '../../constants';
import { populateCart, populateRestaurant } from '../../redux/cartSlice';
import { addMenuItemToCart, deleteCartById, getCartItems, updateCartById } from '../../services/fetch.service';
import VegLogo from '../../assets/img/veg.png'
import NonVegLogo from '../../assets/img/non-veg.png'

export const Menu = ({menu: {id, name, image_id, veg, price}}) => {
    const dispatch = useDispatch();

    const userId = useSelector(store => store.user.user?.id);
    const cartItems = useSelector(store => store.cart.items);
    const { quantity, id: cartId } = _.find(cartItems, { menu_id: id }) ?? {quantity: 0};
    const {id: restaurant_id, name: restaurant_name, area, image_id: restaurant_image_id} = useSelector(store => store.restraunt.restrauntDetails);
    
    const decrementQuantity = () => {
        const updatedQuantity = quantity - 1
        addItemToCart(false, updatedQuantity);
    }   

    const incrementQuantity = () => {
        const updatedQuantity = quantity + 1
        addItemToCart(true, updatedQuantity);
    }

    const addToCart = () => {
        incrementQuantity();
    }

    const addItemToCart = async (isIncrement, quantity) => {

        const index = _.findIndex(cartItems, {menu_id: id});
        if (index < 0) {
            const payload = {
                user_id: userId,
                menu_id: id,
                restaurant_id,
                restaurant_name,
                restaurant_image_id,
                quantity,
                price,
                total: (price / 100) * quantity
            }  

            await addMenuItemToCart(payload);
            const {restaurant, cart} = await getCartItems(userId);
            dispatch(populateCart(cart));
            dispatch(populateRestaurant(restaurant));
        } else {
            const payload = {
                quantity,
                total: (price / 100) * quantity
            }  
            
            quantity === 0 
                ? await deleteCartById(cartId, userId)
                : await updateCartById(cartId, userId, payload)
            const {restaurant, cart} = await getCartItems(userId);
            dispatch(populateCart(cart));
            dispatch(populateRestaurant(restaurant));
        }
    }

    return (
        <>
        
            <ToastContainer position="top-center" />
            <div className="menu-items">
                    <div className="description">
                        {
                            veg ? <img src={VegLogo}></img> : <img src={NonVegLogo}></img>
                        }
                        <span>{name}</span>
                        <span>{'₹ ' + price / 100}</span>
                    </div>

                    <div className='buttons'>
                    {
                        _.isEmpty(image_id) 
                            ? <img src=''></img>
                            : <img src={IMG_CDN_URL + image_id}></img>
                        
                    }

                    {
                        (quantity > 0) 
                        ?   <div className='cart-increment-decrement'>
                                <div className="input-group">
                                    <button type="button" className='btn-left' onClick={() => decrementQuantity()}>-</button>
                                </div>
                                <span>{quantity}</span>
                                <div className="input-group">
                                    <button type="button"  className='btn-right'  onClick={() => incrementQuantity()}>+</button>
                                </div>
                            </div> 
                        :   <button className='add-button' onClick={() => addToCart()}>ADD</button>
                    }
                    </div>
            </div>
        </>
    )
}