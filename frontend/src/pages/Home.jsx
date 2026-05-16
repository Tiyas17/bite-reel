import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const API = "http://localhost:3000/api";

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [interactions, setInteractions] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get(`${API}/food/`, { withCredentials: true })
      .then((response) => {
        const foods = response.data.food;
        setVideos(foods);

        // initialise per-video like/save state from DB counts
        const init = {};
        foods.forEach((f) => {
          init[f._id] = {
            liked: f.isLiked ?? false,        // ← seeded from backend
            saved: f.isSaved ?? false,        // ← seeded from backend
            likes: f.likes ?? 0,
            saves: f.savesCount ?? 0,
            likeLoading: false,
            saveLoading: false,
          };
        });
        setInteractions(init);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            videoRefs.current.forEach((v) => { if (v && v !== video) v.pause(); });
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => { if (video) observer.observe(video); });
    return () => {
      videoRefs.current.forEach((video) => { if (video) observer.unobserve(video); });
      observer.disconnect();
    };
  }, [videos]);

  const handleLike = async (foodId) => {
    const cur = interactions[foodId];
    if (!cur || cur.likeLoading) return;

    // optimistic update
    setInteractions((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        liked: !cur.liked,
        likes: cur.liked ? cur.likes - 1 : cur.likes + 1,
        likeLoading: true,
      },
    }));

    try {
      await axios.post(`${API}/food/like`, { foodId }, { withCredentials: true });
    } catch (err) {
      console.error(err);
      // revert on error
      setInteractions((prev) => ({
        ...prev,
        [foodId]: {
          ...prev[foodId],
          liked: cur.liked,
          likes: cur.likes,
        },
      }));
    } finally {
      setInteractions((prev) => ({
        ...prev,
        [foodId]: { ...prev[foodId], likeLoading: false },
      }));
    }
  };

  const handleSave = async (foodId) => {
    const cur = interactions[foodId];
    if (!cur || cur.saveLoading) return;

    // optimistic update
    setInteractions((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        saved: !prev[foodId].saved,
        saves: prev[foodId].saved
          ? Math.max(0, prev[foodId].saves - 1)
          : prev[foodId].saves + 1,
        saveLoading: true,
      },
    }));

    try {
      await axios.post(`${API}/food/save`, { foodId }, { withCredentials: true });
    } catch (err) {
      console.error(err);
      // revert on error
      setInteractions((prev) => ({
        ...prev,
        [foodId]: {
          ...prev[foodId],
          saved: cur.saved,
          saves: cur.saves,
        },
      }));
    } finally {
      setInteractions((prev) => ({
        ...prev,
        [foodId]: { ...prev[foodId], saveLoading: false },
      }));
    }
  };

  return (
    <div className="reels-container">
      <div className="reels-scroll">
        {videos.map((video, index) => {
          const state = interactions[video._id] || {};
          return (
            <div key={video._id} className="reel-item">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.video}
                className="reel-media"
                muted
                loop
                playsInline
              />

              {/* ── Right-side action bar ── */}
              <div className="reel-actions">
                <button
                  className={`reel-action-btn${state.liked ? " reel-action-btn--liked" : ""}`}
                  onClick={() => handleLike(video._id)}
                  disabled={state.likeLoading}
                  aria-label={state.liked ? "Unlike" : "Like"}
                >
                  <svg
                    className="action-icon"
                    viewBox="0 0 24 24"
                    fill={state.liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="action-count">{state.likes ?? 0}</span>
                </button>

                <button
                  className={`reel-action-btn${state.saved ? " reel-action-btn--saved" : ""}`}
                  onClick={() => handleSave(video._id)}
                  disabled={state.saveLoading}
                  aria-label={state.saved ? "Unsave" : "Save"}
                >
                  <svg
                    className="action-icon"
                    viewBox="0 0 24 24"
                    fill={state.saved ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="action-count">{state.saves ?? 0}</span>
                </button>
              </div>

              {/* ── Bottom overlay ── */}
              <div className="reel-overlay">
                <div className="reel-content">
                  <h3>{video.name}</h3>
                  <p className="reel-description">{video.description}</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="visit-store-btn"
                  >
                    Visit Store
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
