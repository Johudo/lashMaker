import { useMutation } from "@tanstack/react-query";
import { loginRequest } from ".";
import { AxiosError, AxiosResponse } from "axios";
import { TLoginRequestData } from "./types";

export const useLoginMutation = () => {
    const mutation = useMutation<AxiosResponse<undefined>, AxiosError, { data: TLoginRequestData }>({
        mutationFn: ({ data }) => loginRequest(data),
    });

    return mutation;
};
