import * as _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VegLogo from '../../assets/img/veg.png'
import NonVegLogo from '../../assets/img/non-veg.png'
import {IMG_CDN_URL} from '../../constants';
import { addItem, populateCart, updateItem, updateRestrauntInfo } from '../../redux/cartSlice';
import { addMenuItemToCart, deleteCartById, getCartItems, updateCartById } from '../../services/fetch.service';

export const Menu = ({menu: {id, name, image_id, veg, price}}) => {

    const userId = process.env.HASURA_USER_ID;
    const cartItems = useSelector(store => store.cart.items);
    const { quantity, id: cartId } = _.find(cartItems, { menu_id: id }) ?? {quantity: 0};
    const {name: restrauntName, area, image_id: restaurant_image_id} = useSelector(store => store.restraunt.restrauntDetails);
    const dispatch = useDispatch();
    

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

        let cartDetail;
        const index = _.findIndex(cartItems, {menu_id: id});
        if (cartItems.length === 0) {
            // dispatch(updateRestrauntInfo({restrauntName, area, restaurant_image_id}))
            
        }
        if (index < 0) {
            // cartDetail = {id, veg ,name, quantity, price}
            // dispatch(addItem(cartItems?.length ? [...cartItems, cartDetail] : [cartDetail]));
            const payload = {
                user_id: userId,
                menu_id: id,
                quantity,
                price,
                total: (price / 100) * quantity
            }  

            const response = await addMenuItemToCart(payload);
            const newCartList = await getCartItems();
            dispatch(populateCart(newCartList));
        } else {
            const payload = {
                quantity,
                total: (price / 100) * quantity
            }  
            
            const response =  quantity === 0 
                ? await deleteCartById(cartId)
                : await updateCartById(cartId, payload)
            const newCartList = await getCartItems();
            dispatch(populateCart(newCartList));   
        }
    }

    return (
        <>
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