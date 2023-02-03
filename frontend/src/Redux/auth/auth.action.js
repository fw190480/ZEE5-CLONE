
import { AUTH_SIGN_IN_ERROR, AUTH_SHOW_LOADING, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT, AUTH_SIGN_UP_ERROR, AUTH_HIDE_LOADING, AUTH_SIGN_UP_SUCCESS,RESET_INFO } from './../auth/auth.type';
import axios  from 'axios';
import { development_url,production_url } from '../../Utils/url.links';


const url = `${development_url}/users`
export const authSignInSucess = (payload) => async(dispatch)=> {
    try{
        dispatch({type:AUTH_SHOW_LOADING})
        let res = await axios.post(`${url}/login`, payload);
       
        dispatch({type:AUTH_HIDE_LOADING})
        dispatch({
           type: AUTH_SIGN_IN_SUCCESS,
           payload: res
       })
    }catch(e){
        dispatch({type:AUTH_HIDE_LOADING})
        dispatch({type:AUTH_SIGN_IN_ERROR,payload:e.response.status})

    }

}

export const authSignUpSucess = (payload) => async (dispatch) => {
   try{

    dispatch({type:AUTH_SHOW_LOADING})
    let res = await axios.post(`${url}/signup`, payload);
    // console.log(res)
    dispatch({type:AUTH_HIDE_LOADING})
    dispatch({
        type: AUTH_SIGN_UP_SUCCESS,
        payload: res
    })
   }catch(err){
    dispatch({type:AUTH_HIDE_LOADING})
    dispatch({type:AUTH_SIGN_UP_ERROR,
    payload:err.response.status
    })
    console.log(err)
   }
}

export const authSignOut = () => {
    return {
        type: AUTH_SIGN_OUT
    }
}

export const resetInfo = ()=>{
    return {
        type:RESET_INFO
    }
}