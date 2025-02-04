import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TripForm from "./pages/TripForm";
import Layout from "./Layout";
import Home from "./pages/Home";
import FetchTripsForm from "./pages/FetchTripsForm";
import { Trips } from "./pages/Trips";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tripForm" element={<TripForm />} />
          <Route path="/fetchTrips" element={<FetchTripsForm />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
