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
        enrolledData: build.query({
            query: (email) => `/enrolled?email=${email}`
        }),
        user: build.query({
            query : (email) => `/user?email=${email}`
        }),
        oneDataGet: build.query({
            query: (email) => `/data?email=${email}`
        })
         
    })
})

 export const {useAllDataQuery,useIdDataQuery,useEnrolledDataQuery,useUserQuery,useOneDataGetQuery } = getData