import { createSlice } from "@reduxjs/toolkit";

const slider = createSlice({
  name: "slider",
  initialState: { isFloded: true },
  reducers: {
    //setCredential methods
    setFloded: (state, action) => {
      const { isFloded } = action.payload;
      state.isFloded = isFloded;
    },
  },
});

export const { setFloded } = slider.actions;

export default slider.reducer;
