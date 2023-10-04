import {combineReducers, configureStore } from '@reduxjs/toolkit'
import blogsSlice from "./slices/blogsSlice.ts";







const  rootReduce = combineReducers({
    blogs: blogsSlice

})


export const store = configureStore({
    reducer: rootReduce,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch