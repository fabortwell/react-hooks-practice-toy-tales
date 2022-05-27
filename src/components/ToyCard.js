import React from "react";

function ToyCard({ toy, onToyDelete, onToyLike }) {

  function likeToy() {
    onToyLike(toy)
  }

  function deleteToy() {
    onToyDelete(toy)
  }
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={likeToy}>Like {"<3"}</button>
      <button className="del-btn" onClick={deleteToy}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
