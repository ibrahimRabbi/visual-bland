import { configureStore } from '@reduxjs/toolkit'
import { getData } from './API/baseApi'
import courseSaveSlice from './slice/courseSaveSlice'
 
 



export const store = configureStore({
    reducer: {
        [getData.reducerPath]: getData.reducer,
         courseWouldSave : courseSaveSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getData.middleware),
})