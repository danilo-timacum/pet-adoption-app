import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import { ethers } from "ethers";
import ABI from "./Abi.json";
import { render } from "react-dom";
export function FullTable() {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [petId, setPetId] = useState(-1);
  const [clickedButton, SetClickedbutton] = useState(-1);
  const [pets, setPets] = useState<Pet[]>([]);

  let exportedCount;
  let name;
  let age;
  let species;
  let vaccinated;
  let creationdateBlock;
  let creationdate;
  let adoptiondate;
  let owner;

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

  const contractABI = ABI;
  const contractAddress = "0x25d01f0bc600690a11e44d593c34265d50eaeab3";
  const [myData, setMyData] = useState(null);
  const petCount = useContractRead({
    address: "0x25d01f0bc600690a11e44d593c34265d50eaeab3",
    abi: ABI,
    functionName: "totalPets",
  });
  exportedCount = Number(petCount.data);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com"
  );

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

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  useEffect(() => {
    async function fetchData() {
      for (let i = 0; i < exportedCount; i++) {
        const petInstance = await contract.pets(i);

        setMyData(petInstance);

        name = petInstance?.name;
        age = petInstance?.age;
        species = petInstance?.species;
        vaccinated = String(petInstance?.vaccinated);
        creationdateBlock = Number(petInstance?.createdAt);
        creationdate = new Date(creationdateBlock * 1000).toLocaleDateString(
          "en-US"
        );
        adoptiondate = Number(petInstance?.adoptedAt);
        owner = petInstance?.currentOwner;

        setPets((pets) => [
          ...pets,
          {
            id: i.toString(),
            name: name.toString(),
            age: age.toString(),
            species: species.toString(),
            vaccinated: vaccinated.toString(),
            date: creationdate.toString(),
            adoptiondate: adoptiondate,
            owner: owner.toString(),
          },
        ]);
      }
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
  console.log(pets.length);
  if (pets.length < exportedCount) {
    renderTable = <div className="fetchingText">LOADING...</div>;
  } else if (pets.length == exportedCount) renderTable = petTable;

  return <div>{renderTable}</div>;
}

export default FullTable;
