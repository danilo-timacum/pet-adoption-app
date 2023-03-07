import { Maxed, Form } from "../components";
import { useAccount, useContractRead } from "wagmi";
import ABI from "./Abi.json";

export function MergedForm({setRunReads}) {
  const { address, isConnected } = useAccount();
  let userCount;
  const countRead = useContractRead({
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "userStats",
    args: [address],
  });

  let exportCount = countRead.data;

  if (isConnected && exportCount != undefined) {
    userCount = Number(exportCount[1]);
  }
  let home;

  if (isConnected) {
    if (userCount < 5) {
      home = <Form setRunReads={setRunReads}/>;
    } else {
      home = <Maxed/>;
    }
  } else {
    home = <Form setRunReads={setRunReads}/>;
  }

  return <div className="bottomText">{home}</div>;
}
export default MergedForm;
