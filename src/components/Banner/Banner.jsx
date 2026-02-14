import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

/* Parent stagger animation */
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/* Letter animation */
const letter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/* Animated text component */
const AnimatedText = ({ text }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="visible"
    className="text-2xl md:text-4xl font-bold mb-4 flex flex-wrap"
  >
    {text.split("").map((char, index) => (
      <motion.span key={index} variants={letter}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.div>
);

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  /* reusable slide layout */
  const SlideContent = ({ index, title, desc, btnText, link, color }) => (
    <div className="absolute inset-0 bg-black/50 flex items-center">
      <motion.div
        key={`slide-${index}-${activeSlide}`}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
        className="ml-6 md:ml-14 text-white max-w-xl"
      >
        <AnimatedText text={title} />
        <p className="mb-6 text-sm md:text-lg">{desc}</p>

        <Link
          to={link}
          className={`px-6 py-3 rounded-xl font-semibold transition inline-block ${color}`}
        >
          {btnText}
        </Link>
      </motion.div>
    </div>
  );

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
      <div className="relative h-[350px] md:h-[450px]">
        <img
          src="https://i.ibb.co/nqzCQvSQ/image.png"
          alt="Home Cooked Meals"
          className="h-full w-full object-cover"
        />

        <SlideContent
          index={0}
          title="Fresh Home-Cooked Meals Near You"
          desc="Discover daily menus from trusted local chefs"
          btnText="Explore Today’s Menu"
          link="/meals"
          color="bg-orange-500 hover:bg-orange-600"
        />
      </div>

      {/* Slide 2 */}
      <div className="relative h-[350px] md:h-[450px]">
        <img
          src="https://i.ibb.co/B5LPfqGD/image.png"
          alt="Become a Chef"
          className="h-full w-full object-cover"
        />

        <SlideContent
          index={1}
          title="Cook at Home. Earn with Pride."
          desc="Join LocalChefBazaar and sell your homemade food"
          btnText="Become a Local Chef"
          link="/dashboard/my-profile"
          color="bg-green-500 hover:bg-green-600"
        />
      </div>

      {/* Slide 3 */}
      <div className="relative h-[350px] md:h-[450px]">
        <img
          src="https://i.ibb.co/7NS33ywT/image.png"
          alt="Fast Delivery"
          className="h-full w-full object-cover"
        />

        <SlideContent
          index={2}
          title="Healthy • Affordable •Homemade"
          desc="Secure payments & real-time order tracking"
          btnText="Order Now"
          link="/dashboard/my-orders"
          color="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </Carousel>
  );
};

export default Banner;
