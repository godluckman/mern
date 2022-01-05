import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'materialize-css'
import Home from "./components/home";
import Nav from "./components/nav";
import Details from "./components/details";
import AllData from "./components/allData";


function App() {
  return (
      <Router>
    <div className="container">
        <Nav/>
            <Routes>
                <Route path="/get" element={<AllData/>}/>
                <Route path="/:name" element={<Details/>}/>
                <Route path="*" element={<Home/>} />
            </Routes>
    </div>
      </Router>
  );
}

export default App;
