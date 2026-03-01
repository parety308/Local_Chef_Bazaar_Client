import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const COLORS = ["#F59E0B", "#10B981"];

const PlatformStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-order-status-count');
            return res.data;
        }
    });

    const orderData = [
        { name: "Pending", value: orders?.pending || 0 },
        { name: "Delivered", value: orders?.delivered || 0 },
    ];

    const { data: totalPayment = 0, isLoading: isPaymentLoading } = useQuery({
        queryKey: ["totalPayment"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/total-payment");
            return res.data;
        }
    });

    const paymentData = [
        { name: "Total Payment", value: totalPayment?.totalPayment || 0 },
    ];

    const totalPaymentAmount = totalPayment?.totalPayment || 0;
    const pendingOrders = orders?.pending || 0;
    const deliveredOrders = orders?.delivered || 0;

    if (isLoading || isOrdersLoading || isPaymentLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <title>Platform Statistics</title>

            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Platform Statistics 📊
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700">
                    <h2 className="text-gray-500 dark:text-gray-400">
                        Total Payment
                    </h2>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                        ৳{totalPaymentAmount.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:cursor-pointer hover:shadow-lg transition">
                    <h2 className="text-gray-500 dark:text-gray-400">
                        Total Users
                    </h2>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                        {users.length}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700">
                    <h2 className="text-gray-500 dark:text-gray-400">
                        Orders Pending
                    </h2>
                    <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-2">
                        {pendingOrders}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700">
                    <h2 className="text-gray-500 dark:text-gray-400">
                        Orders Delivered
                    </h2>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {deliveredOrders}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Payment Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={paymentData}>
                            <XAxis stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#22C55E"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Orders Status
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={orderData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {orderData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PlatformStatistics;