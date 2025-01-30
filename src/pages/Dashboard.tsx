import CardWrapper from "../components/cards";
import { ReservationForm } from "./ReservationForm";

export default function Dashboard() {
  function openModal() {
    console.log("open modal");
  }
  return (
    <>
      <CardWrapper />
      <button
        className=" bg-gray-950  text-zinc-400 px-6 py-2 rounded-xl
        hover:text-zinc-200 duration-500 shadow-xl hover:shadow-zinc-950"
        onClick={openModal}
      >
        Nova passagem +
      </button>
      <ReservationForm />
    </>
  );
}
