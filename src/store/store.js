import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    
  reducer: {
    auth : authSlice,
     //TODO: add more slices here for posts
  }

});

export default store