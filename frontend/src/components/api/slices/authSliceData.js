import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, order: [], socketID: null, products: [], messages: [], notification: [], navs: []},
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
        },
        logout: (state, action) => {
            state.token = null;
            state.socketID = null;
            state.order = [];
            state.messages = [];
            state.products = [];
            state.notification = [];
            state.navs = [];
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSocketID: (state, action) => {
            state.socketID = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setNavs: (state, action) => {
            state.navs = action.payload;
        }
    }
})

export const {setCredentials, logout, setOrder, setSocketID, setProducts, setMessages, setNotification, setNavs} = authSlice.actions;
export const getToken = (state) => state.auth.token;
export const getOrder = (state) => state.auth.order;
export const getSocketID = (state) => state.auth.socketID;
export const getProducts = (state) => state.auth.products;
export const getMessages = (state) => state.auth.messages;
export const getNotificaion = (state) => state.auth.notification;
export const getNavs = (state) => state.auth.navs;
export default authSlice.reducer;