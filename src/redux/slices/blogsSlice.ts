import {createSlice} from "@reduxjs/toolkit";
import {extendedDataType} from "../../types/dataTypes.ts";


export interface ProductSlice {
    storeData: extendedDataType[],
    blog: extendedDataType | any,
    searchedBlog: extendedDataType | any,
}


let initialState: ProductSlice = {
    storeData: [],
    blog: {},
    searchedBlog: {}
}


export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setStoreData: (state, action) => {
            state.storeData = action.payload
        },
        setDislikeIsPressed: (state, action) => {
            const {id, isPressed, isOneBlog, isSearched} = action.payload
            console.log(action.payload)
            const array = state.storeData
            state.storeData = array.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        dislikeIsPressed: isPressed
                    }
                } else {
                    return {
                        ...el
                    }
                }
            })
            if (isOneBlog) {
                const blog = state.blog
                state.blog = {
                    ...blog,
                    dislikeIsPressed: isPressed
                }
            }
            if (isSearched) {
                const blog = state.searchedBlog
                state.searchedBlog = {
                    ...blog,
                    dislikeIsPressed: isPressed
                }
            }
        },
        setLikeIsPressed: (state, action) => {
            const {id, isPressed, isOneBlog, isSearched} = action.payload
            const array = state.storeData
            state.storeData = array.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        likeIsPressed: isPressed
                    }
                } else {
                    return {
                        ...el
                    }
                }
            })
            if (isOneBlog) {
                const blog = state.blog
                state.blog = {
                    ...blog,
                    likeIsPressed: isPressed
                }
            }
            if (isSearched) {
                const blog = state.searchedBlog
                state.searchedBlog = {
                    ...blog,
                    likeIsPressed: isPressed
                }
            }

        },
        setDislikeAmount: (state, action) => {
            const {id, dislikes, isOneBlog, isSearched} = action.payload
            const array = state.storeData
            state.storeData = array.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        dislikes: dislikes
                    }
                } else {
                    return {
                        ...el
                    }
                }
            })
            if (isOneBlog) {
                const blog = state.blog
                state.blog = {
                    ...blog,
                    dislikes: dislikes
                }
            }
            if (isSearched) {
                const blog = state.searchedBlog
                state.searchedBlog = {
                    ...blog,
                    dislikes: dislikes
                }
            }

        },
        setLikeAmount: (state, action) => {
            const {id, likes, isOneBlog, isSearched} = action.payload
            const array = state.storeData
            state.storeData = array.map((el) => {
                if (el.id === id) {
                    return {
                        ...el,
                        likes: likes
                    }
                } else {
                    return {
                        ...el
                    }
                }
            })
            if (isOneBlog) {
                const blog = state.blog
                state.blog = {
                    ...blog,
                    likes: likes
                }
            }
            if (isSearched) {
                const blog = state.searchedBlog
                state.searchedBlog = {
                    ...blog,
                    likes: likes
                }
            }
        },
        setBlog: (state, action) => {
            state.blog = action.payload
        },
        setSearchedBlog: (state, action) => {
            state.searchedBlog = action.payload
        }
    }
})

export const { setStoreData, setDislikeIsPressed,
    setLikeIsPressed, setLikeAmount,
    setDislikeAmount, setBlog,
    setSearchedBlog } = blogsSlice.actions
export default blogsSlice.reducer