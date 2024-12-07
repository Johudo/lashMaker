import { useMutation, useQuery } from "@tanstack/react-query";
import { editContactsRequest, getContactsRequest } from ".";
import { AxiosError, AxiosResponse } from "axios";
import { TEditContactsRequestData, TEditContactsResponseData } from "./types";

export const useContactsQuery = () => {
    const query = useQuery({
        queryKey: ["contacts", "index"],
        queryFn: getContactsRequest,
    });

    return query;
};

export const useEditContactsMutation = () => {
    const mutation = useMutation<
        AxiosResponse<TEditContactsResponseData>,
        AxiosError,
        { data: TEditContactsRequestData }
    >({
        mutationFn: ({ data }) => editContactsRequest(data),
    });

    return mutation;
};
