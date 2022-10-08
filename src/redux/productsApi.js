import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.PUBLIC_URL + '/data/products.json' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '',
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;