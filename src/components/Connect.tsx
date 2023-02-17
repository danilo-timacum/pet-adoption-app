import { isAddress } from 'ethers/lib/utils.js'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Account } from './Account'
import React, { useState, useEffect } from 'react';

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  
  useEffect(() => {
    // Update the document title using the browser API
 console.log(isConnected)
  });

  return (
    <>
     {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button className="login" key={x.id} onClick={() => connect({ connector: x })}>
              <h4>LOGIN</h4>
              {isLoading && x.id === pendingConnector?.id && '(loading...)'}
            </button>
          ))} 

          {error && <div>{error.message}</div>}

            {isConnected && ( 
          <button className="address" onClick={() => disconnect()}>
          <input className="addressButton" type="button" value={address}></input>
          </button>
         
     
        )}

         

     
    
    </>
  )
}