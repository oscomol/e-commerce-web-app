import { compose, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const orderAdapter = createEntityAdapter();
const initialState = orderAdapter.getInitialState();

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: () => ({
                url: '/order',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return orderAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                // console.log(res);
                if(!res?.ids && res?.length) {
                    return [
                        {type: "order", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "order", id}))
                    ]
                }else return [{type: 'order', id: 'LIST'}]
            }
        }),
        getAllOrderById: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return orderAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                if(!res?.ids && res?.length) {
                    return [
                        {type: "order", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "order", id}))
                    ]
                }else return [{type: 'order', id: 'LIST'}]
            }
        }),
        createOrder: builder.mutation({
            query: (file) => ({
                url: '/order',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'order', id: 'LIST'}]
        }),
        updateOrder: builder.mutation({
            query: (file) => ({
                url: '/order',
                method: 'PUT',
                body: file
            }),
            invalidatesTags: [{type: 'order', id: 'LIST'}]
        }),
        deleteOrder: builder.mutation({
            query: (file) => ({
                url: '/order',
                method: 'DELETE',
                body: file
            }),
            invalidatesTags: [{type: 'order', id: 'LIST'}]
        })
    })
})

export const {
    useGetOrderQuery,
    useGetAllOrderByIdQuery,
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useUpdateOrderMutation
} = orderSlice;


const selectPostResult = (id) => orderSlice.endpoints.getOrder.select(id);

const selectCouseData = (id) => createSelector(
    selectPostResult(id), res => res.data
);

export const {
    selectAll: selectAllOrder,
    selectById: selectOrderById,
    selectIds: selectOrderId
} = orderAdapter.getSelectors((state, id) => selectCouseData(id)(state) ?? initialState);