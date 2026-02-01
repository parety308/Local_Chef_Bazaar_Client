import { useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useSearchParams } from "react-router";

const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .get(`/payment-success?session_id=${sessionId}`)
        .then(res => console.log("Payment Saved:", res.data));
    }
  }, [sessionId]);

  return <h2>Payment Successful ✅</h2>;
};

export default PaymentSuccessPage;
