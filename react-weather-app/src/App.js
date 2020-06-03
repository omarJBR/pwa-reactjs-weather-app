import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Weather} />
        <Route exact path="/:lat/:lon" component={Weather} />
      </div>
    </Router>
  );
}

export default App;
