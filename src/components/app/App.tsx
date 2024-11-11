import React from 'react';
import './app.scss';
import Timer from '../timer/Timer';
import MainPage from '../mainPage/MainPage';

function App() {
  return (
    <div className="app">
      <Timer/>
      <MainPage/>
    </div>
  );
}

export default App;
