import { useState } from "react";
// import "./App.css";
// import { useAllStudentsData } from "./queryHooks/Queries";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PageLayout from "./components/layout";
import Home from "./components/Home";
import Students from "./components/Students";
import Schools from "./components/Schools";
import Trainers from "./components/Trainers";
import NotFound from "./components/NotFound";
// import SchoolDetails from "./components/SchoolDetails";
import StudentPage from './components/StudentPage'
import AllClasses from "./components/AllClasses";

function App() {
  const [user, setUser] = useState(true);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={user ? <PageLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Schools />} />
          {/* <Route path="/classes" element={<AllClasses />} /> */}
          <Route path="/students" element={<Students />} />
          <Route path="/students/:student_id" element={<StudentPage/>} />
          <Route path="/schools/:schoolId" element={<AllClasses />} />
          <Route path="/trainers" element={<Trainers />} />
        </Route>
        <Route path="*" element={NotFound} />
      </Routes>
    </>
  );
}

export default App;
