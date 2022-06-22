import "./App.css";
import ActivitiesPage from "./components/ActivitiesPage";
import Navbar from "./components/Navbar";
import { Routes, Route, NavLink } from "react-router-dom";
import ActivityDetailPage from "./components/ActivityDetailPage";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ActivitiesPage />} />
        <Route path="/detail" element={<ActivityDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
