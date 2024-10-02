/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";


const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return action.payload
        case 'CLEAR_NOTIFICATIONS':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

const NotificationsContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationContext = useContext(NotificationContext)
    return notificationContext[0]
}

export const useNotificationDispatch = () => {
    const notificationContext = useContext(NotificationContext)
    return notificationContext[1]
}

export default NotificationsContextProvider
