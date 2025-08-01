import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL,credentials: 'include' });


async function baseQueryWithAuth(args, api, extra){
    const result = await baseQuery(args, api, extra);
    if (result.error && result.error.status === 401) {
        //api.dispatch(logout());
    }
    return result;
}


const apiSlice = createApi({
    baseQuery:baseQueryWithAuth,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})

})

export { apiSlice }

