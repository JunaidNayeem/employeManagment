import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="*" element={<InvalidURLRedirect />} />
      </Routes>
    </Router>
  );
}

function InvalidURLRedirect() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}

export default App;
