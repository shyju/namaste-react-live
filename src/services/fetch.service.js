import * as _ from 'lodash';

const BASE_URL = process.env.BASE_URL;

export const getCartItems = async() => {
    const response = await fetch(`${BASE_URL}getCartItems`);
    const {cart} =  await response.json();
    return _.map(cart, ({id, price, quantity, total, menu}) => ({
            id,
            price,
            quantity,
            total,
            menu_id: menu.id,
            name: menu.name,
            image_id: menu.image_id,
            veg: menu.veg
        }));
}

export const getAddresses = async(userId) => {
    const response = await fetch(`http://localhost:8080/api/rest/user/${userId}/getAddresses`);
    return await response.json();
}

export const addToCart = async(payload) => {
    const response = await fetch('http://localhost:8080/api/rest/addToCart', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return await response.json();
}

export const updateCartById = async(cartId, payload) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/updateCartById`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    return await response.json();
}

export const deleteCartById = async(cartId) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/deleteCartById`, {
        method: 'DELETE'
    });
    return await response.json();
}

