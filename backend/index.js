const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Smart project generation logic based on idea keywords
const generateSmartResponse = (idea) => {
  const lowerIdea = idea.toLowerCase();
  
  // AI/ML Project
  if (lowerIdea.includes('ai') || lowerIdea.includes('ml') || lowerIdea.includes('machine learning') || lowerIdea.includes('neural')) {
    return {
      projectName: 'AI-Powered Application',
      description: 'Machine Learning based intelligent system',
      structure: [
        'src/',
        'src/models/',
        'src/models/neural_network.py',
        'src/data/',
        'src/data/preprocessing.py',
        'src/training/',
        'src/training/train_model.py',
        'src/api/',
        'src/api/predict.py',
        'requirements.txt',
        'config.yaml',
        'README.md'
      ],
      code: `# AI Model Implementation
import tensorflow as tf
from tensorflow import keras
import numpy as np

class AIModel:
    def __init__(self):
        self.model = self.build_model()
    
    def build_model(self):
        """Build neural network architecture"""
        model = keras.Sequential([
            keras.layers.Dense(128, activation='relu', input_shape=(10,)),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(64, activation='relu'),
            keras.layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, X_train, y_train, epochs=50):
        """Train the model"""
        history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            validation_split=0.2,
            batch_size=32,
            verbose=1
        )
        return history
    
    def predict(self, X):
        """Make predictions"""
        return self.model.predict(X)

# Usage
if __name__ == '__main__':
    model = AIModel()
    print("AI Model initialized successfully!")
    # Add your training data and train the model
`
    };
  }
  
  // E-commerce Project
  if (lowerIdea.includes('ecommerce') || lowerIdea.includes('shop') || lowerIdea.includes('store') || lowerIdea.includes('cart')) {
    return {
      projectName: 'E-Commerce Platform',
      description: 'Full-featured online shopping application',
      structure: [
        'client/',
        'client/src/',
        'client/src/components/',
        'client/src/components/ProductCard.jsx',
        'client/src/components/Cart.jsx',
        'client/src/pages/',
        'client/src/pages/Home.jsx',
        'client/src/pages/ProductDetail.jsx',
        'server/',
        'server/models/',
        'server/models/Product.js',
        'server/models/Order.js',
        'server/routes/',
        'server/routes/products.js',
        'server/routes/orders.js',
        'server/index.js',
        'package.json'
      ],
      code: `// E-Commerce Backend API
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  images: [String],
  rating: { type: Number, default: 0 },
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cart functionality
app.post('/api/cart/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    // Add to cart logic
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`E-commerce server running on port \${PORT}\`);
});
`
    };
  }
  
  // Task/Todo Management
  if (lowerIdea.includes('task') || lowerIdea.includes('todo') || lowerIdea.includes('productivity')) {
    return {
      projectName: 'Task Management System',
      description: 'Productivity app for managing tasks and projects',
      structure: [
        'src/',
        'src/components/',
        'src/components/TaskList.jsx',
        'src/components/TaskItem.jsx',
        'src/components/AddTask.jsx',
        'src/pages/',
        'src/pages/Dashboard.jsx',
        'src/services/',
        'src/services/taskService.js',
        'src/utils/',
        'src/utils/dateHelpers.js',
        'public/',
        'package.json'
      ],
      code: `// Task Management Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const response = await axios.patch(\`/api/tasks/\${taskId}\`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(\`/api/tasks/\${taskId}\`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={\`task-item \${task.completed ? 'completed' : ''}\`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div className="task-content">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={\`priority \${task.priority}\`}>{task.priority}</span>
            </div>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
`
    };
  }
  
  // Generic Web Application (default)
  return {
    projectName: 'Modern Web Application',
    description: 'Full-stack web application with modern architecture',
    structure: [
      'client/',
      'client/src/',
      'client/src/components/',
      'client/src/components/Header.jsx',
      'client/src/components/Footer.jsx',
      'client/src/pages/',
      'client/src/pages/Home.jsx',
      'client/src/App.jsx',
      'server/',
      'server/routes/',
      'server/routes/api.js',
      'server/models/',
      'server/middleware/',
      'server/index.js',
      'package.json',
      'README.md'
    ],
    code: `// Modern Web Application - Server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Database connected'))
.catch(err => console.error('❌ Database connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/data', async (req, res) => {
  try {
    // Fetch data logic
    res.json({ data: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    // Create data logic
    const newData = req.body;
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});

module.exports = app;
`
  };
};

// POST /generate endpoint
app.post('/generate', (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request. Please provide a project idea.' 
      });
    }
    
    // Generate smart response based on idea
    const response = generateSmartResponse(idea);
    
    // Add timestamp
    response.generatedAt = new Date().toISOString();
    
    res.json(response);
  } catch (error) {
    console.error('Error generating project:', error);
    res.status(500).json({ 
      error: 'Failed to generate project. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Project Generator API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Project Generator API',
    version: '1.0.0',
    endpoints: {
      generate: 'POST /generate',
      health: 'GET /health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to generate projects!`);
});

module.exports = app;

// Made with Bob
