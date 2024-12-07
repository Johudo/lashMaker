import { useMutation, useQuery } from "@tanstack/react-query";
import { createServiceItemRequest, deleteServiceItemRequest, editServiceItemRequest, getServicesRequest } from ".";
import { AxiosError, AxiosResponse } from "axios";
import { TCreateServiceItemRequestData, TCreateServiceItemResponseData, TEditServiceItemResponseData } from "./types";

export const useServicesQuery = () => {
    const query = useQuery({
        queryKey: ["services", "index"],
        queryFn: getServicesRequest,
    });

    return query;
};

export const useCreateEditServicesMutation = () => {
    const mutation = useMutation<
        AxiosResponse<TCreateServiceItemResponseData | TEditServiceItemResponseData>,
        AxiosError,
        { id: number | string | undefined; data: TCreateServiceItemRequestData }
    >({
        mutationFn: ({ id, data }) => (!id ? createServiceItemRequest(data) : editServiceItemRequest(id, data)),
    });

    return mutation;
};

export const useDeleteEditServicesMutation = () => {
    const mutation = useMutation<AxiosResponse<undefined>, AxiosError, { id: number | string }>({
        mutationFn: ({ id }) => deleteServiceItemRequest(id),
    });

    return mutation;
};
