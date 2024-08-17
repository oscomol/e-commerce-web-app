import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const wishlistAdapter = createEntityAdapter();
const initialState = wishlistAdapter.getInitialState();

export const wishlistSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: (id) => ({
                url: `/wishlist/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return wishlistAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                if(!res?.ids && res?.length) {
                    return [
                        {type: "wishlist", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "wishlist", id}))
                    ]
                }else return [{type: 'wishlist', id: 'LIST'}]
            }
        }),
        createWishlist: builder.mutation({
            query: (file) => ({
                url: '/wishlist',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'wishlist', id: 'LIST'}]
        }),
        updateWishlist: builder.mutation({
            query: (file) => ({
                url: '/wishlist',
                method: 'PUT',
                body: file
            }),
            invalidatesTags: [{type: 'wishlist', id: 'LIST'}]
        }),
        deleteWishlist: builder.mutation({
            query: (file) => ({
                url: '/wishlist',
                method: 'DELETE',
                body: file
            }),
            invalidatesTags: [{type: 'wishlist', id: 'LIST'}]
        })
    })
})

export const {
    useGetWishlistQuery,
    useCreateWishlistMutation,
    useDeleteWishlistMutation,
    useUpdateWishlistMutation
} = wishlistSlice;


const selectPostResult = (id) => wishlistSlice.endpoints.getWishlist.select(id);

const selectCouseData = (id) => createSelector(
    selectPostResult(id), res => res.data
);

export const {
    selectAll: selectAllWishlist,
    selectById: selectWishlistById,
    selectIds: selectWishlistId
} = wishlistAdapter.getSelectors((state, id) => selectCouseData(id)(state) ?? initialState);