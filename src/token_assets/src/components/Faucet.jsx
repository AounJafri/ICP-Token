import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const [sucMsg, setSucMsg] = useState("Gimme gimme");
  const [isDisabled,setDisabled] = useState(false);

  async function handleClick(event) {
    setDisabled(true);
    setSucMsg(await token.payOut());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {sucMsg}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
