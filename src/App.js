import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/routes/login/Login";
import Signup from "../src/routes/Signup/Signup";

import CreateQuiz from "./routes/create-quiz/create-quiz.component";
import AdminHomeScreen from "./Home/ClassRoom/ClassRoom";
import CreateClassRoom from "./CreateClassRoom/CreateClassRoom";
import Quiz from "./Quiz Page/Quiz";
import TakeQize from "./routes/take-quiz/take-quiz.component";
import AddQuiz from "./Quiz Page/CreateQuiz/AddQuiz";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

        <Route path="/" element={<Login />}   />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<AdminHomeScreen />} />
        <Route path="/create-classroom" element={<CreateClassRoom />} />
        <Route path="/classroom/:pin_code" element={<Quiz />} />
        <Route path="/classroom/:pin_code/add-quiz" element={<AddQuiz />} />
        {/* <Route path="classroom/:pin_code/quizs" element={<NickNamePage />} /> */}
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/TakeQize" element={<TakeQize />} />
      </Routes>
    </Router>
  );
}

export default App;
