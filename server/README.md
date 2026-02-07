# ⚙️ Dailist Server - Express Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=for-the-badge&logo=socket.io)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtoken)

**Robust Express.js backend with MongoDB, Socket.io, and AI integration**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Database Models](#-database-models)
- [Middleware](#-middleware)
- [Socket.io](#-socketio)
- [AI Integration](#-ai-integration)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)

---

## 🎯 Overview

The Dailist server is a powerful Express.js backend that handles authentication, task management, real-time communication, and AI-powered task analysis. Built with MongoDB, Socket.io, and Google Gemini AI, it provides a secure and scalable foundation for the Dailist application.

### Key Highlights

- 🔒 **Secure Authentication** - JWT tokens with HTTP-only cookies
- 🤖 **AI Integration** - Google Gemini for intelligent task analysis
- 💬 **Real-time Communication** - Socket.io for instant messaging
- 📊 **RESTful API** - Well-structured endpoints
- 🗄️ **MongoDB** - Flexible NoSQL database
- 🛡️ **Middleware** - Auth, validation, and error handling

---

## ✨ Features

### Core Features

- ✅ User authentication and authorization
- ✅ JWT token management
- ✅ Password hashing with bcrypt
- ✅ Task management with AI analysis
- ✅ Real-time chat with Socket.io
- ✅ File upload with Multer
- ✅ User profiles and social features
- ✅ Activity heatmap generation
- ✅ Friend request system
- ✅ Search functionality
- ✅ Daily logs and task tracking

### Security Features

- HTTP-only cookies for JWT storage
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Authentication middleware
- Secure file uploads

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key
- npm or yarn

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=...
   JWT_SECRET=your_super_secret_jwt_key_here
   GEMINI_API_KEY=your_google_gemini_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the server**
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start server (uses nodemon for auto-reload) |
| `node ./bin/www` | Start server directly |

---

## 📁 Project Structure

```
server/
├── routes/                 # API route handlers
│   ├── login.js            # Authentication routes
│   ├── register.js          # User registration
│   ├── profile.js           # User profile
│   ├── dailytask.js        # Task management
│   ├── chat.route.js        # Chat routes
│   ├── message.route.js    # Message routes
│   ├── userpost.js         # Social posts
│   ├── search.js           # User search
│   ├── friendreq.js        # Friend requests
│   ├── heatmap.js          # Activity heatmap
│   └── ...
│
├── models/                  # MongoDB schemas
│   ├── user_account.js      # User accounts
│   ├── user_profile.js      # User profiles
│   ├── Dailytask.js         # Daily tasks
│   ├── chat.model.js        # Chat rooms
│   ├── message.model.js     # Messages
│   ├── userpost.js          # Social posts
│   ├── friends.js           # Friend relationships
│   └── ...
│
├── middleware/              # Custom middleware
│   ├── auth.js              # JWT authentication
│   ├── ai_analyze.js        # AI task analysis
│   ├── chat.controllers.js  # Chat controllers
│   └── message.controllers.js
│
├── config/                  # Configuration files
│   ├── user_account_db.js   # MongoDB connection
│   ├── ai_model.js          # Google Gemini setup
│   ├── multer.js            # File upload config
│   └── supabase.js          # Supabase config
│
├── socket.io.js             # Socket.io setup
├── app.js                   # Express app configuration
└── bin/
    └── www                  # Server entry point
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

**Example Request:**
```javascript
POST /register
Body: {
  name: "John Doe",
  email: "john@example.com",
  password: "SecurePass123!",
  phone: "1234567890",
  date: "2000-01-01"
}
```

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/upload_task` | Create tasks (AI analyzed) | ✅ |
| GET | `/get_task` | Get daily tasks | ✅ |
| POST | `/complete_task` | Mark task complete | ✅ |
| GET | `/heatmap` | Get activity heatmap | ✅ |

**Example Request:**
```javascript
POST /upload_task
Headers: { Cookie: "jwt_id=..." }
Body: {
  task: {
    task1: "Complete project",
    task2: "Go to gym",
    task3: "Read book"
  }
}
```

### Social

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/userpost` | Create post | ✅ |
| GET | `/getuserpost` | Get user posts | ✅ |
| POST | `/upload_image` | Upload image | ✅ |
| POST | `/updatequote` | Update quote | ✅ |

### Chat

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/chat` | Get user chats | ✅ |
| GET | `/chat/users` | Get chat users | ✅ |
| POST | `/chat/create` | Create chat | ✅ |
| GET | `/message/:chatId` | Get messages | ✅ |
| POST | `/message/create` | Send message | ✅ |

### User

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get profile | ✅ |
| GET | `/search-users` | Search users | ✅ |
| POST | `/send-request` | Send friend request | ✅ |

---

## 🔐 Authentication

### JWT Token Flow

1. **User Login/Register**
   ```javascript
   // Server generates JWT
   const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });
   
   // Set HTTP-only cookie
   res.cookie("jwt_id", token, {
     httpOnly: true,
     secure: true,
     sameSite: "lax",
     maxAge: 24 * 60 * 60 * 1000
   });
   ```

2. **Protected Routes**
   ```javascript
   // middleware/auth.js
   const token = req.cookies.jwt_id;
   const decoded = jwt.verify(token, JWT_SECRET);
   req.user = { id: decoded._id };
   ```

3. **Using Auth Middleware**
   ```javascript
   router.post("/protected", auth, async (req, res) => {
     const userId = req.user.id; // Available after auth middleware
   });
   ```

### Password Security

```javascript
// Registration
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Login
const isMatch = await bcrypt.compare(password, user.password);
```

---

## 🗄️ Database Models

### User Account

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  date: Date
}
```

### User Profile

```javascript
{
  user_id: ObjectId (ref: user_account),
  username: String,
  bio: String,
  image: String,
  quote: String
}
```

### Daily Task

```javascript
{
  user: ObjectId (ref: user_account),
  date: Date,
  tasks: [{
    task: String,
    difficulty: "easy" | "medium" | "hard",
    category: "health" | "learning" | "work" | "personal" | "other",
    points: Number,
    completed: Boolean,
    completedAt: Date
  }]
}
```

### Chat

```javascript
{
  participants: [ObjectId],
  lastMessage: String,
  lastMessageAt: Date
}
```

### Message

```javascript
{
  chat: ObjectId (ref: chat),
  sender: ObjectId (ref: user_account),
  text: String,
  createdAt: Date
}
```

---

## 🛡️ Middleware

### Authentication Middleware

```javascript
// middleware/auth.js
const auth = (req, res, next) => {
  const token = req.cookies.jwt_id;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = { id: decoded._id };
  next();
};
```

### AI Analysis Middleware

```javascript
// middleware/ai_analyze.js
async function analyze_task(tasks) {
  // Uses Google Gemini to analyze tasks
  // Returns: difficulty, category, points
}
```

### Using Middleware

```javascript
// Protect route
router.post("/upload_task", auth, async (req, res) => {
  // req.user.id is available
});

// File upload
const upload = multer({ storage: ... });
router.post("/upload_image", auth, upload.single("image"), ...);
```

---

## 💬 Socket.io

### Setup

```javascript
// socket.io.js
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});
```

### Connection Handling

```javascript
io.on('connection', (socket) => {
  // Handle user connection
  socket.on('joinRoom', (chatId) => {
    socket.join(chatId);
  });
  
  // Handle messages
  socket.on('sendMessage', (data) => {
    io.to(data.chatId).emit('newMessage', data);
  });
});
```

---

## 🤖 AI Integration

### Google Gemini Setup

```javascript
// config/ai_model.js
const { GoogleGenerativeAI } = require('@google/genai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

### Task Analysis

```javascript
// middleware/ai_analyze.js
const response = await model.generateContent({
  model: "gemini-3-flash-preview",
  contents: `Analyze tasks: ${tasks}`
});

// Returns: difficulty, category, points for each task
```

### AI Features

- Automatic task categorization
- Difficulty assessment
- Point calculation
- Category classification (health, learning, work, personal, other)

---

## 🔧 Environment Variables

### Required Variables

```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/dailist

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# AI Services
GEMINI_API_KEY=your_google_gemini_api_key

# Supabase (optional)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### Generating JWT Secret

```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 💻 Development

### Development Server

```bash
npm start
# Uses nodemon for auto-reload
```

### CORS Configuration

```javascript
// app.js
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
  credentials: true
}));
```

### Error Handling

```javascript
// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Server error'
  });
});
```

### Logging

```javascript
// Morgan logger
app.use(logger('dev')); // Development
app.use(logger('combined')); // Production
```

---

## 🚢 Deployment

### Production Checklist

- [ ] Set secure environment variables
- [ ] Use MongoDB Atlas or production database
- [ ] Configure CORS for production domain
- [ ] Set secure cookie flags
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Configure rate limiting
- [ ] Set up monitoring

### Environment Setup

```env
# Production .env
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dailist
JWT_SECRET=production_secret_key_here
GEMINI_API_KEY=production_api_key
NODE_ENV=production
```

### Security Best Practices

1. **Use HTTPS** - Always use HTTPS in production
2. **Secure Cookies** - Set `secure: true` in production
3. **Environment Variables** - Never commit secrets
4. **Rate Limiting** - Implement rate limiting
5. **Input Validation** - Validate all inputs
6. **Error Messages** - Don't expose sensitive info

### Deployment Options

1. **Heroku**
   ```bash
   heroku create dailist-server
   heroku config:set MONGODB_URI=...
   git push heroku main
   ```

2. **DigitalOcean**
   - Create droplet
   - Install Node.js
   - Use PM2 for process management

3. **AWS/Docker**
   - Build Docker image
   - Deploy to ECS/EC2

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Check MongoDB is running
mongod

# Verify connection string
MONGODB_URI=mongodb://localhost:27017/dailist
```

**2. JWT Token Errors**
- Verify JWT_SECRET is set
- Check token expiration
- Verify cookie settings

**3. CORS Errors**
- Check origin in CORS config
- Verify credentials: true
- Check client withCredentials setting

**4. File Upload Issues**
- Check Multer configuration
- Verify file size limits
- Check storage path permissions

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Socket.io Documentation](https://socket.io/docs)
- [JWT Documentation](https://jwt.io)
- [Google Gemini API](https://ai.google.dev)

---

<div align="center">

**Powered by ⚡ Node.js and 🚀 Express**

[⬆ Back to Top](#️-dailist-server---express-backend)

</div>
