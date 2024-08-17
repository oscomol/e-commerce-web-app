import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: `/user`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return userAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                if(!res?.ids && res?.length) {
                    return [
                        {type: "user", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "user", id}))
                    ]
                }else return [{type: 'user', id: 'LIST'}]
            }
        }),
        createUser: builder.mutation({
            query: (file) => ({
                url: '/user',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'user', id: 'LIST'}]
        }),
        getOneUser: builder.mutation({
            query: (file) => ({
                url: '/user',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'user', id: 'LIST'}]
        }),
        updateUser: builder.mutation({
            query: (file) => ({
                    url: "/user",
                    method: 'PUT',
                    body: {...file}
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'user', id: args.initialState}
            ],
        }),
        handleBlockUser: builder.mutation({
            query: (initialState) => ({
                    url: "/user/block",
                    method: 'PUT',
                    body: initialState
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'user', id: args.initialState}
            ],
        }),
        deleteUser: builder.mutation({
            query: (file) => ({
                    url: "/user",
                    method: 'DELETE',
                    body: file
            }),
            invalidatesTags: (result, error, args) => [
                {type: 'user', id: args.initialState}
            ],
        }),
    })
})

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetOneUserMutation,
    useHandleBlockUserMutation
} = userSlice;


const selectPostResult = (id) => userSlice.endpoints.getUser.select(id);

const selectCouseData = (id) => createSelector(
    selectPostResult(id), res => res.data
);

export const {
    selectAll: selectAllUser,
    selectById: selectUserById,
    selectIds: selectUserId
} = userAdapter.getSelectors((state, id) => selectCouseData(id)(state) ?? initialState);