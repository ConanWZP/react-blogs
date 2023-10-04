import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../Loader/Loader.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks.ts";
import styles from './article.module.scss'
import Like from "../utils/Like.tsx";
import {
    setBlog,
    setDislikeAmount,
    setDislikeIsPressed,
    setLikeAmount,
    setLikeIsPressed
} from "../../redux/slices/blogsSlice.ts";
import {extendedDataType} from "../../types/dataTypes.ts";
import Dislike from "../utils/Dislike.tsx";
import backButton from './../../assets/keyboard_backspace.svg'


const Article = () => {

    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const {blog, storeData} = useAppSelector(state => state.blogs)


    const getPosts = async () => {
        setIsLoading(true)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts${location.pathname}`)

        if (storeData.length > 0) {
            const sameBlog = storeData.find((el: extendedDataType) => el.id === response.data.id)

            dispatch(setBlog({
                ...response.data,
                likes: sameBlog?.likes,
                dislikes: sameBlog?.dislikes,
                likeIsPressed: sameBlog?.likeIsPressed,
                dislikeIsPressed: sameBlog?.dislikeIsPressed
            } as extendedDataType))
        } else {
            const blog: extendedDataType = {
                ...response.data,
                likes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                dislikes: Math.floor(Math.random() * (50 - 0 + 1)) + 0,
                likeIsPressed: false,
                dislikeIsPressed: false
            }

            dispatch(setBlog(blog))
        }
        setIsLoading(false)
    }


    const handleLikeClick = () => {
        dispatch(setLikeIsPressed({
            id: blog?.id,
            isPressed: !blog?.likeIsPressed,
            isOneBlog: true
        }))

        if (blog?.likeIsPressed) {
            dispatch(setLikeAmount({
                id: blog?.id,
                likes: blog!.likes - 1,
                isOneBlog: true
            }))

        } else {
            dispatch(setLikeAmount({
                id: blog?.id,
                likes: blog!.likes + 1,
                isOneBlog: true
            }))

        }
    }

    const handleDislikeClick = () => {
        dispatch(setDislikeIsPressed({
            id: blog?.id,
            isPressed: !blog?.dislikeIsPressed,
            isOneBlog: true
        }))

        if (blog?.dislikeIsPressed) {
            dispatch(setDislikeAmount({
                id: blog?.id,
                dislikes: blog.dislikes - 1,
                isOneBlog: true
            }))
        } else {
            dispatch(setDislikeAmount({
                id: blog?.id,
                dislikes: blog.dislikes + 1,
                isOneBlog: true
            }))

        }
    }

    useEffect(() => {

        if (blog.dislikeIsPressed && blog.likeIsPressed) {
            dispatch(setDislikeIsPressed({
                id: blog.id,
                isPressed: false,
                isOneBlog: true
            }))
            dispatch(setDislikeAmount({
                id: blog.id,
                dislikes: blog.dislikes -1,
                isOneBlog: true
            }))
        }

    }, [blog.likeIsPressed]);

    useEffect(() => {
        if (blog.likeIsPressed && blog.dislikeIsPressed) {
            dispatch(setLikeIsPressed({
                id: blog.id,
                isPressed: false,
                isOneBlog: true
            }))
            dispatch(setLikeAmount({
                id: blog.id,
                likes: blog.likes -1,
                isOneBlog: true
            }))
        }

    }, [blog.dislikeIsPressed]);



    useEffect(() => {
        getPosts()
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLeft} onClick={() => navigate('/')}>
                    <img src={backButton} />
                    <span>Вернуться к статьям</span>
                </div>

                <div className={styles.marks}>
                    <div className={styles.mark}>
                        <Like likeIsPressed={blog!.likeIsPressed} handleClick={handleLikeClick}/>
                        <span>{blog?.likes}</span>
                    </div>
                    <div className={styles.mark}>
                        <Dislike dislikeIsPressed={blog!.dislikeIsPressed} handleClick={handleDislikeClick} />
                        <span>{blog?.dislikes}</span>

                    </div>
                </div>
            </div>
            <div className={styles.title}>{blog?.title}</div>
            <img src='https://placehold.co/600x400' className={styles.articleImage}/>
            <p className={styles.articleText}>{blog?.body}</p>

        </>
    );
};

export default Article;