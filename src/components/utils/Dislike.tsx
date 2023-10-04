import {FC} from "react";

interface LikeProps {
    dislikeIsPressed: boolean,
   /* setDislikeIsPressed: (p: (prevState: boolean) => boolean) => void,
    setDislikesAmount: (p: (prevState: number) => number) => void*/
    handleClick: () => void
}
const Dislike:FC<LikeProps> = ({dislikeIsPressed, handleClick}) => {

    /*const handleClick = () => {
        setDislikeIsPressed(prevState => !prevState)
        if (dislikeIsPressed) {
            setDislikesAmount(prevState => prevState-1)
        } else {
            setDislikesAmount(prevState => prevState+1)
        }

    }*/

    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick} style={{cursor: 'pointer'}}>
            <g id="ThumbDownAlt">
                <path id="Vector" d="M2.66665 5.33333H5.33331C6.06665 5.33333 6.66665 5.93333 6.66665 6.66666V18.6667C6.66665 19.4 6.06665 20 5.33331 20H2.66665V5.33333ZM29.1066 14.8267C29.2533 15.16 29.3333 15.52 29.3333 15.8933V17.3333C29.3333 18.8 28.1333 20 26.6666 20H19.3333L20.56 26.2C20.6266 26.4933 20.5866 26.8133 20.4533 27.08C20.1466 27.68 19.76 28.2267 19.28 28.7067L18.6666 29.3333L10.12 20.7867C9.61331 20.28 9.33331 19.6 9.33331 18.8933V8.45333C9.33331 6.73333 10.7333 5.33333 12.4533 5.33333H23.2533C24.2 5.33333 25.0666 5.82666 25.5466 6.62666L29.1066 14.8267Z" fill={dislikeIsPressed ? '#EB5757' : '#959298'} />
            </g>
        </svg>
    );
};

export default Dislike;