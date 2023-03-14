const BASE_URL = process.env.BASE_URL;
const ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

export const getStatistics = async () => {
    const response = await fetch(`${BASE_URL}statistics`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    });
    return await response.json()
}

export const getGraphStatistics = async () => {
    const response = await fetch(`${BASE_URL}graphStatistics`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    });
    return await response.json()
}

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}users`, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET
        }
    });

    return await response.json();
}