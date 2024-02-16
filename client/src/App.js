import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from"react-router-dom";
import "./App.css";

import Egate from './Landing_Page/Egate'
import UG_HOME from "./Components/ug_homepage/UG_HOME";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Egate />} />
      <Route path="/home" element={<UG_HOME />} />
      </Routes>
    </Router>
  );
}

export default App;



