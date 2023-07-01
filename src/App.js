import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/routes/login/Login";
import Signup from "../src/routes/Signup/Signup";
import AdminHomeScreen from "./Home/ClassRoom/ClassRoom";
import CreateClassRoom from "./CreateClassRoom/CreateClassRoom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<AdminHomeScreen />} />
        <Route path="/create-classroom" element={<CreateClassRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
