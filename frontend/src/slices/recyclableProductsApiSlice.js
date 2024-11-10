import { apiSlice } from './apiSlice';
import { RECYCLABLE_PRODUCTS_URL } from './constants';

export const recyclableProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecyclableProducts: builder.query({
      query: ({ keyword = '', pageNumber = 1 } = {}) => ({
        url: RECYCLABLE_PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['RecyclableProduct'],
    }),
    getRecyclableProductDetails: builder.query({
      query: (productId) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createRecyclableProduct: builder.mutation({
      query: () => ({
        url: `${RECYCLABLE_PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),
    updateRecyclableProduct: builder.mutation({
      query: (data) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),
    deleteRecyclableProduct: builder.mutation({
      query: (productId) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['RecyclableProduct'],
    }),
    getTopRecyclableProducts: builder.query({
      query: () => `${RECYCLABLE_PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetRecyclableProductsQuery,
  useGetRecyclableProductDetailsQuery,
  useCreateRecyclableProductMutation,
  useUpdateRecyclableProductMutation,
  useDeleteRecyclableProductMutation,
  useGetTopRecyclableProductsQuery,
} = recyclableProductsApiSlice;
