import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const getData = createApi({
    reducerPath: 'getData',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (build) => ({
        allData: build.query({
            query: () => `/data`
        }),
        idData: build.query({
            query : (id) => `/data/${id}`
        }),
         
    })
})

 export const {useAllDataQuery,useIdDataQuery } = getData