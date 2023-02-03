
import axios from 'axios';
import { BUY_SUBSCRIPTION } from '../payment/payment.type';

import { AUTH_SIGN_IN_ERROR, AUTH_SHOW_LOADING, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT, AUTH_SIGN_UP_ERROR, AUTH_HIDE_LOADING, AUTH_SIGN_UP_SUCCESS,RESET_INFO } from './../auth/auth.type';
const getData = (key)=>{
    let data = JSON.parse(localStorage.getItem(key));
    return data;
}

const init = {
    loading: false,
    auth:!!localStorage.getItem('token'),
    error: false,
    signup:false,
    isPremium:false,
    token:"",
    status:null
}
export const authReducer = (state = init, { type, payload }) => {

    switch (type) {
        case AUTH_SHOW_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_HIDE_LOADING: {
            return {
                ...state,
                loading: false
            }
        }
        case AUTH_SIGN_IN_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                status:payload
            }
        }
        case AUTH_SIGN_IN_SUCCESS: {
            localStorage.setItem('userCred', JSON.stringify(payload.data.token))

            return {
                ...state,
                loading: false,
                error: false,
                token:payload.data.token,
                auth:true
            }
        }

        case AUTH_SIGN_UP_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                status:payload
            }
        }
        case AUTH_SIGN_UP_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                signup:true,
                status:payload.status
            }

        }
        case AUTH_SIGN_OUT: {
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                error: false,
                signup:false,
                isPremium:false,
                token:"",
                auth:false
            }
        }

        case RESET_INFO:{
            return {
                ...state,
                loading:false,
                error:null,
                status:null
            }
        }

        case BUY_SUBSCRIPTION :{
            // axios.patch(`https://vidfy.up.railway.app/users/payment`,payload)
            return{
                ...state,
                isPremium:true
            }
        }
        default: return state
    }
}