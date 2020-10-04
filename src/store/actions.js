export const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
});


export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SELECT_ORDER = 'SELECT_ORDER';
export const CLEAN_CART = 'CLEAN_CART';

export const selectProduct = (product) => ({
    type: SELECT_PRODUCT,
    payload: product
});

export const deleteProduct = (product) => ({
    type: DELETE_PRODUCT,
    payload: product
});


export const selectOrder = (order) => ({
    type: SELECT_ORDER,
    payload: order
});

export const cleanCart = () => ({
    type: CLEAN_CART
})


export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});


export const SET_USER = 'SET_USER';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});