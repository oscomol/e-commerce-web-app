import { compose, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const orderAdapter = createEntityAdapter();
const initialState = orderAdapter.getInitialState();

export const rateSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSlice: builder.mutation({
            query: (file) => ({
                url: '/rate',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'order', id: 'LIST'}]
        }),
        getRate: builder.mutation({
            query: (file) => ({
                url: '/rate/getRate',
                method: 'POST',
                body: file
            })
        })
    })
})

export const {
    useCreateSliceMutation,
    useGetRateMutation
} = rateSlice;