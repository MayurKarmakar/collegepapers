import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    key: null,
    error: null,
    loading: false,
    regError: null
}


const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        key: action.key,
        error:null,
        loading: false,
        regError: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        key: null,
        loading: false
    })
}

const regStart =   (state, action) => {
    return updateObject (state, {
        error: null,
        loading: true
    })
} 

const authRegister = (state, action) => {
    return updateObject (state, {
        key: action.key,
        error: null,
        loading: false
    })
}

const regFail = (state, action) => {
    return updateObject (state, {
        regError: action.regError,
        loading: false
    })
}

const reducer = (state=initialState, action) => {
    
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTRATION_START: return regStart(state, action);
        case actionTypes.REGISTRATION_SUCCESS: return authRegister(state, action);
        case actionTypes.REGISTRATION_FAIL: return regFail(state, action);
        default:
            return state
    }
}

export default reducer