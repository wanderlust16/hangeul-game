import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Rank from './Rank';
import Home from './Home';
import './App.css';

export default function App() {
  return (
    <div className="background">  
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/Rank" component={Rank}/>
        </div>
      </Router>
    </div>
  );
}