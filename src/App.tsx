import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import TripForm from "./pages/TripForm";
import Layout from "./Layout";
import Home from "./pages/Home";
import FetchTripsForm from "./pages/FetchTripsForm";


function App() {
  // const title = "Rota dos Guarás";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tripForm" element={<TripForm />} />
          <Route path="/fetchTrips" element={<FetchTripsForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
