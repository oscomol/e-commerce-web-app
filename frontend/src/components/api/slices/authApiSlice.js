import { apiSlice } from "../apiSlice";
import { logout } from "./authSliceData";
import { setCredentials } from "./authSliceData";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: {...loginData}
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
                credentials: 'include'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accesToken } = data
                    console.log(accesToken)
                    dispatch(setCredentials(accesToken))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation
} = authApiSlice;