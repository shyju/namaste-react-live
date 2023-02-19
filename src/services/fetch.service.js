import * as _ from 'lodash';

const BASE_URL = process.env.BASE_URL;
const NODE_BASE_URL = process.env.NODE_URL;

export const getUser = async (auth_id) => {
    const data = await fetch(`${BASE_URL}getUser`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': auth_id
        }
    })
    const json = await data.json();
    return json.user[0]?.id;
}

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

export const getCartItems = async(user_id) => {
    const response = await fetch(`${BASE_URL}getCartItems`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'x-hasura-role': 'user',
            'X-Hasura-User-Id': user_id
        }
    });
    const {cart} =  await response.json();
    const {restaurant_id, restaurant_name, restaurant_image_id} = (cart?.length && _.head(cart)) ?? {};

    const cartItems = _.map(cart, ({id, price, quantity, total, menu}) => ({
            id,
            price,
            quantity,
            total,
            menu_id: menu.id,
            name: menu.name,
            image_id: menu.image_id,
            veg: menu.veg
        }));

    return {
        cart: cartItems,
        restaurant: {
            id: restaurant_id,
            name: restaurant_name,
            restaurantImageId: restaurant_image_id
        },
    }
}

export const getAddresses = async(userId) => {
    const response = await fetch(`${BASE_URL}user/${userId}/getAddresses`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    });
    return await response.json();
}

export const addMenuItemToCart = async(payload) => {
    const response = await fetch(`${BASE_URL}addToCart`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    });
    return await response.json();
}

export const updateCartById = async(cartId, userId, payload) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/updateCartById`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    });
    return await response.json();
}

export const deleteCartById = async(cartId, userId) => {
    const response = await fetch(`${BASE_URL}cart/${cartId}/deleteCartById`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    });
    return await response.json();
}

export const clearCart = async (userId) => {
    const response = await fetch(`${BASE_URL}cart/${userId}/clearCart`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    });
    return await response.json();
}

export const addNewAddress = async(userId, payload) => {
    const response = await fetch(`${BASE_URL}address/${userId}/newAddress`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    })
    return await response.json();
}

export const editAddress = async(addressId, userId, payload) => {
    const response = await fetch(`${BASE_URL}address/${addressId}/updateAddress`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    })
    return await response.json();
}



export const createPaymentIntent = async options => {
    console.log('NODE_BASE_URL', NODE_BASE_URL)
    console.log('BASE_URL', BASE_URL)
    const response = await fetch(`${NODE_BASE_URL}create-payment-intent`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(options)
    })
    if (!response || response.error) {
        throw new Error('PaymentIntent API Error');
    }
    if (response.status === 200) {
        const intent = await response.json()
        console.log('intent', intent)
        return intent;
    } else {
        return null;
    }
}