# 🎨 Dailist Client - React Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Modern, responsive React application built with Vite and Tailwind CSS**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [Routing](#-routing)
- [State Management](#-state-management)
- [Styling](#-styling)
- [API Integration](#-api-integration)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)

---

## 🎯 Overview

The Dailist client is a modern React application that provides a beautiful, intuitive interface for managing daily tasks, connecting with friends, and tracking productivity. Built with React 19, Vite, and Tailwind CSS, it offers a seamless user experience with real-time updates and smooth animations.

### Key Highlights

- ⚡ **Lightning Fast** - Vite-powered development with instant HMR
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 🔒 **Secure** - Protected routes with JWT authentication
- 📱 **Responsive** - Works perfectly on all devices
- 🔄 **Real-time** - Socket.io integration for live updates

---

## ✨ Features

### User Interface

- **Modern Login/Signup** - Beautiful authentication pages with smooth transitions
- **Protected Routes** - Automatic redirects for unauthenticated users
- **Responsive Sidebar** - Navigation with active state indicators
- **Social Feed** - Share posts, images, and quotes
- **Real-time Chat** - Instant messaging with Socket.io
- **Profile Management** - Edit bio, upload images, view analytics
- **Task Dashboard** - AI-analyzed tasks with difficulty and points
- **Activity Heatmap** - Visual representation of daily activity
- **User Search** - Find and connect with other users

### Technical Features

- ✅ React Router DOM v7 for client-side routing
- ✅ Context API for global authentication state
- ✅ Zustand for additional state management
- ✅ Axios for HTTP requests with credentials
- ✅ Socket.io client for real-time communication
- ✅ Framer Motion for smooth animations
- ✅ Protected route components
- ✅ Form validation and error handling

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable components
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/             # React Context providers
│   │   └── AuthContext.jsx   # Authentication state
│   │
│   ├── loginpages/          # Auth pages
│   │   ├── Login.jsx        # Main login/register page
│   │   └── Sign.jsx         # Sign in modal
│   │
│   ├── mainpages/           # Main app pages
│   │   └── Social.jsx       # Social feed
│   │
│   ├── profile/             # Profile features
│   │   ├── Profile.jsx
│   │   ├── Editbio.jsx
│   │   ├── heatmapsec/      # Activity heatmap
│   │   └── tasksection/     # Task display
│   │
│   ├── chats/               # Chat functionality
│   │   ├── Chats.jsx
│   │   ├── ChatList.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Message.ui.jsx
│   │   └── api.js           # Chat API calls
│   │
│   ├── search/              # User search
│   │   └── Search.jsx
│   │
│   ├── sidebar/             # Navigation
│   │   └── Sidebar.jsx
│   │
│   ├── ai/                  # AI task features
│   │   └── Aitasks.jsx
│   │
│   ├── pages/               # Additional pages
│   │   └── TaskLog.jsx
│   │
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── app.css              # Global styles
│   └── socket.io.js         # Socket.io client setup
│
├── components/              # Shared components
│   ├── Addtask.jsx
│   ├── CalenderGrid.jsx
│   ├── Header.jsx
│   └── ...
│
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
└── package.json              # Dependencies
```

---

## 🧩 Key Components

### AuthContext

Global authentication state management:

```javascript
import { useAuth } from './context/AuthContext';

const { isAuthenticated, user, login, logout } = useAuth();
```

**Features:**
- Tracks authentication status
- Provides login/logout functions
- Manages user data
- Auto-checks auth on mount

### ProtectedRoute

Route guard component:

```javascript
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

**Behavior:**
- Shows loading state while checking auth
- Redirects to `/` if not authenticated
- Renders children if authenticated

### Login Component

Main authentication page with:
- Sign up form (modal)
- Sign in modal
- Apple sign up button (placeholder)
- Get App button
- Beautiful UI with animations

### Sidebar

Navigation component with:
- Active route highlighting
- Icon-based navigation
- Responsive design
- Smooth transitions

---

## 🛣️ Routing

### Route Configuration

```javascript
// Public Routes
<Route path='/' element={<Login/>}/>

// Protected Routes
<Route path='/social' element={<ProtectedRoute><Social/></ProtectedRoute>}/>
<Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
<Route path='/chats' element={<ProtectedRoute><Chats/></ProtectedRoute>}/>
<Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
<Route path='/tasks' element={<ProtectedRoute><TaskLog/></ProtectedRoute>}/>
<Route path='/aitask' element={<ProtectedRoute><Aitasks/></ProtectedRoute>}/>
```

### Navigation

Use React Router's `NavLink` or `useNavigate`:

```javascript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/profile');
```

---

## 🗄️ State Management

### Authentication State (Context API)

```javascript
// AuthContext.jsx
const { isAuthenticated, user, login, register, logout } = useAuth();
```

### Additional State (Zustand)

```javascript
// For other global state
import { Function } from './profile/Function';
const clicked = Function(state => state.clicked);
```

### Local State (useState)

For component-specific state:

```javascript
const [data, setData] = useState({});
```

---

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS v4 for styling:

```javascript
<div className="min-h-screen flex bg-[#000000] text-[#D1D0D0]">
  <button className="w-full py-3 rounded-full bg-white text-black">
    Click me
  </button>
</div>
```

### Custom Colors

Project uses a dark theme with custom colors:
- Background: `#000000` (black)
- Text: `#D1D0D0` (light gray)
- Borders: `#5C4E4E` (dark gray)
- Accent: `#988686` (muted)

### Responsive Design

Tailwind's responsive utilities:

```javascript
<div className="hidden md:flex">  // Hidden on mobile, flex on desktop
<div className="w-full md:w-1/2"> // Full width mobile, half on desktop
```

---

## 🔌 API Integration

### Axios Configuration

```javascript
// src/chats/api.js
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Sends cookies automatically
});
```

### Making API Calls

```javascript
// GET request
const response = await api.get('/auth/me');

// POST request
const response = await api.post('/login', { email, password });
```

### Error Handling

```javascript
try {
  const response = await api.get('/endpoint');
} catch (error) {
  console.error(error.response?.data || error.message);
  alert(error.response?.data?.message || 'Something went wrong');
}
```

---

## 🔄 Real-time Features

### Socket.io Integration

```javascript
// src/socket.io.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  withCredentials: true,
});
```

### Using Socket Events

```javascript
import socket from './socket.io';

socket.on('message', (data) => {
  // Handle incoming message
});

socket.emit('sendMessage', { text: 'Hello' });
```

---

## 💻 Development

### Development Server

```bash
npm run dev
```

Features:
- Hot Module Replacement (HMR)
- Fast refresh
- Error overlay
- Source maps

### Code Structure

- **Components**: Keep components small and focused
- **Hooks**: Extract reusable logic into custom hooks
- **API**: Centralize API calls in `api.js` files
- **Styling**: Use Tailwind utility classes
- **State**: Use Context for auth, local state for UI

### Best Practices

1. **Component Organization**
   - One component per file
   - Use descriptive names
   - Keep components focused

2. **State Management**
   - Use Context for global auth state
   - Use local state for component-specific data
   - Avoid prop drilling

3. **Styling**
   - Use Tailwind utility classes
   - Keep custom CSS minimal
   - Use consistent spacing and colors

4. **Error Handling**
   - Always wrap API calls in try-catch
   - Show user-friendly error messages
   - Log errors for debugging

---

## 🏗️ Build & Deploy

### Building for Production

```bash
npm run build
```

Output:
- `dist/` directory with optimized files
- Minified JavaScript and CSS
- Optimized assets

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

1. **Static Hosting** (Vercel, Netlify)
   - Deploy `dist/` folder
   - Configure redirects for SPA

2. **Traditional Server**
   - Serve `dist/` with nginx/apache
   - Configure API proxy

3. **Docker**
   - Build container with nginx
   - Serve static files

### Environment Configuration

For production, update API base URL:

```javascript
// src/chats/api.js
const API_BASE = process.env.VITE_API_URL || 'http://localhost:3000';
```

Create `.env` file:
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure server CORS is configured
- Check `withCredentials: true` in axios config

**2. Authentication Not Working**
- Verify cookies are being set
- Check `withCredentials: true`
- Ensure server is running

**3. Routes Not Working**
- Check BrowserRouter is wrapping App
- Verify route paths match
- Check ProtectedRoute implementation

**4. Build Errors**
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Verify all imports are correct

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Socket.io Client Documentation](https://socket.io/docs/v4/client-api)

---

<div align="center">

**Built with ⚡ Vite and ❤️ React**

[⬆ Back to Top](#-dailist-client---react-frontend)

</div>
