import * as api from '../api'

export const getCategory = () => async (dispatch) => {
    try {
        const { data } = await api.getCategory()
        dispatch({ type: 'FETCH_CATEGORIES', payload: data })
    } catch(error) {
        console.log(error.message)
    }
}

export const getMenuCategory = () => async (dispatch) => {
    try {
        const { data } = await api.getMenuCategory()
        dispatch({ type: 'FETCH_MENU', payload: data })
    } catch(error) {
        console.log(error.message)
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.addCategory(category)
        dispatch({ type: 'CREATE_MENU', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const addSubCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.addSubCategory(category)
        dispatch({ type: 'CREATE_MENU', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await api.deleteCategory(id)
        dispatch({ type: 'DELETE_CATEGORY', payload: id })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteSubCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.deleteSubCategory(category)
        dispatch({ type: 'DELETE_CATEGORY', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}