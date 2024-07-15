import { getUserProfile } from "../../services/UserApi";

// action types/functions
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (data) => { 
    return { type: LOGIN, payload: { name: data} }
};
export const logout = () => {
    return { type: LOGOUT } 
};
export const fetchLogin = () => {
    return async (dispatch)=>{
     try{
            const result = await getUserProfile();
            if(result&&result.data){
                dispatch(login(result.data));
            }
            else{
                throw new Error("사용자가 없습니다.");
            }
        }
        catch(e){
            console.log(e.message);
            dispatch(logout());
        }
    }   
}

// initial state
const initialState = {
    userInfo: null,
    isLogin: false,
};

// reducer
function userReducer(currentState, action){
    if(currentState===undefined){
        return initialState;
    }

    if(action.type === LOGIN){
        return { ...currentState, userInfo: { name: action.payload.name }, isLogin: true }
    }
    else if(action.type === LOGOUT){
        return { ...initialState }
    }

    return currentState;
}

export default userReducer;