export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GENERATE_DATE = 'GENERATE_DATE'


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


export const generateDate = () => {
    const [day, month, year] = [
        new Date().getDate(),
        new Date().getMonth() + 1,
        new Date().getFullYear()
    ]
    const date = `${day > 9 ? day : `0${day}`}.${month > 9 ? month : `0${month}`}.${year}`
    return {
        type: GENERATE_DATE,
        payload: date
    }
}