import CardWrapper from "../components/cards";

export default function Dashboard() {
  function openModal() {
    console.log("open modal");
  }
  return (
    <>
      <CardWrapper />
      <button
        className=" btn-submit"
        onClick={openModal}
      >
        Nova passagem +
      </button>
    </>
  );
}
