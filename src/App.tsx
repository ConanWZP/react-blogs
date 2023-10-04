import search from './assets/ic_search.svg'
import './App.scss'
import React, {useEffect, useState} from "react";
import MainArticle from "./components/MainArticle/MainArticle.tsx";
import axios from "axios";
import Loader from "./components/Loader/Loader.tsx";
import {useAppDispatch, useAppSelector} from "./hooks/customHooks.ts";
import {setSearchedBlog, setStoreData} from "./redux/slices/blogsSlice.ts";
import {dataType, extendedDataType} from './types/dataTypes.ts';


function App() {

    const dispatch = useAppDispatch()
    const {storeData, blog, searchedBlog} = useAppSelector(state => state.blogs)
    const [isLoading, setIsLoading] = useState(true)

    const [inputValue, setInputValue] = useState('')


    const getPosts = async () => {
        setIsLoading(true)
        dispatch(setSearchedBlog({}))
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        if (blog.hasOwnProperty('id')) {
            const newArray: extendedDataType = response.data.map((el: dataType) => {
                if (el.id === blog.id) {
                    return {
                        ...el,
                        likes: blog.likes,
                        dislikes: blog.dislikes,
                        likeIsPressed: blog.likeIsPressed,
                        dislikeIsPressed: blog.dislikeIsPressed
                    }
                } else {
                    return {
                        ...el,
                        likes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                        dislikes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                        likeIsPressed: false,
                        dislikeIsPressed: false
                    }
                }
            })
            dispatch(setStoreData(newArray))
        } else {
            const newArray: extendedDataType = response.data.map((el: dataType) => {
                return {
                    ...el,
                    likes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                    dislikes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                    likeIsPressed: false,
                    dislikeIsPressed: false
                }
            })
            dispatch(setStoreData(newArray))
        }
        setIsLoading(false)
    }

    useEffect(() => {
        dispatch(setSearchedBlog({})) // не очистив найденный 1 блог, при выходе из просмотра блога и ctrl v в
        // input названия происходит поиск блога, хотя этого не должно быть(т.к. поиск только по нажатию на лупу)
        if (storeData.length > 0) {
            setIsLoading(false)
        } else {
            getPosts()
        }
    }, []);

    const handleEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
           await searchPost()
        }
    }
    const searchPost = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?title=${inputValue}`)
        console.log(response.data[0])
        const sameBlog = storeData.find((el: extendedDataType) => el.id === response.data[0].id)
        dispatch(setSearchedBlog({
            ...response.data[0],
            likes: sameBlog?.likes,
            dislikes: sameBlog?.dislikes,
            likeIsPressed: sameBlog?.likeIsPressed,
            dislikeIsPressed: sameBlog?.dislikeIsPressed
        } as extendedDataType))
        console.log(searchedBlog)
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            <div className={'header'}>
                <h2 className={'header-title'}>
                    Блог
                </h2>
                <p className={'header-description'}>
                    Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим
                    зарубежные статьи
                </p>
                <div className={'header-search'}>
                    <img src={search} onClick={() => searchPost()} />
                    <input value={inputValue} onKeyUp={(event) => handleEnterPress(event)} onChange={(event) => {
                        event.preventDefault()
                        setInputValue(event.target.value)
                    }}
                           placeholder={'Поиск по названию статьи'}/>
                </div>
            </div>
            {
                storeData.length === 0 ?
                    <div>Ничего не найдено</div>
                    :
                    searchedBlog.hasOwnProperty('id') && inputValue.length > 0 ?
                        <MainArticle isBig={true} title={searchedBlog.title} body={searchedBlog.body}
                                     id={searchedBlog.id} likeIsPressed={searchedBlog.likeIsPressed}
                                     dislikeIsPressed={searchedBlog.dislikeIsPressed} likes={searchedBlog.likes}
                                     dislikes={searchedBlog.dislikes} isSearched={true}/>
                        :
                    <>
                        <MainArticle isBig={true} title={storeData[0].title} body={storeData[0].body}
                                     id={storeData[0].id} likeIsPressed={storeData[0].likeIsPressed}
                                     dislikeIsPressed={storeData[0].dislikeIsPressed} likes={storeData[0].likes}
                                     dislikes={storeData[0].dislikes}/>
                        <div className={'articles'}>
                            {

                                storeData.slice(1).map((el) => (
                                        <MainArticle key={el.id} isBig={false} title={el.title} body={el.body} id={el.id}
                                                     likeIsPressed={el.likeIsPressed}
                                                     dislikeIsPressed={el.dislikeIsPressed} likes={el.likes}
                                                     dislikes={el.dislikes}/>
                                    ))

                            }

                        </div>
                    </>
            }
        </>
    )
}

export default App
