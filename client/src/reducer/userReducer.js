export const initialState = null;

export const reducer = (state, action) => {
    if(action.type === "USER"){
        return action.payload;
    }
    if(action.type === "CLEAR"){
        return null;
    }
    if(action.type === "UPDATE"){
        const newState =  {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        }
        console.log(newState);
        return newState;
    }
    if(action.type === "UPDATEPIC"){
        return{
            ...state,
            photo: action.payload
        }
    }
    if(action.type === "UPDATEINFO"){
        return{
            ...state,
            name: action.payload.name,
            bio: action.payload.bio,
            website: action.payload.website,
            gender: action.payload.gender
        }
    }
    return state;
}