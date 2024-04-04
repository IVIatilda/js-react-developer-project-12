import { UserLoginDto } from "./dto";
import httpClient from "./httpClient";

export const userLogin = async (data: UserLoginDto) => {
    const res = await httpClient.post("login", data);
    return res;
};

export const userSignup = async (data: UserLoginDto) => {
    const res = await httpClient.post("/signup", data);
    return res;
};
