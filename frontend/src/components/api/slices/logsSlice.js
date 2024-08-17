import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const logsAdapter = createEntityAdapter();
const initialState = logsAdapter.getInitialState();

export const logsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLogs: builder.query({
            query: () => ({
                url: `/logs`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                return logsAdapter.setAll(initialState, responseData)
            },
            providesTags: (results, error, arg) => {
                const res = results ?? [];
                console.log(res)
                if(!res?.ids && res?.length) {
                    return [
                        {type: "logs", id: 'LIST'},
                        ...results.ids?.map(id => ({type: "logs", id}))
                    ]
                }else return [{type: 'logs', id: 'LIST'}]
            }
        }),
        createLogs: builder.mutation({
            query: (file) => ({
                url: '/logs',
                method: 'POST',
                body: file
            }),
            invalidatesTags: [{type: 'logs', id: 'LIST'}]
        }),
        deleteLogs: builder.mutation({
            query: (file) => ({
                url: '/logs',
                method: 'DELETE',
                body: file
            }),
            invalidatesTags: [{type: 'logs', id: 'LIST'}]
        })
    })
})

export const {
    useGetLogsQuery,
    useCreateLogsMutation,
    useDeleteLogsMutation
} = logsSlice;


const selectPostResult = (id) => logsSlice.endpoints.getLogs.select();

const selectCouseData = (id) => createSelector(
    selectPostResult(id), res => res.data
);

export const {
    selectAll: selectAlllogs,
    selectById: selectlogsById,
    selectIds: selectlogsId
} = logsAdapter.getSelectors((state, id) => selectCouseData(id)(state) ?? initialState);