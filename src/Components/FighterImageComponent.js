import React from "react";

function FighterImageComponent(props) {
  return (
    <div className="card-holder">
      <img
        className="rosterImages"
        src={props.image}
        alt="CITADEL OF RICKS AND MORTYS"
      />
    </div>
  );
}

export default FighterImageComponent;
