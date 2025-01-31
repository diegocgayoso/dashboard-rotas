import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import TripForm from "./pages/TripForm";
import ReservationForm from "./pages/ReservationForm";

function App() {
  // const title = "Rota dos Guarás";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tripForm" element={<TripForm />} />
          <Route path="/reservationForm" element={<ReservationForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// <div className="main">
//   <div className="p-4 w-full">
//     <h1 className="logo">{title}</h1>
//     <Home />
//     <Dashboard />
//   </div>
// </div>
