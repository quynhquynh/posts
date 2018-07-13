export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export function deletePost(id, callback){
    callback()
    return {
        type: DELETE_POST,
        payload: id
    }
}

export const addPost = (post, callback) => {
    callback()
    return {
        type: ADD_POST,
        payload: post
    }
}


export const updatePost = post => {
    return {
        type: UPDATE_POST,
        payload: post
    }
}


export const signup = (info, callback) => {
    callback()
    return {
        type: SIGNUP,
        payload: info
    }
}


export const login = (info, callback) => {
    callback()
    return {
        type: LOGIN,
        payload: info
    }
}


export const logout = () => {
    return {
        type: LOGOUT
    }
}