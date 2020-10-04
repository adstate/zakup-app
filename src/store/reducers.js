import {SET_TOKEN, SELECT_PRODUCT, DELETE_PRODUCT, SELECT_ORDER, CLEAN_CART, ADD_ORDER, SET_USER} from './actions';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    token: null,
    name: null
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_USER:
            return {
                ...state,
                name: action.payload.name,
                phone: action.payload.phone
            }

        case REHYDRATE:
            return {
                ...state,
                token: null
            }

        default:
            return state;
    }
}

export const orderReducer = (
    state = {
        parentOrder: null,
        products: []
    },
    action
) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p !== action.payload)
            }

        case SELECT_ORDER:
            return {
                ...state,
                parentOrder: action.payload
            }

        case CLEAN_CART:
            return {
                ...state,
                parentOrder: null,
                products: []
            }

        default:
            return state;
    }
}

export const orderListReducer = (
    state = {
        orders: [
            {id: 1, name: 'Заказ в RautDv', date: '05.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте', orgName: 'Феликс Ходаквокский', phone: '89241303095'},
            {id: 2, name: 'Заказ в RautDv', date: '09.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте', orgName: 'Феликс Ходаквокский', phone: '89241303095'},
            {id: 3, name: 'Заказ в RautDv', date: '15.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте', orgName: 'Феликс Ходаквокский', phone: '89241303095'}
        ]
    },
    action
) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }

        default:
            return state;
    }
}

export const usersReducer = (
    state = {
        list: [
            {id: 1, name: 'Феликс Ходаковский', phone: '89241303095', org: true},
            {id: 2, name: 'Павел Данилин', phone: '89149908723'}
        ]
    },
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
}
