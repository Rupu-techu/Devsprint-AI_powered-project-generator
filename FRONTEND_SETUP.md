# Frontend Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React 18
- React Router DOM
- Axios
- Socket.io Client
- TailwindCSS
- Heroicons
- And more...

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` file if needed (default values should work for local development):
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── auth/       # Authentication components
│   │   └── common/     # Reusable components
│   ├── contexts/       # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ProjectContext.jsx
│   │   └── SocketContext.jsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useProject.js
│   │   └── useSocket.js
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Generator.jsx
│   │   ├── ProjectView.jsx
│   │   ├── History.jsx
│   │   └── Templates.jsx
│   ├── services/       # API services
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   ├── template.service.js
│   │   └── socket.service.js
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # TailwindCSS configuration
└── package.json        # Dependencies
```

## Features Implemented

### ✅ Authentication
- User registration
- User login
- Protected routes
- JWT token management
- Auto-logout on token expiration

### ✅ Project Generation
- AI-powered project generation form
- Tech stack selection (Frontend, Backend, Database)
- Real-time generation progress
- Project preview with file explorer

### ✅ Project Management
- Dashboard with project statistics
- Project history with search
- Project view with code preview
- Download projects as ZIP
- Delete projects

### ✅ Templates
- Browse template library
- Use templates to create projects
- Template search functionality

### ✅ Real-time Features
- WebSocket connection status
- Socket.io integration ready
- Collaboration infrastructure prepared

### ✅ UI/UX
- Modern dark theme
- Responsive design
- Loading states
- Error handling
- Toast notifications (CSS ready)
- Smooth transitions

## Key Components

### Authentication Flow
1. User visits home page
2. Can register or login
3. JWT token stored in localStorage
4. Protected routes check authentication
5. Auto-redirect to login if not authenticated

### Project Generation Flow
1. User fills project details form
2. Selects tech stack
3. Submits to backend API
4. Shows loading state during generation
5. Redirects to project view on completion

### State Management
- **AuthContext**: User authentication state
- **ProjectContext**: Project data and operations
- **SocketContext**: WebSocket connection and events

## API Integration

All API calls go through the centralized `api.js` service which:
- Adds JWT token to requests
- Handles errors globally
- Redirects to login on 401 errors
- Provides consistent error messages

## Styling

The app uses TailwindCSS with a custom dark theme:
- Primary color: Blue (#3b82f6)
- Secondary color: Purple (#a855f7)
- Background: Dark gray (#1f2937, #111827)
- Text: White and gray shades

## Next Steps

To complete the full-stack application:

1. **Backend Setup**: Create the Node.js/Express backend
2. **Database**: Set up MongoDB
3. **OpenAI Integration**: Implement AI code generation
4. **WebSocket Server**: Set up Socket.io server
5. **Testing**: Test all features end-to-end

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### API Connection Issues
Make sure the backend server is running on port 5000 or update `VITE_API_URL` in `.env`

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance
- Code splitting with React.lazy (ready to implement)
- Optimized bundle size with Vite
- Fast refresh during development
- Production build optimization

---

**Frontend is now ready!** Start the development server and begin building amazing projects with AI! 🚀