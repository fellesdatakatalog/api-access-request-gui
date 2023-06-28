import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {ApiClient, ApiClients, ApiScopes, RequestApiClientBody} from "../types/api";

export const QK_SCOPES = 'QK_SCOPES';
export const QK_CLIENTS = 'QK_CLIENTS';

export const useScopes = () => {
    return useQuery({
        queryKey: [QK_SCOPES],
        queryFn: async () => {
            const res = await axios.get<ApiScopes>("/api/datasharing/consumer/scope/access");
            return res.data;
        }
    });
};

export const useClients = () => {
    return useQuery({
        queryKey: [QK_CLIENTS],
        queryFn: async () => {
            const res = await axios.get<ApiClients>("/api/datasharing/consumer/client");
            return res.data;
        }
    });
}

export const useClientMutation = () => {
    const client = useQueryClient();
     return useMutation({
        mutationFn: (newClient: RequestApiClientBody) => {
            return axios.post<ApiClient>("/api/datasharing/consumer/scope/client", newClient);
        },
        onSuccess: (res) => {
            client.invalidateQueries({queryKey: [QK_CLIENTS]});
            return res;
        }
    });
}