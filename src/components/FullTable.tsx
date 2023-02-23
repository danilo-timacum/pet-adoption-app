import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { ethers } from "ethers";
import ABI from "./Abi.json";
export function FullTable() {
  const { address, isConnected } = useAccount();

  const [petId, setPetId] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [pets, setPets] = useState<Pet[]>([]);

  type Pet = {
    id: string;
    name: string;
    age: string;
    species: string;
    vaccinated: string;
    date: string;
    adoptiondate: number;
    owner: string;
  };

  let exportedCount;

  const petCount = useContractRead({
    address: "0x25d01f0bc600690a11e44d593c34265d50eaeab3",
    abi: ABI,
    functionName: "totalPets",
  });
  exportedCount = Number(petCount.data);

  const { isLoading, isSuccess, write, isError } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "adoptPet",
    args: [petId],
  });

  const handleAdopt = (selectedPetId: number) => {
    setPetId(selectedPetId);
  };

  useEffect(() => {
    write();
  }, [petId]);

  useEffect(() => {
    let tempPets = [];
    async function fetchData() {
      for (let i = 0; i < exportedCount; i++) {
        const data = await readContract({
          address: "0x25d01f0bc600690a11e44d593c34265d50eaeab3",
          abi: ABI,
          functionName: "pets",
          args: [Number(i)],
        });

        tempPets.push({
          id: i.toString(),
          name: data?.name.toString(),
          age: data?.age.toString(),
          species: data?.species.toString(),
          vaccinated: String(data?.vaccinated).toString(),
          date: new Date((data?.createdAt).toString() * 1000)
            .toLocaleDateString("en-US")
            .toString(),
          adoptiondate: Number(data?.adoptedAt),
          owner: data?.currentOwner.toString(),
        });
      }
      setPets(tempPets);
    }

    if (pets.length < exportedCount) {
      fetchData();
    }
  }, [exportedCount]);

  const petTable = pets.map((Pets) => {
    const adoptButton = () => {
      if (isLoading && Number(Pets.id) === clickedButton)
        return <>adopting in progress</>;

      if (isSuccess && Number(Pets.id) === clickedButton)
        return <>Adopting successful</>;

      if (isError && Number(Pets.id) === clickedButton)
        return <>adopting ERROR</>;

      if (Pets.adoptiondate == 0 && Pets.owner != address && isConnected) {
        return (
          <div>
            <button
              className="petButtons"
              onClick={() => {
                handleAdopt(Number(Pets.id));
                setClickedButton(Number(Pets.id));
              }}
            >
              ADOPT
            </button>
          </div>
        );
      } else
        return (
          <div>
            <button className="dissabledButtons">ADOPT</button>
          </div>
        );
    };

    return (
      <div className="petData" key={Pets.id}>
        <p>{Pets.id}</p>
        <p>{Pets.name}</p>
        <p>{Pets.age}</p>
        <p>{Pets.species}</p>
        <p>{Pets.vaccinated}</p>
        <p>{Pets.date}</p>
        <p>{adoptButton()}</p>
      </div>
    );
  });

  let renderTable;

  if (pets.length < exportedCount) {
    renderTable = <div className="fetchingText">LOADING...</div>;
  } else renderTable = petTable;

  return <div>{renderTable}</div>;
}

export default FullTable;
