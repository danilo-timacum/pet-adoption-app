import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { ethers } from "ethers";
import ABI from "./Abi.json";
export function FullTable() {
  const { address, isConnected } = useAccount();

  const [petId, setPetId] = useState(null);
  const [clickedButton, SetClickedbutton] = useState(null);
  const [pets, setPets] = useState<Pet[]>([]);

  let exportedCount;
  let tempPets = [];
  let petInstance;

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

  const petCount = useContractRead({
    address: "0x25d01f0bc600690a11e44d593c34265d50eaeab3",
    abi: ABI,
    functionName: "totalPets",
  });
  exportedCount = Number(petCount.data);

  const { data, isLoading, isSuccess, write, isError } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "adoptPet",
    args: [petId],
  });

  const handleAdopt = (arg: number) => {
    setPetId(Number(arg));
  };

  useEffect(() => {
    write();
  }, [petId]);

  useEffect(() => {
    async function fetchData() {
      for (let i = 0; i < exportedCount; i++) {
        const data = await readContract({
          address: "0x25d01f0bc600690a11e44d593c34265d50eaeab3",
          abi: ABI,
          functionName: "pets",
          args: [Number(i)],
        });

        petInstance = data;

        tempPets.push({
          id: i.toString(),
          name: petInstance?.name.toString(),
          age: petInstance?.age.toString(),
          species: petInstance?.species.toString(),
          vaccinated: String(petInstance?.vaccinated).toString(),
          date: new Date((petInstance?.createdAt).toString() * 1000)
            .toLocaleDateString("en-US")
            .toString(),
          adoptiondate: Number(petInstance?.adoptedAt),
          owner: petInstance?.currentOwner.toString(),
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
                SetClickedbutton(Number(Pets.id));
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
