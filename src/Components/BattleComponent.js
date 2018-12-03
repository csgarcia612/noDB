import React from "react";

function BattleComponent(props) {
  const { power1, power2, fighting } = props;
  return (
    <div className="battleButtonHolder">
      <button className="battleButton" onClick={() => fighting(power1, power2)}>
        BATTLE
      </button>
    </div>
  );
}

export default BattleComponent;
