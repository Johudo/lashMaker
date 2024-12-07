import { API_LIST_URLS } from "@/config";
import axios from "axios";
import {
    TCreateServiceItemRequestData,
    TCreateServiceItemResponseData,
    TEditServiceItemRequestData,
    TEditServiceItemResponseData,
    TGetServicesResponseData,
} from "./types";

export const getServicesRequest = () => axios.get<TGetServicesResponseData>(API_LIST_URLS.Services.index);

export const createServiceItemRequest = (data: TCreateServiceItemRequestData) =>
    axios.post<TCreateServiceItemResponseData>(API_LIST_URLS.Services.index, data);

export const editServiceItemRequest = (rowId: string | number, data: TEditServiceItemRequestData) =>
    axios.patch<TEditServiceItemResponseData>(API_LIST_URLS.Services.one.replace(":id", rowId.toString()), data);

export const deleteServiceItemRequest = (rowId: string | number) =>
    axios.delete<undefined>(API_LIST_URLS.Services.one.replace(":id", rowId.toString()));
