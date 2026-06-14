import React, { useState , useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);
useEffect(() => {
  fetch("/toys")
    .then((response) => response.json())
    .then((data) => setToys(data));
}, []);
function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }
  function handleDeleteToy(idToDelete) {
    const updatedToys = toys.filter((toy) => toy.id !== idToDelete);
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />
    </>
  )
}

export default App;
