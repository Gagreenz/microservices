export interface UserJwt {
    user:{
        id: number;
        username: string;
        role: string;
    }
    iat: number;
    exp: number;
}