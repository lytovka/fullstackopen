const initialNotification = null

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":
            return action.data.message
        case "DEFAULT":
            return action.data;
        default:
            return state
    }
}

export const addNotification = (message, seconds) => {
    return async dispatch => {
        dispatch({
            type: "NEW_NOTIFICATION",
            data: { message }
        })
        setTimeout(() => {
            dispatch({
                type: "DEFAULT",
                data: null
            })
        }, seconds * 1000)
    }
}

export default notificationReducer