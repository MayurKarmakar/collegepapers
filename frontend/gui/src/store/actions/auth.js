import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (key) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        key: key
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const regStart = () => {
    return {
        type: actionTypes.REGISTRATION_START
    }
}

export const regFail = (error) => {
    return {
        type: actionTypes.REGISTRATION_FAIL,
        regError: error
    }
}

export const authLogin = (email, password) => {
    return dispatch =>{
        dispatch(authStart())

        axios.post("https://api.collegepapers.in/rest-auth/login/",{
            email: email,
            password: password
        })
        // axios.post("http://127.0.0.1:8000/rest-auth/login/",{
        //     email: email,
        //     password: password
        // })
        .then(res=>{
            console.log(res)
            localStorage.setItem('key', res.data.key)
            dispatch(authSuccess(res.data.key))
            dispatch(getUserDetails(res.data.key))
        })
        .catch(error=>{
            if(error.response){
                dispatch(authFail(error.response))
            }else if(error.request){
                dispatch(authFail('NETWORK_ERROR'))
            }
        })
    }
}

export const Logout = () => {
    localStorage.removeItem('key')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authRegistration = (firstName, lastName, email, password1, password2) => {

    return dispatch =>{
        dispatch(regStart())

        axios.post('https://api.collegepapers.in/rest-auth/registration/user-registration/',{
            first_name: firstName,
            last_name: lastName,
            email: email,
            password1: password1,
            password2: password2,
        })
        // axios.post('http://127.0.0.1:8000/rest-auth/registration/user-registration/',{
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password1: password1,
        //     password2: password2,
        // })
        .then(res=>{
            localStorage.setItem('key',res.data.key)
            dispatch(authSuccess(res.data.key))
            dispatch(getUserDetails(res.data.key))
        })
        .catch(error => {
            if(error.response){
                localStorage.setItem('errors',error.response)
                dispatch(regFail(error.response))
            }else if(error.request){
                dispatch(regFail('NETWORK_ERROR'))
            }
        })
    }

}

export const getUserDetails = key => {
    return dispatch => {
        
        
        axios.get('https://api.collegepapers.in/rest-auth/user/',{headers:{
            'Authorization': `Token ${key}`
        }})
        // axios.get('http://127.0.0.1:8000/rest-auth/user/',{headers:{
        //     'Authorization': `Token ${key}`
        // }})
        .then(res=>{
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('firstname', res.data.first_name)
            localStorage.setItem('lastname', res.data.last_name)
            dispatch(authSuccess(key))
        })
        .catch(error=>{
            
            if(error){
                dispatch(authFail(error))
            }else if(error.message && error.name){
                console.log(error.message)
                dispatch(authFail(error.message))
            }
        })
    }
}