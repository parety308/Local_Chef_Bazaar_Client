import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../../components/Loading/Loading';

const MyReviewPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // console.log(user.email);
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/myreviews/${user.email}`);

            return res.data;
        }
    });
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className="text-4xl">Total Reviews : {reviews.length}</h1>
        </div>
    );
};

export default MyReviewPage;