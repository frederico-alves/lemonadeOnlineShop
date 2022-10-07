import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.PUBLIC_URL + '/data/products.json' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '',
        }),
    }),
});

export const { useGetProductsQuery } = productsAPI;