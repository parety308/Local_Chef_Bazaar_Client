import Lottie from "react-lottie";
import SignUpLoadingAnimation from '../../assets/json/register.json'

const SignUpLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-sm relative">
        <Lottie
          options={{
            animationData: SignUpLoadingAnimation,
            autoplay: true,
            loop: true,
          }}
        ></Lottie>
      </div>
    </div>
  );
};

export default SignUpLoading;