import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/home.css";

const demoVideos = [
  {
    id: 1,
    videoUrl:
      "https://ik.imagekit.io/wprs5j8upe/2ef986a9-1287-43c5-be38-54defe6955af_7aXzHeO0s",
    description: "Crispy Fries and Snacks",
    storeName: "Pizza Palace",
  },
  {
    id: 2,
    videoUrl:
      "https://ik.imagekit.io/wprs5j8upe/94965e68-ec31-46b8-9c35-a7778c5d9daf_IPI3aHu68",
    description: "Delicious Burger prepared with lots of crousals and frappe",
    storeName: "Biryani House",
  },
  {
    id: 3,
    videoUrl:
      "https://ik.imagekit.io/wprs5j8upe/c4391f2b-aae6-478d-befe-f5cbc4c62ecb_XSJk_Nekm",
    description: "Golden crispy donuts freshly made with sweet glazing",
    storeName: "Donut Delight",
  },
  {
    id: 4,
    videoUrl:
      "https://ik.imagekit.io/wprs5j8upe/51b2b61e-49b3-420e-9c9e-ce97be9a7563_tEK-Hio7x",
    description: "Premium cold brew coffee with espresso and smooth milk",
    storeName: "Coffee Corner",
  },
  {
    id: 5,
    videoUrl:
      "https://ik.imagekit.io/wprs5j8upe/25eeebab-8b1b-4d49-868e-c75d3e67c151_BQoo1M6cn",
    description: "Premium espresso coffee with rich foam",
    storeName: "Coffee Corner",
  },
];

const Home = () => {
  const navigate = useNavigate();
  // Sample data - replace with API call
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((response) => {
        setVideos(response.data.food);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
  const video = entry.target;

  if (entry.isIntersecting) {
    videoRefs.current.forEach((v) => {
      if (v && v !== video) v.pause();
    });
    video.play().catch(() => {});
  } else {
    video.pause();
  }
});
    },
    { threshold: 0.6 } // 60% visible
  );

  videoRefs.current.forEach((video) => {
    if (video) observer.observe(video);
  });

  return () => {
    videoRefs.current.forEach((video) => {
      if (video) observer.unobserve(video);
    });
    observer.disconnect();
  };
}, [videos]);

  return (
    <div className="reels-container">
      <div className="reels-scroll">
        {videos.map((video,index) => (
          <div key={video._id} className="reel-item">
            <video
  ref={(el) => (videoRefs.current[index] = el)}
  src={video.video}
  className="reel-media"
  muted
  loop
  playsInline
/>
            <div className="reel-overlay">
              <div className="reel-content">
                <h3>{video.name}</h3>
                <p className="reel-description">{video.description}</p>
                <button
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="visit-store-btn"
                >
                  Visit Store
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
