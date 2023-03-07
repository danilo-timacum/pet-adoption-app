import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Address } from "../Utils/Format";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const fullAddress = Address();

return (
    <>
      {connectors
        .filter((x) => x.ready && x.id !== connector?.id)
        .map((x) => (
          <button
            className="login"
            key={x.id}
            onClick={() => connect({ connector: x })}
          >
            <h4>LOGIN</h4>
            {isLoading && x.id === pendingConnector?.id && "(loading...)"}
          </button>
        ))}

      {error && <div>{error.message}</div>}

      {isConnected && (
        <button className="address" onClick={() => disconnect()}>
          <input
            className="addressButton"
            type="button"
          value= {fullAddress}
          ></input>
        </button>
      )}
    </>
  );
}
export default Connect;
