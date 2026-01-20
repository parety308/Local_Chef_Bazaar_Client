import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={5000}
      showArrows
      showThumbs={false}
      showStatus={false}
      showIndicators
      className="my-5"
    >
      {/* Slide 1 */}
      <div className="relative h-[450px]">
        <img
          src="https://i.ibb.co/nqzCQvSQ/image.png"
          className="h-full w-full object-cover"
          alt="Home Cooked Meals"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="ml-10 text-white max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Fresh Home-Cooked Meals Near You
            </h1>
            <p className="mb-6">
              Discover daily menus from trusted local chefs
            </p>
            <button
              onClick={() => (window.location.href = "/meals")}
              className="bg-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Explore Today’s Menu
            </button>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative h-[450px]">
        <img
          src="https://i.ibb.co/B5LPfqGD/image.png"
          className="h-full w-full object-cover"
          alt="Become a Chef"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="ml-10 text-white max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Cook at Home. Earn with Pride.
            </h1>
            <p className="mb-6">
              Join LocalChefBazaar and sell your homemade food
            </p>
            <button
              onClick={() => (window.location.href = "/become-chef")}
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Become a Local Chef
            </button>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative h-[450px]">
        <img
          src="https://i.ibb.co/7NS33ywT/image.png"
          className="h-full w-full object-cover"
          alt="Fast Delivery"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="ml-10 text-white max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Healthy • Affordable • Homemade
            </h1>
            <p className="mb-6">
              Secure payments & real-time order tracking
            </p>
            <button
              onClick={() => (window.location.href = "/order")}
              className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
