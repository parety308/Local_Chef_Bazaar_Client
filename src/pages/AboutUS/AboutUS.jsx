import React from "react";
import { FaUtensils, FaUsers, FaHeart, FaStore } from "react-icons/fa";

const AboutUS = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen transition-colors duration-300">

      {/* ===== HERO ===== */}
      <div className="text-center py-16 w-11/12 mx-auto">
        <h1 className="text-5xl font-bold text-primary mb-4">
          About LocalChefBazaar 🍲
        </h1>

        <p className="max-w-3xl mx-auto text-base-content/70 text-lg leading-relaxed">
          LocalChefBazaar connects talented home chefs with people who love
          fresh homemade meals while supporting local cooks.
        </p>
      </div>

      {/* ===== STORY ===== */}
      <div className="w-11/12 lg:w-10/12 mx-auto grid lg:grid-cols-2 gap-10 items-center py-10">
        <img
          src="https://i.ibb.co.com/chnksqT5/image.png"
          alt="Home Chef"
          className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4 text-base-content">
            Our Story
          </h2>

          <p className="text-base-content/70 leading-relaxed mb-4">
            Many talented home cooks struggle to earn without opening expensive
            restaurants. LocalChefBazaar provides a digital platform to sell
            homemade meals easily.
          </p>

          <p className="text-base-content/70 leading-relaxed">
            Built using MERN stack with secure authentication, reviews,
            dashboards and real‑time ordering.
          </p>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="bg-base-100 py-16 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
          What We Offer
        </h2>

        <div className="w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card */}
          <div className="p-6 rounded-2xl shadow-md bg-base-200 text-center hover:shadow-xl transition">
            <FaUtensils className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Fresh Homemade Meals</h3>
            <p className="text-base-content/60 mt-2">
              Discover daily menus prepared by local home chefs.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-base-200 text-center hover:shadow-xl transition">
            <FaUsers className="text-4xl text-secondary mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Support Local Chefs</h3>
            <p className="text-base-content/60 mt-2">
              Empower cooks to earn from their kitchen skills.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-base-200 text-center hover:shadow-xl transition">
            <FaHeart className="text-4xl text-error mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Favorites & Reviews</h3>
            <p className="text-base-content/60 mt-2">
              Save meals and share your food experiences.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-base-200 text-center hover:shadow-xl transition">
            <FaStore className="text-4xl text-info mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Smart Marketplace</h3>
            <p className="text-base-content/60 mt-2">
              Easy ordering, tracking & dashboards.
            </p>
          </div>

        </div>
      </div>

      {/* ===== MISSION ===== */}
      <div className="w-11/12 lg:w-9/12 mx-auto text-center py-16">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Our Mission
        </h2>

        <p className="text-base-content/70 text-lg leading-relaxed">
          Build a community-driven food ecosystem where homemade cooking
          becomes income and customers enjoy authentic meals.
        </p>
      </div>

    </div>
  );
};

export default AboutUS;