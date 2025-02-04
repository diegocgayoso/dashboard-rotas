import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="nav">
      <h3>Logo</h3>

      <ul className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/trips">Viagens</Link>
        </li>
        <li>
          <Link to="/fetchTrips">Reservas</Link>
        </li>
      </ul>
    </nav>
  );
}
