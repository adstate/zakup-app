export const SET_TOKEN = 'SET_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';


export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
});

export const getToken = () => {
    type: GET_TOKEN
}
