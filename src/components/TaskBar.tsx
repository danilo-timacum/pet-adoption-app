import { useContractReads, useAccount } from "wagmi";
import { Connect, Label, Balance } from "../components";
import { useEffect } from "react";
import ABI from "./Abi.json";
import { UNSAFE_convertRoutesToDataRoutes } from "@remix-run/router";

export function TaskBar({runReads, setRunReads}) {
  const { isConnected } = useAccount();
  const { address } = useAccount();

  const {data, isSuccess, isLoading, isError, refetch} = useContractReads({
    contracts: [
      {
        address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
        abi: ABI,
        functionName: "userStats",
        args: [address],
      },

      {
        address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
        abi: ABI,
        functionName: "totalPets",
      },

      {
        address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
        abi: ABI,
        functionName: "totalAdopted",
      },

      {
        address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
        abi: ABI,
        functionName: "availablePets",
      },
    ], 
  });

  useEffect(() => {
if(runReads){
  refetch()
  setRunReads(false)
  console.log(runReads)
}
  }, [runReads, setRunReads]);

return (
    <>
      <Label />
      {!isConnected && (
        <div className="container">
          <br />
          <h2>Pet Adoption</h2>
          <div className="count2">
            <label>
              Total:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[1])}
            </label>
            <br />

            <br />

            <label>
              Adopted:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[2])}
            </label>
            <br />
            <br />

            <label>
              For adoption:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[3])}
            </label>
            <br />
            <br />
          </div>
          <div className="notConnect">
            <Connect />
          </div>
        </div>
      )}

      {isConnected && (
        <div className="container">
          <div className="connect">
            <Connect />
          </div>

          <div className="balance">
            <Balance />
          </div>
          <div className="count">
            <label>
              Total:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[1])}
            </label>
            <br />

            <br />

            <label>
              Adopted:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[2])}
            </label>
            <br />
            <br />

            <label>
              For adoption:
              {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[3])}
            </label>
            <br />
            <br />
          </div>
          <div className="newCount">
            <label>
              You adopted: {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[0]?.hasAdopted)}
            </label>
            <br />
            <br />
            <label>
              You submited: {isLoading && "loading..."} {isError && "ERROR!"}
              {isSuccess && Number(data?.[0]?.petsAdded)}
            </label>
          </div>
        </div>
      )}
    </>   
  );
}
export default TaskBar;
