# AI Project Generator 🚀

A full-stack application that transforms your ideas into complete project structures with production-ready code using AI. Built with React, Node.js, Express, MongoDB, and OpenAI's GPT API.

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Generation**: Convert project ideas into complete codebases using OpenAI GPT-4
- 📁 **Smart Project Structure**: Automatically generates organized file structures based on best practices
- 💻 **Multi-Language Support**: Generate projects in various tech stacks (React, Vue, Node.js, Python, etc.)
- 🎨 **Syntax Highlighting**: Built-in Monaco Editor (VS Code editor) for code preview and editing

### Advanced Features
- 👥 **Real-time Collaboration**: Multiple users can edit projects simultaneously with live cursor tracking
- 📚 **Template Library**: Save and share project templates with the community
- 📜 **Project History**: Access and manage all your generated projects
- 📦 **One-Click Download**: Export projects as ZIP files ready for development
- 🔐 **Secure Authentication**: JWT-based user authentication and authorization
- 🔄 **Live Updates**: WebSocket-powered real-time synchronization

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Monaco Editor** - Code editor
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **JSZip** - File compression

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **OpenAI API** - AI code generation
- **Socket.io** - WebSocket server
- **Bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (v5 or higher)
- **OpenAI API Key** (Get one at https://platform.openai.com)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-project-generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your configuration
# Required: MONGODB_URI, JWT_SECRET, OPENAI_API_KEY
```

**Backend Environment Variables** (`.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-generator
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

```bash
# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (default values should work)
```

**Frontend Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

```bash
# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services or run mongod.exe
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📖 Usage Guide

### Creating Your First Project

1. **Register/Login**: Create an account or log in to existing account
2. **Navigate to Generator**: Click on "Generate Project" in the sidebar
3. **Enter Your Idea**: Describe your project idea in detail
   ```
   Example: "Create a todo app with user authentication, 
   task categories, and due date reminders"
   ```
4. **Select Tech Stack**: Choose your preferred technologies
   - Frontend: React, Vue, Angular, etc.
   - Backend: Node.js, Python, etc.
   - Database: MongoDB, PostgreSQL, etc.
5. **Generate**: Click "Generate Project" and wait for AI to create your project
6. **Review & Edit**: View generated files in the code editor
7. **Download**: Export your project as a ZIP file

### Using Templates

1. **Browse Templates**: Navigate to the Templates page
2. **Preview Template**: Click on any template to see its structure
3. **Use Template**: Click "Use Template" to create a project from it
4. **Customize**: Modify the generated code as needed
5. **Save as Template**: Save your customized project as a new template

### Collaborating on Projects

1. **Open Project**: Navigate to any of your projects
2. **Invite Collaborators**: Click "Invite" and enter collaborator's email
3. **Real-time Editing**: All collaborators can edit simultaneously
4. **See Cursors**: View other users' cursor positions in real-time
5. **Auto-sync**: Changes are automatically synchronized

## 🏗️ Project Structure

```
ai-project-generator/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── socket/          # WebSocket handlers
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Entry point
│   └── package.json
│
├── ARCHITECTURE.md           # System architecture documentation
├── IMPLEMENTATION_GUIDE.md   # Development guide
└── README.md                # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `POST /api/projects/generate` - Generate new project
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/download` - Download project as ZIP

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get specific template
- `POST /api/templates` - Create template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template
- `POST /api/templates/:id/use` - Use template

### Collaboration
- `POST /api/collaborate/:projectId/invite` - Invite collaborator
- `GET /api/collaborate/:projectId/users` - Get collaborators
- `DELETE /api/collaborate/:projectId/remove/:userId` - Remove collaborator

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Code Formatting
```bash
# Format backend code
cd backend
npm run format

# Format frontend code
cd frontend
npm run format
```

## 🔒 Security

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens for stateless authentication
- HTTP-only cookies for token storage
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd backend
heroku create your-app-name-backend
heroku addons:create mongolab
heroku config:set OPENAI_API_KEY=your-key
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
cd frontend
vercel --prod
```

### Environment Variables for Production
Make sure to set all required environment variables in your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running on your system.

**OpenAI API Error**
```
Error: Invalid API key
```
Solution: Check that your OPENAI_API_KEY is correctly set in `.env`

**CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
Solution: Ensure CORS_ORIGIN in backend `.env` matches your frontend URL.

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change the PORT in backend `.env` or kill the process using that port.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Monaco Editor team for the excellent code editor
- All open-source contributors

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

---

**Built with ❤️ using React, Node.js, and AI**