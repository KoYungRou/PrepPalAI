// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import RecipeRecommendations from './pages/RecipeRecommendations';
import SavedRecipes from './pages/SavedRecipes';
import Header from './components/Header';  // Correct default import

function App() {
  return (
    <Router>
      <div>
        {/* Header is now correctly imported and used */}
        <Header />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recommendations" element={<RecipeRecommendations />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
