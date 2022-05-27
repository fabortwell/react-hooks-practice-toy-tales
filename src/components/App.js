import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/toys`)
    .then((res) => res.json())
    .then((fetchedToys) => setToys(fetchedToys))
  }, []);

  function addToy(inputData) {
    fetch(`http://localhost:3001/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
    })
    .then((res) => res.json())
    .then((updatedInfo) => setToys([...toys, updatedInfo]))

    handleClick()
  }

  function deleteToy(toyToDelete) {
    fetch(`http://localhost:3001/toys/${toyToDelete.id}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => {
      const remainingToys = toys.filter((toy) => toy.id !== toyToDelete.id)
      setToys(remainingToys)
    })
  }

  function likeToy(likedToy) {
    fetch(`http://localhost:3001/toys/${likedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...likedToy,
        likes: likedToy.likes + 1
      })
    })
    .then((res) => res.json())
    .then((updatedToy) => {
      const updatedToys = toys.map((toy) => toy.id === updatedToy.id ? updatedToy : toy)
      setToys(updatedToys)
    })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy}/>
    </>
  );
}

export default App;