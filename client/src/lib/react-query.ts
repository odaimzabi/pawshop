import {
  useMutation,
  type UseMutationOptions,
  type UseQueryOptions,
  type QueryFunction,
  useQuery,
  type QueryKey,
} from "@tanstack/react-query";
import {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { apiClient } from "./axios";

interface AxiosConfig<T> extends AxiosRequestConfig {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

type HttpMethod = "post" | "put" | "patch" | "delete";

export function useMutationWithType<
  TData extends AxiosResponse<unknown, unknown>["data"],
  TVariables = unknown,
  TError = AxiosError
>(
  method: HttpMethod,
  url: string,
  config?: AxiosConfig<TData>,
  options?: UseMutationOptions<
    AxiosResponse<TData>,
    TError,
    TVariables,
    unknown
  >
) {
  const mutationFn = async (variables?: TVariables) => {
    const response = await apiClient[method]<TData>(url, variables, config);
    return response;
  };

  return useMutation<AxiosResponse<TData>, TError, TVariables>(
    mutationFn,
    options
  );
}

export function useQueryWithType<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  url: string,
  options?: UseQueryOptions<AxiosResponse<TData>, TError, AxiosResponse<TData>>
) {
  const queryFn: QueryFunction<AxiosResponse<TData>> = async () => {
    const response = await apiClient.get<TData>(url);
    return response;
  };

  return useQuery<AxiosResponse<TData>, TError, AxiosResponse<TData>>(
    [url],
    queryFn,
    options
  );
}
