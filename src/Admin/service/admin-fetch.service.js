import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

export const getStatistics = async () => {
    const requestConfig = {
        url: `${BASE_URL}statistics`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    };
    const {data} = await axios(requestConfig);
    return data;
}

export const getGraphStatistics = async () => {
    const requestConfig = {
        url: `${BASE_URL}graphStatistics`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    };
    const {data} = await axios(requestConfig);
    return data;
}

export const getUsers = async () => {
    const requestConfig = {
        url: `${BASE_URL}users`,
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    };
    const {data} = await axios(requestConfig);
    return data;
}