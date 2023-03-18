import * as _ from 'lodash';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const NODE_BASE_URL = process.env.NODE_URL;

axios.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error);
    return Promise.reject(error?.message);
  });

export const getUser = async (auth_id) => {
    const requestConfig = {
        url: `${BASE_URL}getUser`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': auth_id
        }
    }
    const {data} = await axios(requestConfig);
    return data?.user[0]?.id;
}

export const getRestaurants = async() => {
    const requestConfig = {
        url: `${BASE_URL}allRestraunts`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    }
    const {data} = await axios(requestConfig);
    return data?.restaurants;
}

export const getRestaurantById =  async(id) => {
    const requestConfig = {
        url: `${BASE_URL}restraunt/${id}/getRestraunt`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
    }
    const {data} = await axios(requestConfig);
    return data?.restaurants_by_pk;
}

export const getCartItems = async(user_id) => {
    const requestConfig = {
        url: `${BASE_URL}getCartItems`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'x-hasura-role': 'user',
            'X-Hasura-User-Id': user_id
        }
    };

    const {data: {cart}} = await axios(requestConfig);
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
    const requestConfig = {
        url: `${BASE_URL}user/${userId}/getAddresses`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    }
    const {data} = await axios(requestConfig);
    return data;
}

export const addMenuItemToCart = async(payload) => {
    const requestConfig = {
        method: 'POST',
        url: `${BASE_URL}addToCart`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        },
        data: payload
    };
    const {data} = await axios(requestConfig);
    return data;
}

export const updateCartById = async(cartId, userId, payload) => {
    const requestConfig = {
        method: 'PUT',
        url: `${BASE_URL}cart/${cartId}/updateCartById`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: payload
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const deleteCartById = async(cartId, userId) => {
    const requestConfig = {
        method: 'DELETE',
        url: `${BASE_URL}cart/${cartId}/deleteCartById`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const clearCart = async (userId) => {
    const requestConfig = {
        method: 'DELETE',
        url: `${BASE_URL}cart/${userId}/clearCart`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const addNewAddress = async(userId, payload) => {
    const requestConfig = {
        method: 'POST',
        url: `${BASE_URL}address/${userId}/newAddress`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: payload
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const editAddress = async(addressId, userId, payload) => {
    const requestConfig = {
        method: 'PUT',
        url: `${BASE_URL}address/${addressId}/updateAddress`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: payload
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const createOrder = async(payload, userId) => {
    const requestConfig = {
        method: 'POST',
        url: `${BASE_URL}createOrder`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: payload
    };

    const {data} = await axios(requestConfig);
    return {id: data?.insert_order_details?.returning[0]?.id};
}

export const insertOrderItems = async(payload, userId) => {
    const requestConfig = {
        method: 'POST',
        url: `${BASE_URL}insertOrderItems`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: payload
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const getAllOrders = async(userId) => {
    const requestConfig = {
        url: `${BASE_URL}orders`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    };

    const {data} = await axios(requestConfig);
    return data?.order_details;
}

export const addToFavourites = async(restaurant_id, userId) => {
    const requestConfig = {
        method: 'POST',
        url: `${BASE_URL}user/${userId}/addToFavourites`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        },
        data: {restaurant_id}
    };

    const {data} = await axios(requestConfig);
    return data;
}

export const getAllFavourites = async(userId) => {
    const requestConfig = {
        url: `${BASE_URL}favourites`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    };

    const {data} = await axios(requestConfig);
    return data?.favourites;
}

export const removeFavourite = async(favouriteId, userId) => {
    const requestConfig = {
        method: 'DELETE',
        url: `${BASE_URL}user/${favouriteId}/removeFavourite`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'X-Hasura-role': 'user',
            'X-Hasura-User-Id': userId
        }
    };

    const {data} = await axios(requestConfig);
    return data;
}



export const createPaymentIntent = async options => {

    const requestConfig = {
        method: 'POST',
        url: `${NODE_BASE_URL}create-payment-intent`,
        headers: {"content-type": "application/json"},
        data: options
    };

    try {
        const {data} = await axios(requestConfig);
        return data;
    } catch (error) {
        // Handle the error thrown by the interceptor here
        console.log(error);
        throw error;
    }
    // if (!response || response.error) {
    //     throw new Error('PaymentIntent API Error');
    // }
    // if (response.status === 200) {
    //     const intent = await response.json()
    //     console.log('intent', intent)
    //     return intent;
    // } else {
    //     return null;
    // }

    
    // const response = await fetch(`${NODE_BASE_URL}create-payment-intent`, {
    //     method: 'POST',
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(options)
    // })
}