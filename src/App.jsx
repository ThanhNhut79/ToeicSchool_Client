import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Layout from "./Layouts";
import Home from "./Pages/Home/Home";
import Introduce from "./Pages/Introduce/Introduce";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/introduce" element={<Introduce />} />
        </Route>
        <Route>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
