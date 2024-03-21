import * as jose from "jose";
export declare const verifyToken: (token: string) => Promise<jose.JWTVerifyResult<jose.JWTPayload>>;
