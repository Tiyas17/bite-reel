# 🍔 BiteReel – Reels-Based Food Delivery Platform

BiteReel is a full-stack food delivery application inspired by short-form video platforms like Instagram Reels, enabling users to discover food through engaging video content while allowing food partners to showcase their offerings.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Register, Login)
- 👥 Role-Based Access Control (User & Food Partner)
- 🎥 Reels-style food video feed (infinite scroll experience)
- 📂 Video upload & cloud storage integration
- 👤 Food partner profile navigation from reels
- ⚡ Lazy loading for optimized video playback
- 📡 RESTful APIs for content and user management

---

## 🧠 Tech Stack

### Backend
- Node.js, Express.js  
- MongoDB  
- JSON Web Token (JWT)  
- Multer (file handling)  
- ImageKit (cloud media storage)  

### Frontend
- React.js  
- Tailwind CSS  

---

## 🏗️ Architecture Overview

Follows a modular **MVC architecture**:
- Controllers → API logic  
- Models → Database schemas  
- Routes → Endpoint definitions  
- Middlewares → Authentication & authorization  
- Services → Business logic  

---

## 🔐 Authentication & Authorization

- Authentication implemented using JWT tokens  
- Token payload:

## JWT payload data:
{
  "userId": "...",
  "role": "user | foodPartner"
}

## Video Upload and storage pipeline

Client → Multer → Buffer → ImageKit → URL → MongoDB

## 📱 Core Functionality
# 🎬 Reels Feed
- Scrollable feed of food videos
- Designed for high engagement and quick discovery
  
## 👤 Food Partner Profiles
- Each reel links to the uploader’s profile
- Displays all content from that food partner

## git clone https://github.com/Tiyas17/bite-reel.git
- cd bite-reel
- npm install
- npm run dev

## .env
- PORT=3000
- MONGO_URI=your_mongo_connection
- JWT_SECRET=your_secret_key

## 📌 Key Design Decisions
- Used JWT for stateless authentication
- Implemented middleware-based RBAC for secure access control
- Offloaded video storage to ImageKit for scalability
- Designed reels-based UX for better user engagement
- Applied MVC pattern for maintainability

## 📈 Future Improvements
- 🛒 End-to-end food ordering workflow  
- 🔍 Search & recommendation engine 
