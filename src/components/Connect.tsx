import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Account } from './Account'

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
        <div>
        {isConnected && (
          <button id ="address" onClick={() => disconnect()}>
           <h5><Account/></h5>
          </button>
        )}
        </div>
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              <h4>LOGIN</h4>
              {isLoading && x.id === pendingConnector?.id && '(loading...)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}