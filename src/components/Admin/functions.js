import {addPlayer, updatePlayer, deletePlayer } from "../../actions/players"
import { addCategory, deleteCategory, addSubCategory } from "../../actions/menu"

export const addNewCategory = (e, addCategoryValue, dispatch) => {
    e.preventDefault()
    let form = {
        newCategory: addCategoryValue,
    }

    dispatch(addCategory(form))
}

export const deletecategory = (e, categoryPanel4, dispatch) => {
    e.preventDefault()
    let form = {
        category: categoryPanel4
    }

    dispatch(deleteCategory(form))
}

export const addNewSubCategory = (e, categoryPanel2, addSubCategoryValue, dispatch) => {
    e.preventDefault()
    let form = {
        category: categoryPanel2,
        newSubCategory: addSubCategoryValue
    }

    dispatch(addSubCategory(form))
}

export const addNewPlayer = (e, formData, images, dispatch) => {
    e.preventDefault()
    const form = new FormData()
    formData.category.forEach(item => {
        form.append("category", JSON.stringify(item))
    })
    images.forEach(item => {
        form.append("image", item)
    })
    form.append("name", formData.name)
    form.append("club", formData.club)
    form.append("infoEnglish", formData.infoEnglish)
    form.append("infoNorwegian", formData.infoNorwegian)

    dispatch(addPlayer(form))
}

export const updateplayer = (e, formData, images, dispatch) => {
    e.preventDefault()
    const form = new FormData()
    formData.category.forEach(item => {
        form.append("category", JSON.stringify(item))
    })
    images.forEach(item => {
        form.append("image", item)
    })
    form.append("name", formData.name)
    form.append("club", formData.club)
    form.append("infoEnglish", formData.infoEnglish)
    form.append("infoNorwegian", formData.infoNorwegian)

    dispatch(updatePlayer(form))
}

export const deleteplayer = (e, selectedPlayer, dispatch) => {
    e.preventDefault()
    let form = {
        player: selectedPlayer
    }

    dispatch(deletePlayer(form))
}