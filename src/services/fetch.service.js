import * as _ from 'lodash';

const BASE_URL = process.env.BASE_URL;

export const getRestaurants = async() => {
    const data = await fetch(`${BASE_URL}allRestraunts`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    });
    const json = await data.json();
    const restaurantList = json.restaurants;
    return restaurantList;
}

export const getRestaurantById =  async(id) => {
    const data = await fetch(`${BASE_URL}restraunt/${id}/getRestraunt`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    })
    const json = await data.json();
    return json.restaurants_by_pk;
}

export const getCartItems = async() => {
    const response = await fetch(`${BASE_URL}getCartItems`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    });
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
    const response = await fetch(`${BASE_URL}user/${userId}/getAddresses`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'x-hasura-user-id': process.env.HASURA_USER_ID
        }
    });
    return await response.json();
}

export const addToCart = async(payload) => {
    const response = await fetch('${BASE_URL}addToCart', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return await response.json();
}

export const updateCartById = async(cartId, payload) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/updateCartById`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    });
    return await response.json();
}

export const deleteCartById = async(cartId) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/deleteCartById`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    });
    return await response.json();
}

