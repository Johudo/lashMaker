import { API_LIST_URLS } from "@/config";
import axios from "axios";
import { TEditContactsRequestData, TEditContactsResponseData, TGetContactsResponseData } from "./types";

export const getContactsRequest = () => axios.get<TGetContactsResponseData>(API_LIST_URLS.Contacts.index);

export const editContactsRequest = (data: TEditContactsRequestData) =>
    axios.patch<TEditContactsResponseData>(API_LIST_URLS.Contacts.index, data);
