import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  //const [recipes, setRecipes] = useState([]);

  const getChickenRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setChicken(data.hits);
  };

  // useEffect(() => {
  //   getChickenRecipes();
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("/api/recipes")
  //     .then(response => setRecipes(response.data))
  //     .catch(ex => console.log(ex.response.data));
  // }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            <li className="nav-link active">
              <Link className="link" to="/">
                <img
                  src="/assets/home.png"
                  alt=""
                  width="32"
                  height="32"
                  title="Bootstrap"
                ></img>
              </Link>
            </li>
          </nav>
          <hr />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="media">
        <img
          className="img-thumbnail align-self-end mr-3"
          src="./assets/me.jpg"
        />
        <p className="mt-0">developed by: chelsea</p>
      </div>
    </div>
  );
};

export default App;
