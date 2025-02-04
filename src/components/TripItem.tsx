import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

type TripItemsProps = {
  id: number | string;
  departure: string;
  arrival: string;
  dateTime: Date;
  availableSeats: number;
};

export default function TripItem({
  id,
  departure,
  arrival,
  dateTime,
  availableSeats,
}: TripItemsProps) {
  return (
    <tr>
      <td>{departure}</td>
      <td>{arrival}</td>
      <td>{dateTime.toLocaleString()}</td>
      <td>{availableSeats}</td>
      <td className="btn-details">
        <Link to={`/trips/${id}`}>
          <Eye className="m-auto" />
        </Link>
      </td>
    </tr>
  );
}
