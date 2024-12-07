import { API_LIST_URLS } from "@/config";
import axios from "axios";
import { TLoginRequestData } from "./types";

export const loginRequest = ({ password }: TLoginRequestData) =>
    axios.post<undefined>(API_LIST_URLS.Login, {}, { headers: { Authorization: password } });
