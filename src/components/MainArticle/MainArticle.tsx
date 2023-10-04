import Like from "../utils/Like.tsx";
import Dislike from "../utils/Dislike.tsx";
import {FC, useEffect} from "react";
import styles from './mainArticle.module.scss'
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/customHooks.ts";
import {setDislikeAmount, setDislikeIsPressed, setLikeAmount, setLikeIsPressed} from "../../redux/slices/blogsSlice.ts";

interface MainArticleProps {
    isBig: boolean,
    title: string,
    body: string,
    id: number,
    likes: number,
    dislikes: number,
    likeIsPressed: boolean,
    dislikeIsPressed: boolean,
    isSearched?: boolean
}

const MainArticle: FC<MainArticleProps> = ({isBig, body, title, id, dislikes,
                                               likes, likeIsPressed, dislikeIsPressed, isSearched = false}) => {

    const dispatch = useAppDispatch()


    useEffect(() => {

        if (dislikeIsPressed && likeIsPressed) {

            dispatch(setDislikeIsPressed({
                id,
                isPressed: false,
                isSearched
            }))
            dispatch(setDislikeAmount({
                id,
                dislikes: dislikes -1,
                isSearched
            }))
        }

    }, [likeIsPressed]);

    useEffect(() => {
        if (likeIsPressed && dislikeIsPressed) {
            dispatch(setLikeIsPressed({
                id,
                isPressed: false,
                isSearched
            }))
            dispatch(setLikeAmount({
                id,
                likes: likes -1,
                isSearched
            }))
        }

    }, [dislikeIsPressed]);

    const handleLikeClick = () => {
        dispatch(setLikeIsPressed({
            id,
            isPressed: !likeIsPressed,
            isSearched: true,
        }))

        if (likeIsPressed) {

            dispatch(setLikeAmount({
                id,
                likes: likes -1,
                isSearched: true,
            }))
        } else {
            dispatch(setLikeAmount({
                id,
                likes: likes + 1,
                isSearched: true,
            }))
        }
    }

    const handleDislikeClick = () => {
        dispatch(setDislikeIsPressed({
            id,
            isPressed: !dislikeIsPressed,
            isSearched: true,
        }))
        if (dislikeIsPressed) {
            dispatch(setDislikeAmount({
                id,
                dislikes: dislikes -1,
                isSearched: true,
            }))
        } else {
            dispatch(setDislikeAmount({
                id,
                dislikes: dislikes + 1,
                isSearched: true,
            }))
        }
    }

    return (
        <div className={`${styles.article} ${!isBig && styles.flexChild}`}>
            {/*<div className={'article-top'}>*/}
            <img src='https://placehold.co/900x600' className={styles.articleImage}/>
            {/* </div>*/}

            <div className={styles.articleBottom}>
                <div className={styles.articleBottomTop}>
                    <h3>{title}</h3>
                    {
                        isBig ?
                            <div className={styles.marks}>
                                <div className={styles.mark}>
                                    <Like likeIsPressed={likeIsPressed}  handleClick={handleLikeClick} />
                                    {/*<span>{likesAmountMain}</span>*/}
                                    <span>{likes}</span>
                                </div>
                                <div className={styles.mark}>
                                    <Dislike dislikeIsPressed={dislikeIsPressed} handleClick={handleDislikeClick} />
                                    {/*<span>{dislikesAmountMain}</span>*/}
                                    <span>{dislikes}</span>

                                </div>
                            </div>
                            :
                            null
                    }

                </div>
                {
                    isBig ?
                        <p className={styles.articleDescription}>{body}</p>
                        : null
                }

                {
                    isBig ?
                        <div style={{height: 48}}>
                            <Link to={`/${id}`}>
                                <button className={styles.articleButton}>Читать далее</button>
                            </Link>

                        </div>
                        :
                        <div className={styles.articleBottomBottom}>
                            <div className={styles.marks}>
                                <div className={styles.mark}>
                                    <Like likeIsPressed={likeIsPressed}  handleClick={handleLikeClick} />
                                    {/*<span>{likesAmountMain}</span>*/}
                                    <span>{likes}</span>
                                </div>
                                <div className={styles.mark}>
                                    <Dislike dislikeIsPressed={dislikeIsPressed} handleClick={handleDislikeClick} />
                                    {/*<span>{dislikesAmountMain}</span>*/}
                                    <span>{dislikes}</span>

                                </div>
                            </div>
                            <Link to={`/${id}`}>
                                <button className={styles.articleButton}>Читать далее</button>
                            </Link>
                        </div>
                }


            </div>
        </div>
    );
};

export default MainArticle;