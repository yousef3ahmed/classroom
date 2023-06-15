import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
