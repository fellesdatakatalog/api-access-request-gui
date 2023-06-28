import {useQuery} from "@tanstack/react-query";
import {IdToken} from "../types/tokens";

export const QK_USER = 'QK_USER';


// Get logged in user with the possibility of not being logged in
export const useUser = () => {
    return useQuery({
        queryKey: [QK_USER],
        queryFn: async () => {
            try {

                const res = await fetch("/api/user", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "manual", // do not follow redirect
                });

                const user = await res.json() as IdToken;
                const isAuthenticated = !!user;

                return { isAuthenticated, user };
            } catch (err) {
                const user = null;
                const isAuthenticated = false;
                return { isAuthenticated, user };
            }
        },
        retry: 0
    });
}
