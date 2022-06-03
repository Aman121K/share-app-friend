import { State } from "react-native-gesture-handler";
import { SET_NOTIFICATION, SET_USER_PHONE, SET_USER_DETAILS } from "./action";

const initialState = {
    details: '',
    // notifications: '',
    // name: '',
    // userPhone: '',
    // refercode: '',
    // friendContact: '',
    // home: '',
}

function userReducer(state = initialState, action) {
    console.log('action---->', action)
    switch (action.type) {
        case SET_USER_DETAILS:
            return { ...state, details: { ...state.details, ...action.payload } }
        // case SET_NOTIFICATION:
        //         return { ...state, details: { ...state.details, ...action.payload } }
        // case SET_USER_NAME:
        //     return { ...state, name: action.payload };
        // case SET_USER_PHONE:
        //     return { ...state, userPhone: action.payload };
        // case SET_REFERRALCODE:
        //     return { ...state, refercode: action.payload };
        // case SET_SELECTED_CONTACT:
        //     return { ...state, friendContact: action.payload };
        // case SET_USER_HOME:
        //         return { ...state, home: action.payload };    
        default:
            return state;
    }
}

export default userReducer;
