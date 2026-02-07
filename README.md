# 🚀 Dailist - Your Daily Productivity Companion

<div align="center">

![Dailist Logo](https://img.shields.io/badge/Dailist-Productivity-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

**Transform your daily routine into a productive journey with AI-powered task management and social connectivity.**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Dailist** is a modern, full-stack productivity application that combines task management, social interaction, and AI-powered insights to help users stay organized and motivated. Built with React and Node.js, it offers a seamless experience for tracking daily tasks, connecting with friends, and analyzing productivity patterns.

### Why Dailist?

- 🤖 **AI-Powered Task Analysis** - Automatically categorizes and scores your tasks
- 📊 **Visual Progress Tracking** - Heatmaps and analytics to visualize your productivity
- 💬 **Real-time Communication** - Chat with friends and share your progress
- 🔒 **Secure Authentication** - JWT-based security with HTTP-only cookies
- 📱 **Modern UI/UX** - Beautiful, responsive design built with Tailwind CSS

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure JWT-based login/registration with route protection |
| 📝 **Task Management** | Create, track, and complete daily tasks with AI analysis |
| 🤖 **AI Integration** | Google Gemini AI analyzes tasks for difficulty, category, and points |
| 📊 **Activity Heatmap** | Visual representation of your daily activity patterns |
| 💬 **Real-time Chat** | Socket.io powered messaging system |
| 👥 **Social Feed** | Share posts, quotes, and images with your network |
| 🔍 **User Search** | Find and connect with other users |
| 📈 **Profile Analytics** | Track your productivity scores and achievements |
| 📅 **Daily Logs** | Maintain detailed logs of your daily activities |

### Security Features

- ✅ HTTP-only cookie authentication
- ✅ Protected routes with automatic redirects
- ✅ Server-side JWT verification
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ Input validation and sanitization

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**
- **Google Gemini API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dailist
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file in `server/` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. **Start the development servers**
   
   **Terminal 1 - Server:**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:3000
   ```
   
   **Terminal 2 - Client:**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐         ┌─────────────────┐
│   React Client  │ ◄─────► │  Express Server │
│   (Port 5173)   │  HTTP   │   (Port 3000)   │
└─────────────────┘         └─────────────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │    MongoDB      │
                            │   Database      │
                            └─────────────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │  Google Gemini  │
                            │   AI Service    │
                            └─────────────────┘
```

### Request Flow

1. **User Action** → React component
2. **API Call** → Axios with credentials
3. **Server Middleware** → Auth verification
4. **Route Handler** → Business logic
5. **Database** → MongoDB operations
6. **Response** → JSON data to client
7. **State Update** → React re-render

### Authentication Flow

```
Login → JWT Token → HTTP-only Cookie → Protected Routes
  ↓
AuthContext → checkAuth() → /auth/me → Verify Token
  ↓
isAuthenticated = true → Access Granted
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI library
- **React Router DOM 7.12** - Client-side routing
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Axios 1.13** - HTTP client
- **Socket.io Client 4.8** - Real-time communication
- **Framer Motion 12.29** - Animation library
- **Zustand 5.0** - State management

### Backend
- **Node.js** - Runtime environment
- **Express 4.22** - Web framework
- **MongoDB + Mongoose 9.1** - Database and ODM
- **Socket.io 4.8** - Real-time server
- **JWT 9.0** - Authentication tokens
- **bcryptjs 3.0** - Password hashing
- **Multer 2.0** - File upload handling
- **Google Gemini AI** - Task analysis

### Infrastructure
- **MongoDB** - NoSQL database
- **Supabase** - Additional services (if used)
- **Cookie Parser** - Cookie management
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
Dailist/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/        # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── loginpages/    # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Sign.jsx
│   │   ├── mainpages/     # Main application pages
│   │   │   └── Social.jsx
│   │   ├── profile/       # Profile management
│   │   ├── chats/         # Chat functionality
│   │   ├── search/        # User search
│   │   ├── sidebar/       # Navigation sidebar
│   │   ├── ai/            # AI task features
│   │   └── App.jsx        # Main app component
│   ├── components/        # Shared components
│   └── package.json
│
├── server/                 # Express backend application
│   ├── routes/            # API route handlers
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dailytask.js
│   │   ├── chat.route.js
│   │   └── ...
│   ├── models/            # MongoDB schemas
│   │   ├── user_account.js
│   │   ├── Dailytask.js
│   │   └── ...
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   └── ai_analyze.js
│   ├── config/            # Configuration files
│   │   ├── user_account_db.js
│   │   └── ai_model.js
│   ├── socket.io.js       # Socket.io setup
│   └── app.js             # Express app configuration
│
└── README.md              # This file
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload_task` | Create daily tasks (AI analyzed) | ✅ |
| GET | `/get_task` | Get user's daily tasks | ✅ |
| POST | `/complete_task` | Mark task as complete | ✅ |
| GET | `/heatmap` | Get activity heatmap data | ✅ |

### Social Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/userpost` | Create a post | ✅ |
| GET | `/getuserpost` | Get user posts | ✅ |
| POST | `/upload_image` | Upload post image | ✅ |
| POST | `/updatequote` | Update user quote | ✅ |

### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/chat` | Get user chats | ✅ |
| GET | `/chat/users` | Get users for chat | ✅ |
| POST | `/chat/create` | Create new chat | ✅ |
| GET | `/message/:chatId` | Get messages | ✅ |
| POST | `/message/create` | Send message | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | ✅ |
| GET | `/search-users` | Search users | ✅ |
| POST | `/send-request` | Send friend request | ✅ |

---

## 🔐 Authentication

### How It Works

1. **Registration/Login**: User credentials sent to server
2. **Token Generation**: Server creates JWT token with user ID
3. **Cookie Storage**: Token stored in HTTP-only cookie
4. **Route Protection**: `ProtectedRoute` component checks authentication
5. **Auto Redirect**: Unauthenticated users redirected to login

### Protected Routes

All routes except `/` (login page) are protected:
- `/social` - Social feed
- `/profile` - User profile
- `/chats` - Messaging
- `/search` - User search
- `/tasks` - Task management
- `/aitask` - AI task features

### Security Features

- ✅ JWT tokens in HTTP-only cookies (XSS protection)
- ✅ Server-side token verification
- ✅ Password hashing with bcrypt
- ✅ CORS configuration
- ✅ Input validation

---

## 🔧 Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/dailist

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI Services
GEMINI_API_KEY=your_google_gemini_api_key

# Supabase (if used)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### Client Configuration

Client uses hardcoded API base URL in `src/chats/api.js`:
```javascript
const API_BASE = 'http://localhost:3000';
```

For production, consider using environment variables.

---

## 💻 Development

### Running in Development Mode

**Server:**
```bash
cd server
npm start
# Uses nodemon for auto-reload
```

**Client:**
```bash
cd client
npm run dev
# Vite dev server with HMR
```

### Building for Production

**Client:**
```bash
cd client
npm run build
# Output in dist/ directory
```

**Server:**
```bash
cd server
npm start
# Production mode
```

### Code Structure Guidelines

- **Components**: Keep components small and focused
- **State Management**: Use Context API for auth, Zustand for other state
- **API Calls**: Centralize in `api.js` files
- **Styling**: Use Tailwind CSS utility classes
- **Routing**: All protected routes use `ProtectedRoute` wrapper

---

## 🚢 Deployment

### Prerequisites for Production

1. Set up MongoDB Atlas or production MongoDB instance
2. Configure environment variables
3. Set up reverse proxy (nginx) for production
4. Configure CORS for production domain
5. Set secure cookie flags in production

### Deployment Steps

1. **Build client:**
   ```bash
   cd client
   npm run build
   ```

2. **Serve client build** (using nginx or serve static files)

3. **Deploy server:**
   ```bash
   cd server
   npm start
   ```

4. **Configure environment variables** on hosting platform

5. **Set up MongoDB connection** string

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Test your changes before submitting

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - Chaitanaya | Gaurav

---

## 🙏 Acknowledgments

- Google Gemini AI for task analysis
- React and Express communities
- All open-source contributors

---

<div align="center">

**Made with ❤️ for productivity enthusiasts**

[⬆ Back to Top](#-dailist---your-daily-productivity-companion)

</div>
