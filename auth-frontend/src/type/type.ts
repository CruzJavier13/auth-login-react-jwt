export interface AuthResponse {
    body:{
        user:User,
        accessToken: string, 
        refreshToken: string
    };
}

export interface AuthResponseError {
    body:{
        error:string
    };
}

export interface User{
    _id: Int16Array,
    email: string,
    username: string,
    password: string
}

export interface AccessTokenResponse {
    statusCode: number,
    body:{
        accessToken:string,
    },
    error?: string
}