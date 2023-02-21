import { Maxed, Form } from "../components";
import { useAccount, useContractRead } from "wagmi";
import ABI from "./Abi.json";
export function MergedForm() {
  const { address, isConnected } = useAccount();
  let userCount;
  const countRead = useContractRead({
    address: "0x25d01F0bc600690A11E44D593C34265d50eAEAb3",
    abi: ABI,
    functionName: "userStats",
    args: [address],
  });

  let b = countRead.data;

  if (isConnected && b != undefined) {
    userCount = Number(b[1]);
  }
  let home;

  if (isConnected) {
    if (userCount < 5) {
      home = <Form />;
    } else {
      home = <Maxed />;
    }
  } else {
    home = <Form />;
  }

  return <div className="bottomText">{home}</div>;
}
export default MergedForm;
