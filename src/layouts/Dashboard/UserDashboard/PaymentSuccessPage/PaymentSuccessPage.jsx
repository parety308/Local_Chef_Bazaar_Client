import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useSearchParams, useNavigate } from "react-router";
import Confetti from "react-confetti";

const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .get(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          setPaymentData(res.data); 
        })
        .catch(err => console.error(err));
    }
  }, [sessionId]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-5 relative">
      <title>Payment Success - Dashboard</title>
      {/* Confetti */}
      <Confetti numberOfPieces={200} recycle={false} />

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful ✅</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase! Your transaction has been completed.</p>

        {paymentData && (
          <div className="bg-green-50 p-5 rounded-xl border border-green-200 mb-6 text-left">
            <p className="font-semibold">Order ID: <span className="font-normal">{paymentData.orderId}</span></p>
            <p className="font-semibold">Amount Paid: <span className="font-normal">${paymentData.amount}</span></p>
            <p className="font-semibold">Date: <span className="font-normal">{new Date(paymentData.date).toLocaleString()}</span></p>
            <p className="font-semibold">Status: <span className="text-green-600 font-bold">{paymentData.status}</span></p>
          </div>
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
