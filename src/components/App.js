import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getAllLinks } from '../api';
import CreateLinkForm from './CreateLinkForm';
import Links from './Links';


const App = () => {

  const [links, setLinks] = useState([]);

  useEffect(() => {
    try {
      Promise.all([getAllLinks()]).then(([data]) => {
        console.log(data);
        setLinks(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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