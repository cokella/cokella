import React from 'react';
import './style/App.css';
import Header from './js/Header.js';
import Number from './js/Number.js';
import List from './js/List.js';

function App() {
  return(
    <div className="container">
        <Header/>
        <div className="tab-content">
            <div className="tab-pane" id="home">
                <div className="contain">
                    <Number/>
                </div>
            </div>
            <div className="tab-pane" id="profile">
                <List/>
            </div>
        </div>
    </div>
  );
}

export default App;

