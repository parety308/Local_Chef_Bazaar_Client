# 🍲 LocalChefBazaar — Marketplace for Local Home‑Cooked Meals

LocalChefBazaar is a MERN stack web application that connects home chefs with customers who want fresh homemade meals.

Users can explore meals, place orders, track requests, and leave reviews. 
Home chefs can sell food easily without opening a restaurant.


## 🌐 Live Website
🔗 https://local-chef-bazaar-online.netlify.app<br>
🔗 https://email-password-auth-61ee5.web.app<br>
🔗 https://email-password-auth-61ee5.firebaseapp.com<br>

## 💻 Client Repository
🔗 https://github.com/parety308/Local_Chef_Bazaar_Client

## ⚙️ Server Repository
🔗 https://github.com/parety308/Local_Chef_Bazaar_Server

## 🎯 Project Purpose

The goal of this project is to create a platform where local home chefs can sell homemade food while customers can easily discover and order meals online.


## ✨ Key Features

- User authentication (Login & Registration)
- Role-based dashboard (User, Chef, Admin)
- Browse daily meals
- Meal details page
- Order placement system
- Secure payment status handling
- Reviews & ratings
- Favorite meals system
- Pagination & sorting
- Admin user management

## 👤 User Roles

### 👨‍🍳 Chef
- Create meals
- Manage meals
- Handle order requests

### 🧑 User
- Order meals
- Add favorites
- Write reviews
- Track orders

### 🛠 Admin
- Manage users
- Approve requests
- View platform statistics

## 🧰 Technologies Used

### Frontend
- React.js
- React Router
- TanStack Query
- Tailwind CSS
- Framer Motion
- DaisyUi

### Backend
- Node.js
- Express.js
- MongoDB
- Stripe-Payment Gateway

## 🔒 Security Features

- JWT authentication
- Protected routes
- Role-based authorization
- Secure HTTP-only cookies
- Axios secure interceptor


## 📄 Pages Overview

- Home Page – Featured meals and chefs
- Meals Page – All meals with pagination & sorting
- Meal Details – Full food information
- Order Page – Confirm meal order
- Dashboard – Role-based control panel

## 🗄 Database Collections

- users
- meals
- orders
- reviews
- favorites

## ⚙️ Installation & Setup

### 1️⃣ Clone Client
git clone https://github.com/parety308/Local_Chef_Bazaar_Client

cd Local_Chef_Bazaar_Client
npm install
npm run dev

### 2️⃣ Clone Server
git clone https://github.com/parety308/Local_Chef_Bazaar_Server

cd Local_Chef_Bazaar_Server
npm install
nodemon index.js


## 🔐 Environment Variables

Create a `.env` file in both client and server.

### Client (.env)

- VITE_API_URL=your_server_url
- VITE_FIREBASE_API_KEY=xxxx
- VITE_AUTH_DOMAIN=xxxx

### Server (.env)
- PORT=3000
- DB_USER=your_mongodb_user
- DB_PASS=your_mongodb_password
- JWT_SECRET=your_secret
- STRIPE_SECRET_KEY=xxxx


## 🚀 Challenges Faced
- Implementing role-based routing
- Managing secure API requests
- Pagination system

## 📚 What I Learned
- Full MERN workflow
- Authentication flow
- Backend data handling

## 🚀 Deployment

Client: Netlify  
Server: Render / Vercel / Railway  
Database: MongoDB Atlas  
Authentication: Firebase

## 👨‍💻 Author

**MD Parvez Hasan**  
MERN Stack Developer

- 📧 Email: parvezyesrat17032024@gmail.com 
- 📱 Phone: +8801876097788 
- 💼 LinkedIn: www.linkedin.com/in/md-parvez-hasan-967729344  
- 🐙 GitHub:https://github.com/parety308
