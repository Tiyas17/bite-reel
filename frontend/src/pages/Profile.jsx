import React, { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [storeInfo] = useState({
    logo: "https://images.pexels.com/photos/17431735/pexels-photo-17431735.jpeg?w=200&h=200",
    name: "Food Store Name",
    address: "123 Street, City, Country",
    totalMeals: 450,
    customers: "10k",
  });

  const [meals] = useState([
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg",
      name: "Meal 1",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/5041473/pexels-photo-5041473.jpeg",
      name: "Meal 2",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/16962427/pexels-photo-16962427.jpeg",
      name: "Meal 3",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/772513/pexels-photo-772513.png",
      name: "Meal 4",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/1108775/pexels-photo-1108775.jpeg",
      name: "Meal 5",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/8979161/pexels-photo-8979161.jpeg",
      name: "Meal 6",
    },
    {
      id: 7,
      image:
        "https://images.pexels.com/photos/6428247/pexels-photo-6428247.jpeg",
      name: "Meal 7",
    },
    {
      id: 8,
      image:
        "https://images.pexels.com/photos/3185509/pexels-photo-3185509.png",
      name: "Meal 8",
    },
    {
      id: 9,
      image:
        "https://images.pexels.com/photos/34203198/pexels-photo-34203198.jpeg",
      name: "Meal 9",
    },
    {
      id: 10,
      image: "https://images.pexels.com/photos/343871/pexels-photo-343871.jpeg",
      name: "Meal 10",
    },
    {
      id: 11,
      image:
        "https://images.pexels.com/photos/4062274/pexels-photo-4062274.jpeg",
      name: "Meal 11",
    },
    {
      id: 12,
      image:
        "https://images.pexels.com/photos/29306500/pexels-photo-29306500.jpeg",
      name: "Meal 12",
    },
  ]);

  return (
    <div className="profile-container">
      {/* Store Profile Card */}
      <div className="store-card">
        <div className="store-card-top">
          <div className="logo-wrapper">
            <img src={storeInfo.logo} alt="Store Logo" className="store-logo" />
          </div>
          <div className="store-info">
            <div className="info-box">
              <h2 className="info-title">{storeInfo.name}</h2>
            </div>
            <div className="info-box">
              <p className="info-text">{storeInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="store-stats">
          <div className="stat-item">
            <div className="stat-value">{storeInfo.totalMeals}</div>
            <div className="stat-name">Total Meals</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{storeInfo.customers}</div>
            <div className="stat-name">Customers</div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <img src={meal.image} alt={meal.name} className="meal-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
