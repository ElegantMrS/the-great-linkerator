import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch } from "react-router-dom";

import CreateLinkForm from './CreateLinkForm';
import Links from './Links';

import {
  getSomething
} from '../api';

const App = () => {

  const [links, setLinks] = useState([]);

  return (
    <div className="App">
      <Router>
      <Route exact path="/">
      <CreateLinkForm/>
      </Route>
      <Route exact path="/links">
        <Links
          links={links}
          setLinks={setLinks}
        />
      </Route>
      </Router>
    </div>
  );
}

export default App;