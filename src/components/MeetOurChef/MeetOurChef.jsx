import React from 'react';
import { useNavigate } from 'react-router';

const chefs = [
  {
    id: 1,
    name: "Chef Ayesha",
    specialty: "Traditional Bengali Cuisine",
    image: "https://i.ibb.co.com/chnksqT5/image.png",
  },
  {
    id: 2,
    name: "Chef Rahman",
    specialty: "Healthy Home Meals",
    image: "https://i.ibb.co.com/60GZ6S9k/image.png",
  },
  {
    id: 3,
    name: "Chef Nabila",
    specialty: "Desserts & Snacks",
    image: "https://i.ibb.co.com/R4NSwxF4/image.png",
  },
];

const MeetOurChef = () => {
  const navigate = useNavigate();

  return (
    <section className="lg:mb-16 mb-8 px-5 lg:px-20 bg-base-200 transition-colors duration-300">

      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-base-content mb-10">
        Meet Our <span className="text-primary">Local Chefs 👩‍🍳</span>
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg bg-base-100"
          >
            {/* Image */}
            <img
              src={chef.image}
              alt={chef.name}
              className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-semibold">{chef.name}</h3>
              <p className="text-sm opacity-90">{chef.specialty}</p>

              <button
                onClick={() => navigate(`/meals`)}
                className="mt-3 btn btn-primary w-fit"
              >
                View Menu
              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default MeetOurChef;