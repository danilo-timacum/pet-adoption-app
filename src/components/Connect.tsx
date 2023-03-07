import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

    const { address } = useAccount();
    
    let mainAdr; 
    let fullAddress ;
   
  if (isConnected){
    const mainAdr = address; 
  
    const adr1 = mainAdr.slice(0,4);
    const adr2 = mainAdr.slice(-3);
    const adrMidd = '...';
 
    fullAddress = adr1 + adrMidd + adr2;
  } 
  
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
