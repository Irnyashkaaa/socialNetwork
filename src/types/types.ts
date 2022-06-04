
export type usersType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type photosType = {
    small: string
    large: string
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}

type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type postsDataType = {
    name: string
    message: string
    likesCount: number
}
export type setUserDataDataType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}
