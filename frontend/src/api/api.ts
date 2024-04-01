import axios from "axios";
import { UserLoginDto } from "./dto";

export const userLogin = (data: UserLoginDto) => {
    return axios.post("/api/v1/login", data);
};
