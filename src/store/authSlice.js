import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        status : false,
        userData:null
}

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        login : (state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },

        logout : (state)=>{
            state.status=false;
            state.userData=null;
        }
       
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file

export const { login, logout } = authSlice.actions;
// Export the slice reducer as the default export
export default authSlice.reducer;