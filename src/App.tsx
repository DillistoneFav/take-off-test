import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Features/Routing/Router";
import {checkAuth} from "./utils/otherFunctions";

function App() {

    useEffect(() => {
        checkAuth()
    }, [])

  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              <AppRouter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
