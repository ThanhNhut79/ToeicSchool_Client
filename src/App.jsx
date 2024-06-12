import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import UProfile from "./pages/UserProfile/UProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/UProfile" element={<UProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
