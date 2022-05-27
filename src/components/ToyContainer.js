import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, deleteToy, likeToy}) {
  const toyCard = toys.map((toy) => <ToyCard key={toy.id} toy={toy} onToyDelete={deleteToy} onToyLike={likeToy} />)
  return (
    <div id="toy-collection">{ toyCard }</div>
  );
}

export default ToyContainer;
