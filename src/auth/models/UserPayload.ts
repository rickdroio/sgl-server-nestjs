export interface UserPayload {
    sub: number;
    tid: number;
    email: string;
    iat?:number;
    exp?: number;
}