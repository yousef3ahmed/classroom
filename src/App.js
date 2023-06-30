import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/routes/login/Login";
import Signup from "../src/routes/Signup/Signup";

import CreateQuiz from "./routes/create-quiz/create-quiz.component";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/home" element={<Login />} /> */}
        <Route path="/createQuiz" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
