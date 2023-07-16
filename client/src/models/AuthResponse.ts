export interface AuthResponse{
    refreshToken:string;
    accessToken:string;
    user:{
        id: number;
		email: string;
		username: string;
    }
}