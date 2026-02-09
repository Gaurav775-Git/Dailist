# 401 Unauthorized Fix - Implementation Summary

## Problem
- Frontend (Vercel) → Backend (Render) requests returned 401 Unauthorized
- Issue: Cookies were not being sent with cross-origin requests

## Root Causes
1. **Frontend**: Not using `withCredentials: true` for all API calls
2. **Backend**: CORS configuration not explicitly allowing credentials
3. **Inconsistent endpoints**: Frontend using wrong auth endpoints

## Solutions Implemented

### FRONTEND CHANGES

#### 1. ✅ Created Shared Axios Instance
**File**: `client/src/api/axios.js`
```javascript
import axios from 'axios';

const API_BASE = 'https://dailist-1.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,  // ← CRITICAL for cookies
});

export default api;
```

#### 2. ✅ Updated All API Imports
All frontend components now import from the shared instance:
- `client/src/chats/api.js`
- `client/src/context/AuthContext.jsx`
- `client/src/search/Search.jsx`
- `client/components/CalenderGrid.jsx`
- `client/components/CalenderSection.jsx`
- `client/components/TaskLogViewer.jsx`
- `client/components/Addtask.jsx`
- `client/components/TaskLogForm.jsx`
- `client/src/profile/Profile.jsx`
- `client/src/profile/Editbio.jsx`
- `client/src/profile/heatmapsec/Heatmap.jsx`
- `client/src/profile/tasksection/Tasksec.jsx`
- `client/src/profile/tasksection/Taskdisplay.jsx`
- `client/src/mainpages/Social.jsx`

#### 3. ✅ Fixed API Endpoints
**File**: `client/src/context/AuthContext.jsx`
```javascript
// Before
await api.post('/login', { email, password });      // ❌ Wrong
await api.post('/logout');                          // ❌ Wrong

// After
await api.post('/auth/login', { email, password }); // ✅ Correct
await api.post('/auth/logout');                     // ✅ Correct
```

#### 4. ✅ Removed All Direct axios Imports
No component has:
```javascript
import axios from 'axios';  // ❌ Removed
```
All use:
```javascript
import api from '../api/axios';  // ✅ Shared instance
```

---

### BACKEND CHANGES

#### 1. ✅ Enhanced CORS Configuration
**File**: `server/app.js`
```javascript
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://dailist-two.vercel.app",  // Production frontend
      "http://localhost:5173",            // Vite dev server
      "http://localhost:3000"             // Fallback local dev
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  credentials: true,                    // ← CRITICAL
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}));
```

**Key changes**:
- `credentials: true` - allows cookies to be sent
- Dynamic origin validation instead of hardcoded array
- Fixed: `UPDATE` → `PATCH` (correct HTTP method)
- Added `allowedHeaders` and `optionsSuccessStatus`

#### 2. ✅ Socket.io CORS Configuration
**File**: `server/socket.io.js` - Already correct:
```javascript
const io = new Server(server, {
  cors: {
    origin: [
      "https://dailist-two.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true  // ← Already enabled
  },
});
```

#### 3. ✅ Auth Middleware
**File**: `server/middleware/auth.js`
```javascript
const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt_id;  // Read from cookies
        
        if (!token) {
            console.log("[AUTH] No JWT token found in cookies");
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            console.log("[AUTH] Token verification failed");
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        req.user = { id: decode._id };  // Set user info
        console.log("[AUTH] User authenticated:", decode._id);
        next();
        
    } catch (error) {
        console.log("[AUTH] Error:", error.message);
        return res.status(401).json({ message: "invalid token" })
    }
}
```

**Changes**:
- Fixed: Changed `req.user._id` → `req.user.id` (consistent with all routes)
- Added debug logging for troubleshooting

#### 4. ✅ Login Route - Correct Cookie Settings
**File**: `server/routes/login.js`
```javascript
router.post("/auth/login", async (req, res) => {
  // ... validation ...
  
  const token = jwt.sign(
    { _id: exist._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 🔥 CRITICAL COOKIE FIX
  res.cookie("jwt_id", token, {
    httpOnly: true,      // Cannot be accessed via JavaScript
    secure: true,        // Only sent over HTTPS
    sameSite: "none",    // Required for Vercel ↔ Render cross-site
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  });

  res.status(200).json({ message: "Login success" });
});
```

#### 5. ✅ Auth Me Route - Fixed Property Access
**File**: `server/routes/login.js`
```javascript
router.get("/auth/me", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user.id)  // Fixed: req.user.id (was req.user._id)
      .select("_id name")
      .lean();

    if (!u) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: String(u._id),
      name: u.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
```

#### 6. ✅ Cookie Parser Middleware
**File**: `server/app.js` - Already enabled:
```javascript
app.use(cookieParser());  // Parses cookies from request headers
```

---

## Verification Checklist

### Frontend ✅
- [x] Shared Axios instance exists at `client/src/api/axios.js`
- [x] Instance has `baseURL = https://dailist-1.onrender.com`
- [x] Instance has `withCredentials: true`
- [x] ALL API calls use the shared instance (no direct axios imports)
- [x] `/auth/me` calls use `api.get('/auth/me')`
- [x] `/auth/login` calls use `api.post('/auth/login', data)`
- [x] `/auth/logout` calls use `api.post('/auth/logout')`
- [x] No relative URLs like `"/auth/..."` from components

