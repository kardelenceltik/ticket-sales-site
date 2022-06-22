import "./App.css";
import ActivitiesPage from "./components/ActivitiesPage";
import Navbar from "./components/Navbar";
import { Routes, Route, NavLink } from "react-router-dom";
import ActivityDetailPage from "./components/ActivityDetailPage";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div>
      <Navbar />
      <div className="content-page-container"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/detail" element={<ActivityDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
