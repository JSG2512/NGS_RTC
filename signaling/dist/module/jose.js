import * as jose from "jose";
export const verifyToken = async (token) => {
    return await jose.jwtVerify(token, new Uint8Array(), {
        algorithms: ["HS256"],
    });
};
