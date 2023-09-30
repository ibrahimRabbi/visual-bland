import { createSlice } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    obj: {},
}

 const saveCourseSlice = createSlice({
    name: 'saveCourse',
    initialState,
    reducers: {
        update: (state,action) => { 
            state.obj = action.payload
            fetch('http://localhost:5000/savecourse', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.insertedId) {
                     toast('course save successfully')
                    }
            })
        }
         
    },
})

 
export const { update } = saveCourseSlice.actions

export default saveCourseSlice.reducer