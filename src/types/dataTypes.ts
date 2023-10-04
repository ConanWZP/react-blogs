
export type dataType = {
    body: string,
    id: number,
    userId: number,
    title: string
}

export interface extendedDataType extends dataType {
    likes: number,
    dislikes: number,
    likeIsPressed: boolean,
    dislikeIsPressed: boolean
}