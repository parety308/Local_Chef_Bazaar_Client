import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data = {},
        isLoading
    } = useQuery({
        enabled: !!user?.email, //  wait until user exists
        queryKey: ['users-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-role/${user.email}`);
            return res.data;
        }
    });
    // console.log(data);
    return {
        role: data?.role,
        isLoading
    };
};

export default useRole;
