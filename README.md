🍽️ CampusBite

Smart campus dining, simplified.
A full-stack PWA for college students to order food from campus canteens — and for canteen staff to manage everything from a single dashboard.

🔗 Live Demo: https://campusbite-1eqe.onrender.com/

✨ Features
👨‍🎓 Student Side

Browse campus canteens and full menu
Filter by category (Breakfast, Lunch, Snacks, Beverages) and price range
Add to cart, adjust quantities, view price breakdown
Place orders with phone number + payment method (Counter / UPI)
Order confirmation with unique token + QR code
Real-time order tracking (Placed → Preparing → Ready → Completed)
Search dishes with live suggestions
Dark mode support

👨‍🍳 Staff Side

Campus and canteen selection flow
Create new canteen with details (name, timing, location, contact)
Add menu items with image search (Unsplash API)
Dashboard with:

Overview cards (orders, revenue, menu items, rating)
Weekly earnings bar chart
Popular items analytics
Menu management (edit, delete, availability toggle)
Order management (Accept → Preparing → Mark Done / Unavailable)
Canteen Open/Closed toggle


Responsive sidebar with scroll spy

🔐 Auth & Security

Firebase Authentication (Email/Password)
Role-based access control (Student / Staff)
Firestore security rules — users can only access their own data
Auth guards on all protected routes
Persistent login state

📱 PWA

Installable on mobile and desktop
Service Worker for offline support
App manifest with icons
Mobile-optimized UI


🛠️ Tech Stack
LayerTechnologyFrontendHTML, CSS, Vanilla JS, Tailwind CSSTemplatingEJSBackendNode.js, Express.jsAuthFirebase AuthenticationDatabaseFirebase FirestoreImage SearchUnsplash APIAnalyticsGoogle Analytics (gtag)DeploymentRender

🚀 Getting Started
Prerequisites

Node.js v18+
Firebase project (Auth + Firestore enabled)
Unsplash API key

Installation
bash# Clone the repo
git clone https://github.com/yourusername/campusbite.git
cd campusbite

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your keys in .env

# Start development server
nodemon app.js
Environment Variables
Create a .env file in root:
envPORT=8080
UNSPLASH_ACCESS_KEY=your_unsplash_key_here

Firebase config is in public/js/userselection.js — replace with your own Firebase project credentials.


📁 Project Structure
campusbite/
├── public/
│   ├── css/
│   │   ├── staff.css
│   │   ├── dashboard.css
│   │   ├── userSelection.css
│   │   ├── cafeSelection.css
│   │   └── order.css
│   ├── js/
│   │   ├── authGuard.js
│   │   ├── userselection.js
│   │   ├── staff/
│   │   │   ├── campusSelection.js
│   │   │   ├── addMenu.js
│   │   │   └── dashboard.js
│   │   └── student/
│   │       ├── menu.js
│   │       └── order.js
│   └── images/
├── views/
│   ├── listings/
│   │   ├── userSelection.ejs
│   │   ├── cafeSelection.ejs
│   │   ├── menu.ejs
│   │   └── order.ejs
│   ├── staff/
│   │   ├── campusSelection.ejs
│   │   ├── addMenu.ejs
│   │   └── dashboard.ejs
│   └── partials/
│       └── loadingScreen.ejs
├── app.js
├── package.json
└── README.md

🗺️ App Flow
Landing Page (User Selection)
├── Student Flow
│   └── Login/Signup → Cafe Selection → Menu → Cart → Order → Tracking
└── Staff Flow
    └── Login/Signup → Campus Selection → Create Canteen → Add Menu → Dashboard

🔮 Planned Features

 MongoDB integration for persistent orders
 Real-time order updates using WebSockets
 Razorpay / UPI payment gateway integration
 Admin panel for managing multiple campuses
 Email/SMS order notifications
 Student order history
 Staff revenue reports (PDF export)
 Multi-language support (Hindi / English)


👨‍💻 Author
Hardik Srivastava
3rd Year CSE Student
GitHub • LinkedIn

📄 License
This project is built for academic purposes.
All logos and brand names belong to their respective owners.


"a Hardik Srivastava production" 🚀
