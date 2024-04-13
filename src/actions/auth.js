import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, navigate) =>  async (dispatch) => {
    try {
        console.log("login")
        api.signIn(formData)
            .then((data) => {
                dispatch({ type: AUTH, data })
                data.status === 200 ?
                    navigate('/admin', { replace: true }) : console.log("Invalid user")
            })
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) =>  async (dispatch) => {
    try {
        api.signIn(formData)
            .then((data) => {
                dispatch({ type: AUTH, data })
                if(data.status === 200)
                    navigate('/', { replace: true })
            })
    } catch (error) {
        console.log(error)
    }
}