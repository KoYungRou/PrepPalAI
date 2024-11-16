
const express = require('express');
const cors = require('cors');  // Import cors

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config(); // Load environment variables from a `.env` file

const app = express();

// Enable CORS for all origins (or specify your frontend URL)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', recipeRoutes); // All recipe-related routes are prefixed with `/api`

// Start the server
const PORT = process.env.PORT || 3002;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from './components/Login';
// import Search from './components/Search';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//           <Route path="/login" component={Login} />
//           <Route path="/search" component={Search} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

