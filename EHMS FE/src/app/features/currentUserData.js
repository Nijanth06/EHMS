import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { user: null, email: null},
    reducers: {
        //setCredential methods
        setCurrentPatientByRec: (state, action) => {
            const { user, email } = action.payload
            state.user = user
            state.email = email
           
        },
        
        
    }
})

export const { setCurrentPatientByRec } = currentUserSlice.actions

export default currentUserSlice.reducer
// export const selectCurrentUser = (state) =>  state.auth.user 
// export const selectCurrentToken = (state) =>  ( state.auth.token)