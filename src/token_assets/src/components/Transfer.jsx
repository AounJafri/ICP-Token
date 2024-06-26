import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";
function Transfer() {
  
    const [transferTo, setTransferTo] = useState("");
    const [amount,setAmount] = useState(0);
    const [btnMsg, setBtnMsg] = useState("Transfer");
    const [isDisabled,setDisabled] = useState(false);
    const [isHidden,setHid] = useState(true);

  async function handleClick() {
    setDisabled(true);
    // setTransferTo(Principal.fromText(transferTo));
    // setAmount(amount);
    setBtnMsg(await token.transferAmount(Principal.fromText(transferTo),Number(amount)));
    setHid(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={transferTo}
                onChange={(e)=> setTransferTo(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{btnMsg}</p>
      </div>
    </div>
  );
}

export default Transfer;
