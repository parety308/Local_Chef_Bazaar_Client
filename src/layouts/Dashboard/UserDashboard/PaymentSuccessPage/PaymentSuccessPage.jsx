import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useSearchParams, useNavigate } from "react-router";
import Confetti from "react-confetti";
import Loading from "../../../../components/Loading/Loading";

const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        if (!sessionId) return;

        // Step 1: get payment data from session
        const { data: paymentData } = await axiosSecure.get(`/payment-success?session_id=${sessionId}`);
        // console.log("paymentData:", paymentData);

        // Step 2: get full payment info from backend
        const paymentId = paymentData?.paymentInfo?.insertedId;
        if (!paymentId) {
          setLoading(false);
          return;
        }

        const { data: paymentDetails } = await axiosSecure.get(`/payments/${paymentId}`);
        // console.log("paymentInfo:", paymentDetails);

        setPaymentInfo(paymentDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [sessionId, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-5 relative">
      <title>Payment Success - Dashboard</title>
      
      {/* Confetti */}
      <Confetti numberOfPieces={200} recycle={false} />

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-120 w-full text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase! Your transaction has been completed.</p>

        {paymentInfo ? (
          <div className="bg-green-50 p-5 rounded-xl border border-green-200 mb-6 text-left">
            <p className="font-semibold">Transaction ID: {paymentInfo.transactionId}
            </p>
            <p className="font-semibold">
              Amount Paid : <span className="font-normal"> {paymentInfo.amount}</span>
            </p>
            <p className="font-semibold">
              Date: <span className="font-normal">{new Date(paymentInfo.paidAt).toLocaleString()}</span>
            </p>
            <p className="font-semibold">
              Status : <span className="text-green-600 font-bold"> {paymentInfo.paymentStatus}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-500">Payment information not found.</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
