import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const productAdapter = createEntityAdapter();
const initialState = productAdapter.getInitialState();

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => ({
                url: `/product`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return productAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                if(!res?.ids && res?.length) {
                    return [
                        {type: "product", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "product", id}))
                    ]
                }else return [{type: 'product', id: 'LIST'}]
            }
        }),
        getTopProduct: builder.query({
            query: () => ({
                url: '/product/topProduct',
                method: 'GET'
            })
        }),
        createProduct: builder.mutation({
            query: (file) => ({
                url: '/product',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'product', id: 'LIST'}]
        }),
        checkQuantity: builder.mutation({
            query: (file) => ({
                url: '/product/quantity',
                method: 'POST',
                body: file
            })
        }),
        updateProductInfo: builder.mutation({
            query: (file) => ({
                    url: "/product",
                    method: 'PUT',
                    body: {...file}
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'product', id: args.initialState}
            ],
        }),
        updateProductPhoto: builder.mutation({
            query: (file) => ({
                    url: "/product/productPhoto",
                    method: 'PUT',
                    body: file
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'product', id: args.initialState}
            ],
        }),
        deleteProduct: builder.mutation({
            query: (file) => ({
                    url: "/product",
                    method: 'DELETE',
                    body: file
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'product', id: args.initialState}
            ],
        }),
    })
})

export const {
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductInfoMutation,
    useDeleteProductMutation,
    useUpdateProductPhotoMutation,
    useGetTopProductQuery,
    useCheckQuantityMutation
} = productSlice;


const selectPostResult = (id) => productSlice.endpoints.getProduct.select(id);

const selectCouseData = (id) => createSelector(
    selectPostResult(id), res => res.data
);

export const {
    selectAll: selectAllproduct,
    selectById: selectproductById,
    selectIds: selectproductId
} = productAdapter.getSelectors((state, id) => selectCouseData(id)(state) ?? initialState);