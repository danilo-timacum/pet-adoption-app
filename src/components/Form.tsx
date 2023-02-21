import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";
import * as React from "react";
import { useState } from "react";
import ABI from "./Abi.json";

export function Form() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("other");
  const [age, setAge] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const { isConnected } = useAccount();
  const { address } = useAccount();

  const countRead = useContractRead({
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "userStats",
    args: [address],
  });

  let userCount;
  let contractData = countRead.data;

  if (isConnected && contractData != undefined) {
    userCount = Number(contractData.petsAdded);
  }

  const { config } = usePrepareContractWrite({
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "putForAdoption",
    args: [name, species, age, vaccinated],
  });

  const { data, error, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  let wholeForm;
  let bottomForm;

  if (isConnected) {
    bottomForm = (
      <div>
        <button className="submit" onClick={() => write?.()}>
          SUBMIT
        </button>
      </div>
    );

    if (isLoading) {
      bottomForm = <div>submitting in progress...</div>;
    }
    if (isSuccess) {
      bottomForm = <div>submit successful</div>;
    }
    if (error) {
      bottomForm = <div>submit ERROR</div>;
    }
    if (isError) {
      bottomForm = <div>submit ERROR</div>;
    }
  } else {
    bottomForm = (
      <div className="bottomText">
        <p>Connect to submit !</p>
      </div>
    );
  }
  wholeForm = (
    <div className="container2">
      <div className="adoptionText">
        <p>Put for adoption</p>
      </div>
      <div className="formDiv">
        <div>
          <div className="nameField">
            <p className="inputLabel"> Name</p>
            <input
              className="inputSpace"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="speciesField">
            <p className="inputLabel"> Species</p>
            <select
              className="dropDown"
              required
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="ageField">
            <p className="inputLabel"> Age</p>
            <input
              className="inputSpace"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="checkField">
            <p className="checkText"> Vaccinated</p>
            <input
              type="checkbox"
              className="myCheck"
              onChange={(e) => setVaccinated(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="connectWarn">{bottomForm}</div>
    </div>
  );

  return <>{wholeForm}</>;
}
export default Form;
