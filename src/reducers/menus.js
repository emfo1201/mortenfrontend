const menusReducer = (menus = [], action) => {
    switch (action.type) {
        case 'FETCH_MENU':
            return action.payload
        case 'CREATE_MENU':
            return [...menus, action.payload]
        case 'FETCH_CATEGORIES':
            return action.payload
        case 'DELETE_CATEGORY':
            return menus.filter((menu) => menu._id !== action.payload)
        default:
            return menus
    }
}

export default menusReducer;