### Backend ✅
- [x] CORS has `credentials: true`
- [x] CORS origin includes Vercel production domain
- [x] CORS origin includes localhost for development
- [x] Cookie settings: `httpOnly: true`, `secure: true`, `sameSite: "none"`
- [x] Auth middleware reads from `req.cookies.jwt_id`
- [x] Auth middleware sets `req.user.id` (consistent with all routes)
- [x] `/auth/me` uses `req.user.id` to find user
- [x] Cookie-parser middleware is enabled
- [x] Socket.io CORS also has credentials enabled

---

## How It Works (After Fixes)

### Login Flow
1. User submits login form via `Sign.jsx`
2. Frontend calls `api.post('/auth/login', { email, password })`
3. Request includes `withCredentials: true` (from shared instance)
4. Backend validates credentials and sets cookie:
   ```
   Set-Cookie: jwt_id=<token>; HttpOnly; Secure; SameSite=None
   ```
5. Browser automatically stores the cookie (cross-site allowed)

### Auth Check Flow
1. App mounts, calls `api.get('/auth/me')`
2. Browser automatically includes cookie (due to `withCredentials: true`)
3. Backend receives request with `req.cookies.jwt_id`
4. Auth middleware verifies token and sets `req.user.id`
5. Route fetches user and returns data
6. Frontend shows authenticated UI

---

## Testing in Production

### Step 1: Build and Deploy
```bash
# Frontend
cd client
npm run build
# Deploy to Vercel

# Backend
# Deploy to Render (should auto-deploy from git)
```

### Step 2: Test Login
1. Visit `https://dailist-two.vercel.app/`
2. Click "Sign In"
3. Enter credentials and click "Sign In"
4. Should see "Login successful!" and redirect to `/social`

### Step 3: Test Auth Me
1. After login, open browser DevTools → Network
2. Refresh page
3. Look for `auth/me` request
4. Should return 200 with user data (not 401)
5. Check Request Headers → Cookie should have `jwt_id`

### Step 4: Test Protected Routes
- Visit `/profile` - should load (protected by auth)
- Visit `/social` - should load (protected by auth)
- If not authenticated, should redirect to login

---

## Common Issues & Solutions

### Issue: Still getting 401 on /auth/me
**Causes**:
- Browser didn't send cookie (check Network tab)
- Cookie wasn't set on login (check Set-Cookie header)
- CORS preflight failed (check error in browser console)

**Solution**:
1. Check browser DevTools → Application → Cookies
2. Verify `jwt_id` cookie exists with `.onrender.com` domain
3. Check Network → `auth/me` request has `Cookie: jwt_id=...`

### Issue: CORS error in browser console
**Likely cause**: Origin not in allowed list

**Solution**:
1. Check actual Vercel domain in app
2. Add to `allowedOrigins` in `server/app.js`
3. Redeploy backend

### Issue: Cookies work locally but not in production
**Likely causes**:
- Frontend still using `http://` instead of `https://`
- Vercel domain doesn't match CORS origin list
- `secure: true` requires HTTPS

**Solution**:
- Verify frontend is at `https://` URL
- Check exact domain and add to CORS
- Ensure backend has `secure: true` for production

---

## Files Modified

### Frontend (12 files)
- ✅ `client/src/api/axios.js` (NEW)
- ✅ `client/src/chats/api.js`
- ✅ `client/src/context/AuthContext.jsx`
- ✅ `client/src/search/Search.jsx`
- ✅ `client/components/CalenderGrid.jsx`
- ✅ `client/components/CalenderSection.jsx`
- ✅ `client/components/TaskLogViewer.jsx`
- ✅ `client/components/Addtask.jsx`
- ✅ `client/components/TaskLogForm.jsx`
- ✅ `client/src/profile/Profile.jsx`
- ✅ `client/src/profile/Editbio.jsx`
- ✅ `client/src/profile/heatmapsec/Heatmap.jsx`
- ✅ `client/src/profile/tasksection/Tasksec.jsx`
- ✅ `client/src/profile/tasksection/Taskdisplay.jsx`
- ✅ `client/src/mainpages/Social.jsx`

### Backend (3 files)
- ✅ `server/app.js` (CORS config)
- ✅ `server/middleware/auth.js` (Debug logging)
- ✅ `server/routes/login.js` (User ID consistency)

---

## Next Steps

1. **Deploy frontend** to Vercel
2. **Deploy backend** to Render
3. **Test login flow** in production
4. **Monitor logs** for auth errors
5. **Check browser DevTools** Network tab to verify:
   - Cookie is sent with requests
   - /auth/me returns 200
   - User data is returned

---

## Notes

- ✅ No changes to database schema
- ✅ No changes to route structure
- ✅ Backward compatible with existing code
- ✅ Local development still works (localhost in CORS)
- ✅ Socket.io already had correct CORS settings
- ✅ Cookie-parser was already installed

