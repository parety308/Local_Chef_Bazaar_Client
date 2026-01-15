import Lottie from "react-lottie";
import logInLoaderAnimation from '../../assets/json/login.json'

const LogInLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-sm relative">
        <Lottie
          options={{
            animationData: logInLoaderAnimation,
            autoplay: true,
            loop: true,
          }}
        ></Lottie>
      </div>
    </div>
  );
};

export default LogInLoader;