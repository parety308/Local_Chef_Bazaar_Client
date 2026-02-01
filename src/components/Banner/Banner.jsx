import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

/* Parent controls stagger */
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/* Each letter animation */
const letter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/* Utility to split text into letters */
const AnimatedText = ({ text }) => (
  <motion.h1
    variants={container}
    initial="hidden"
    animate="visible"
    className="text-4xl font-bold mb-4 flex flex-wrap"
  >
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letter}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.h1>
);

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={5000}
      showArrows
      showThumbs={false}
      showStatus={false}
      showIndicators
      onChange={(index) => setActiveSlide(index)}
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
          <motion.div
            key={`slide-1-${activeSlide}`}
            initial="hidden"
            animate={activeSlide === 0 ? "visible" : "hidden"}
            className="ml-10 text-white max-w-xl"
          >
            <AnimatedText text="Fresh Home-Cooked Meals Near You" />
            <p className="mb-6">
              Discover daily menus from trusted local chefs
            </p>
            <Link
              to="/meals"
              className="bg-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition inline-block"
            >
              Explore Today’s Menu
            </Link>
          </motion.div>
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
          <motion.div
            key={`slide-2-${activeSlide}`}
            initial="hidden"
            animate={activeSlide === 1 ? "visible" : "hidden"}
            className="ml-10 text-white max-w-xl"
          >
            <AnimatedText text="Cook at Home. Earn with Pride." />
            <p className="mb-6">
              Join LocalChefBazaar and sell your homemade food
            </p>
            <Link
              to="/become-chef"
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition inline-block"
            >
              Become a Local Chef
            </Link>
          </motion.div>
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
          <motion.div
            key={`slide-3-${activeSlide}`}
            initial="hidden"
            animate={activeSlide === 2 ? "visible" : "hidden"}
            className="ml-10 text-white max-w-xl"
          >
            <AnimatedText text="Healthy •Affordable •Homemade" />
            <p className="mb-6">
              Secure payments & real-time order tracking
            </p>
            <Link
              to="/order"
              className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition inline-block"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
