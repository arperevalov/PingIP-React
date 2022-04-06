const SET_DISPLAY_POPUP = "SET_DISPLAY_POPUP"

const defaultValues = {
    displayPopup: false
}

const AppReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case SET_DISPLAY_POPUP:
            return {
                ...state,
                hasBearer: true
            }
            break;

    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setDisplayPopup = () => ({type: SET_DISPLAY_POPUP})

export default AppReducer