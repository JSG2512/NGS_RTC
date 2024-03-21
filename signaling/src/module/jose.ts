import * as jose from "jose";

export const verifyToken = async (
  token: string
): Promise<jose.JWTVerifyResult<jose.JWTPayload>> => {
  return await jose.jwtVerify(token, new Uint8Array(), {
    algorithms: ["HS256"],
  });
};
