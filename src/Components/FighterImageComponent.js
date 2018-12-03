import React from "react";

function FighterImageComponent(props) {
  return (
    <div>
      <img
        className="rosterImages"
        src={props.image}
        alt="CITADEL OF RICKS AND MORTYS"
      />
    </div>
  );
}

export default FighterImageComponent;
