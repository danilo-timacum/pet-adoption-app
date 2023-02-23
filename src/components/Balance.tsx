import { useBalance } from "wagmi";
import { useAccount, useEnsName } from "wagmi";

export function Balance() {
  const { address } = useAccount();

  const { data, isError, isLoading } = useBalance({ address });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>ERROR!</div>;

  let num = Number(data?.formatted);
  let n = num.toFixed(3);

  return (
    <div>
      Balance: {n} {data?.symbol}
    </div>
  );
}

